/**
 * ============================================================
 *  CẤU HÌNH KẾT NỐI GOOGLE SHEETS
 * ============================================================
 *
 *  Hướng dẫn:
 *  1. Tạo Google Sheets với các sheet tên: LichTrucMoi, LichTruc, CauHinh, NoiQuy
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
 *
 *  Cấu trúc sheet CauHinh (dòng đầu là header):
 *  | key     | value                                  |
 *  | ticker  | Nội dung dòng chạy ở footer...         |
 *  | note    | Ghi chú hiển thị ở cuối sidebar...     |
 * ============================================================
 */
const SHEETS_CONFIG = {
    // ⚠️ ĐÃY LÀ SHEET ID THỰC TỜ
    SHEET_ID: '1CAH2EKk8BStCRtPVCH8ute_us9yi_7_UBdK0WHQN4_c',

    // Tên các sheet (phân biệt hoa thường - gõ đúng y như tên tab)
    // Web đang đọc LichTrucMoi; giữ LichTruc làm bản cũ dự phòng.
    SHEET_LICH_TRUC: 'LichTrucMoi',
    SHEET_CAU_HINH: 'CauHinh',
    SHEET_NOI_QUY: 'NoiQuy',

    // URL tự động tính từ SHEET_ID (không cần sửa)
    get URL_LICH_TRUC() {
        return `https://docs.google.com/spreadsheets/d/${this.SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(this.SHEET_LICH_TRUC)}`;
    },
    get URL_CAU_HINH() {
        return `https://docs.google.com/spreadsheets/d/${this.SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(this.SHEET_CAU_HINH)}`;
    },
    get URL_NOI_QUY() {
        return `https://docs.google.com/spreadsheets/d/${this.SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(this.SHEET_NOI_QUY)}`;
    },

    // Thời gian cache (ms) — không fetch lại nếu chưa hết
    CACHE_TTL_MS: 5 * 60 * 1000, // 5 phút
};
