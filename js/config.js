/**
 * ============================================================
 *  CẤU HÌNH NGUỒN DỮ LIỆU
 * ============================================================
 *
 *  LỊCH TRỰC: lấy từ NAS trước (NAS_CONFIG), Google Sheets chỉ là DỰ PHÒNG.
 *  Thứ tự trong js/app.js:
 *    a) NAS  — GET /v2/public/lich-truc (JSON, cột `Ngày` + cột nhân sự, ô C1/C2)
 *    b) Sheets — sheet LichTrucMoi (CSV) khi NAS tắt/lỗi/rỗng
 *    c) Bản lưu trong localStorage (key `noiquy.lastSchedule`) khi cả hai lỗi
 *    d) FALLBACK_SCHEDULE trong js/app.js khi chưa từng tải được lần nào
 *
 *  NỘI QUY và CẤU HÌNH (ticker, note): đã hardcode trong js/content.js,
 *  KHÔNG tải từ Google Sheets nữa. Google Sheets chỉ còn dùng làm DỰ PHÒNG
 *  cho LỊCH TRỰC (sheet LichTrucMoi).
 *
 *  Hướng dẫn:
 *  1. Sheet cần có duy nhất tab lịch trực: LichTrucMoi
 *  2. Chia sẻ "Anyone with the link can view"
 *  3. Copy phần SHEET_ID từ URL của Sheets:
 *     https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
 *  4. Dán vào biến SHEET_ID bên dưới
 *
 *  Cấu trúc sheet LichTrucMoi khuyến nghị (dòng đầu là header):
 *  | Ngay      | ĐứcTM | GiangLT | LâmNN | QuangNM | LâmNHT | CôngĐT | Thông KVQ |
 *  | 1/6/2026  |      | C1      |      |         | C2     |        | C2        |
 *  | 2/6/2026  |      | C1      |      |         | C2     |        | C2        |
 *  Quy ước:
 *  - Cột Ngay là bắt buộc.
 *  - Các cột còn lại là tên/mã nhân sự.
 *  - Ô chứa C1 nghĩa là nhân sự đó trực Ca 1.
 *  - Ô chứa C2 nghĩa là nhân sự đó trực Ca 2.
 *  - Nếu một người trực nhiều ca trong cùng ngày, ngăn cách bằng dấu chấm phẩy: C1;C2
 *  - Ô trống nghĩa là không trực.
 *
 *  Vẫn hỗ trợ cấu trúc cũ:
 *  | Ngay       | C1              | C2                                        |
 *  | 20/4/2026  | Tống Minh Đức   | Nguyễn Hoàng Tiến Lâm;Khương Vũ Quang Thông |
 * ============================================================
 */

// ============================================================
//  CẤU HÌNH NGUỒN LỊCH TRỰC TRÊN NAS (nguồn chính)
//  API public, trả JSON:
//  { source, from, to, columns, rows: [{ "Ngày": "9/9/2026", "LâmNN": "C2", ... }], updated_at }
//  `rows` cùng dạng object như các dòng CSV của sheet ma trận LichTrucMoi
//  nên dùng thẳng được với buildScheduleData().
// ============================================================
const NAS_CONFIG = {
    ENABLED: true,
    URL_LICH_TRUC: 'https://database-dhcs.paroda.net/v2/public/lich-truc',
    TIMEOUT_MS: 8000,
    // NAS lưu tên viết tắt; đổi sang tên đầy đủ như cột của sheet LichTrucMoi.
    // Tên không có trong bảng thì giữ nguyên.
    // THỨ TỰ các khoá dưới đây = thứ tự hàng của bảng "Lịch trực tháng".
    TEN_DAY_DU: {
        'ĐứcTM': 'Tống Minh Đức',
        'GiangLT': 'Lê Trường Giang',
        'LâmNN': 'Nguyễn Ngọc Lâm',
        'QuangNM': 'Nguyễn Minh Quang',
        'LâmNHT': 'Nguyễn Hoàng Tiến Lâm',
        'CôngĐT': 'Đỗ Thành Công',
        'Thông KVQ': 'Khương Vũ Quang Thông',
    },
};
const SHEETS_CONFIG = {
    // ⚠️ ĐÃY LÀ SHEET ID THỰC TỜ
    SHEET_ID: '1CAH2EKk8BStCRtPVCH8ute_us9yi_7_UBdK0WHQN4_c',

    // Tên sheet lịch trực (phân biệt hoa thường - gõ đúng y như tên tab)
    // Web đang đọc LichTrucMoi; giữ LichTruc làm bản cũ dự phòng.
    SHEET_LICH_TRUC: 'LichTrucMoi',

    // URL tự động tính từ SHEET_ID (không cần sửa)
    get URL_LICH_TRUC() {
        return `https://docs.google.com/spreadsheets/d/${this.SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(this.SHEET_LICH_TRUC)}`;
    },

    // Thời gian cache (ms) — không fetch lại nếu chưa hết
    CACHE_TTL_MS: 5 * 60 * 1000, // 5 phút
};

// ============================================================
//  NHỊP TẢI LẠI DỮ LIỆU NGẦM (không tải lại trang)
//  Mỗi 5 phút: tải lại lịch trực (NAS → Sheets → bản lưu → fallback)
//  và chỉ vẽ lại phần lịch, nhãn nguồn ở góc dưới cập nhật theo.
// ============================================================
const REFRESH_MS = 5 * 60 * 1000; // 5 phút

// Giờ tải lại CẢ TRANG mỗi ngày (để TV nhận code mới sau khi deploy)
const DAILY_RELOAD_HOUR = 4; // 04:00 sáng

// ============================================================
//  API CÔNG KHAI MỚI (NAS) — cần KHOÁ ĐỌC qua header X-Read-Key
//  Khoá KHÔNG nằm trong source: mở web kèm #key=<khoá> MỘT LẦN,
//  web lưu vào localStorage (noiquy.readKey) rồi xoá hash khỏi địa chỉ.
//  (Xem initReadKey trong js/screens.js)
//
//  Lỗi có thể gặp: 401 invalid_read_key · 503 public_read_key_not_configured · 429
// ============================================================
const API_CONFIG = {
    BASE: 'https://database-dhcs.paroda.net/v2/public',
    URL_LICH_CONG_TAC: 'https://database-dhcs.paroda.net/v2/public/lich-cong-tac',
    URL_SU_CO_TON: 'https://database-dhcs.paroda.net/v2/public/su-co-ton',
    READ_KEY_STORAGE: 'noiquy.readKey',
    READ_KEY_HEADER: 'X-Read-Key',
    TIMEOUT_MS: 8000,
    // Số ngày tới lấy cho màn "Lịch công tác các đơn vị" (hôm nay .. +6)
    CONG_TAC_DAYS: 7,
};

// ============================================================
//  THỜI TIẾT TRÊN HEADER — Open-Meteo (không cần khoá)
//  Toạ độ khu chung cư Melody, Tân Phú, TP.HCM
// ============================================================
const WEATHER_CONFIG = {
    URL: 'https://api.open-meteo.com/v1/forecast?latitude=10.786&longitude=106.637'
        + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m'
        + '&hourly=precipitation_probability&forecast_hours=3&timezone=Asia%2FHo_Chi_Minh',
    TEN_KHU_VUC: 'Tân Phú',
    REFRESH_MS: 10 * 60 * 1000,  // 10 phút
    TIMEOUT_MS: 8000,
    STORAGE_KEY: 'noiquy.weather', // giữ số liệu cũ khi mất mạng
};

// ============================================================
//  VÒNG XOAY MÀN HÌNH (tab tự chuyển)
//  Màn 1 "Nội quy" = màn cũ (4 khung nội quy + sidebar ca trực).
//  Màn 2-4 chiếm đúng vùng của 4 khung nội quy; header/footer/sidebar giữ nguyên.
//
//  Chia trang: mỗi trang tối thiểu MIN_PAGE_MS, tối đa MAX_PAGE_MS;
//  nếu chia nhiều trang thì thời lượng màn được kéo dài cho đủ
//  (tối đa MAX_PAGES trang, phần dư cắt bớt và ghi "+N mục").
// ============================================================
const ROTATION = {
    ENABLED: true,
    FADE_MS: 400,          // chuyển màn bằng opacity
    NOI_QUY_MS: 60000,     // 60s
    CONG_TAC_MS: 30000,    // 30s
    LICH_TRUC_MS: 20000,   // 20s
    SU_CO_MS: 30000,       // 30s
    MIN_PAGE_MS: 10000,    // 10s/trang
    MAX_PAGE_MS: 30000,    // 30s/trang
    MAX_PAGES: 3,          // tối đa 3 trang/màn
};
