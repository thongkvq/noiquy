// ============================================================
//  FALLBACK DATA — dùng khi Sheets chưa cấu hình hoặc fetch lỗi
// ============================================================
const FALLBACK_SCHEDULE = {
    "18/4/2026": { C1: ["Nguyễn Ngọc Lâm"], C2: ["Nguyễn Minh Quang", "Đỗ Thành Công"] },
    "19/4/2026": { C1: ["Nguyễn Ngọc Lâm"], C2: ["Nguyễn Minh Quang", "Đỗ Thành Công"] },
    "20/4/2026": { C1: ["Tống Minh Đức"], C2: ["Nguyễn Hoàng Tiến Lâm", "Khương Vũ Quang Thông"] },
    "21/4/2026": { C1: ["Tống Minh Đức"], C2: ["Nguyễn Hoàng Tiến Lâm", "Khương Vũ Quang Thông"] },
    "22/4/2026": { C1: ["Lê Trường Giang"], C2: ["Nguyễn Ngọc Lâm", "Nguyễn Minh Quang"] },
    "23/4/2026": { C1: ["Lê Trường Giang"], C2: ["Nguyễn Ngọc Lâm", "Nguyễn Minh Quang"] },
    "24/4/2026": { C1: ["Đỗ Thành Công"], C2: ["Tống Minh Đức", "Nguyễn Hoàng Tiến Lâm"] },
    "25/4/2026": { C1: ["Đỗ Thành Công"], C2: ["Tống Minh Đức", "Nguyễn Hoàng Tiến Lâm"] },
    "26/4/2026": { C1: ["Khương Vũ Quang Thông"], C2: ["Lê Trường Giang", "Nguyễn Ngọc Lâm"] },
    "27/4/2026": { C1: ["Nguyễn Minh Quang"], C2: ["Lê Trường Giang", "Nguyễn Ngọc Lâm"] },
    "28/4/2026": { C1: ["Khương Vũ Quang Thông"], C2: ["Tống Minh Đức", "Đỗ Thành Công"] },
    "29/4/2026": { C1: ["Nguyễn Minh Quang"], C2: ["Tống Minh Đức", "Đỗ Thành Công"] },
    "30/4/2026": { C1: ["Nguyễn Hoàng Tiến Lâm"], C2: ["Lê Trường Giang", "Khương Vũ Quang Thông"] },
    "1/5/2026":  { C1: ["Nguyễn Hoàng Tiến Lâm"], C2: ["Lê Trường Giang", "Khương Vũ Quang Thông"] },
    "2/5/2026":  { C1: ["Nguyễn Ngọc Lâm"], C2: ["Nguyễn Minh Quang", "Đỗ Thành Công"] },
    "3/5/2026":  { C1: ["Nguyễn Ngọc Lâm"], C2: ["Nguyễn Minh Quang", "Đỗ Thành Công"] },
    "4/5/2026":  { C1: ["Tống Minh Đức"], C2: ["Nguyễn Hoàng Tiến Lâm", "Khương Vũ Quang Thông"] },
    "5/5/2026":  { C1: ["Tống Minh Đức"], C2: ["Nguyễn Hoàng Tiến Lâm", "Khương Vũ Quang Thông"] },
    "6/5/2026":  { C1: ["Lê Trường Giang"], C2: ["Nguyễn Ngọc Lâm", "Nguyễn Minh Quang"] },
    "7/5/2026":  { C1: ["Lê Trường Giang"], C2: ["Nguyễn Ngọc Lâm", "Nguyễn Minh Quang"] },
    "8/5/2026":  { C1: ["Đỗ Thành Công"], C2: ["Tống Minh Đức", "Nguyễn Hoàng Tiến Lâm"] },
    "9/5/2026":  { C1: ["Đỗ Thành Công"], C2: ["Tống Minh Đức", "Nguyễn Hoàng Tiến Lâm"] },
    "10/5/2026": { C1: ["Khương Vũ Quang Thông"], C2: ["Lê Trường Giang", "Nguyễn Ngọc Lâm"] },
    "11/5/2026": { C1: ["Khương Vũ Quang Thông"], C2: ["Lê Trường Giang", "Nguyễn Ngọc Lâm"] },
    "12/5/2026": { C1: ["Nguyễn Minh Quang"], C2: ["Tống Minh Đức", "Đỗ Thành Công"] },
    "13/5/2026": { C1: ["Nguyễn Minh Quang"], C2: ["Tống Minh Đức", "Đỗ Thành Công"] },
    "14/5/2026": { C1: ["Nguyễn Hoàng Tiến Lâm"], C2: ["Lê Trường Giang", "Khương Vũ Quang Thông"] },
    "15/5/2026": { C1: ["Nguyễn Hoàng Tiến Lâm"], C2: ["Lê Trường Giang", "Khương Vũ Quang Thông"] },
    "16/5/2026": { C1: ["Nguyễn Ngọc Lâm"], C2: ["Nguyễn Minh Quang", "Đỗ Thành Công"] },
    "17/5/2026": { C1: ["Tống Minh Đức", "Nguyễn Ngọc Lâm"], C2: ["Nguyễn Minh Quang", "Đỗ Thành Công"] },
    "18/5/2026": { C1: ["Tống Minh Đức"], C2: ["Nguyễn Hoàng Tiến Lâm", "Khương Vũ Quang Thông"] },
    "19/5/2026": { C1: ["Tống Minh Đức"], C2: ["Nguyễn Hoàng Tiến Lâm", "Khương Vũ Quang Thông"] },
    "20/5/2026": { C1: ["Lê Trường Giang"], C2: ["Nguyễn Ngọc Lâm", "Nguyễn Minh Quang"] },
    "21/5/2026": { C1: ["Lê Trường Giang"], C2: ["Nguyễn Ngọc Lâm", "Nguyễn Minh Quang"] },
    "22/5/2026": { C1: ["Đỗ Thành Công"], C2: ["Tống Minh Đức", "Nguyễn Hoàng Tiến Lâm"] },
    "23/5/2026": { C1: ["Đỗ Thành Công"], C2: ["Tống Minh Đức", "Nguyễn Hoàng Tiến Lâm"] },
    "24/5/2026": { C1: ["Khương Vũ Quang Thông"], C2: ["Lê Trường Giang", "Nguyễn Ngọc Lâm"] },
    "25/5/2026": { C1: ["Khương Vũ Quang Thông"], C2: ["Lê Trường Giang", "Nguyễn Ngọc Lâm"] },
    "26/5/2026": { C1: ["Nguyễn Minh Quang"], C2: ["Tống Minh Đức", "Đỗ Thành Công"] },
    "27/5/2026": { C1: ["Nguyễn Minh Quang"], C2: ["Tống Minh Đức", "Đỗ Thành Công"] },
    "28/5/2026": { C1: ["Nguyễn Hoàng Tiến Lâm"], C2: ["Lê Trường Giang", "Khương Vũ Quang Thông"] },
    "29/5/2026": { C1: ["Nguyễn Hoàng Tiến Lâm"], C2: ["Lê Trường Giang", "Khương Vũ Quang Thông"] },
    "30/5/2026": { C1: ["Nguyễn Ngọc Lâm"], C2: ["Nguyễn Minh Quang", "Đỗ Thành Công"] },
    "31/5/2026": { C1: ["Nguyễn Ngọc Lâm"], C2: ["Nguyễn Minh Quang", "Đỗ Thành Công"] },
};

// Dữ liệu đang hoạt động (sẽ được ghi đè bởi Sheets nếu cấu hình thành công)
let scheduleData = Object.assign({}, FALLBACK_SCHEDULE);

// ============================================================
//  FALLBACK NỘI QUY — hiển thị khi chưa có sheet NoiQuy
// ============================================================
const FALLBACK_NOI_QUY = [
    { panel: '1', tieu_de: '1. Quy định thời gian & bàn giao', noi_dung: 'Có mặt trước giờ giao nhận ca ít nhất [O]15 phút[/O] để nắm bắt tình hình hệ thống và các sự cố từ ca trước.' },
    { panel: '1', tieu_de: '', noi_dung: '[W]Thủ tục bàn giao:[/W] Ghi chép đầy đủ vào sổ nhật ký (Tình trạng mạng IT/OT, sự cố đang xử lý, kế hoạch công tác).' },
    { panel: '1', tieu_de: '', noi_dung: 'Tuân thủ lịch trực theo ca kíp dưới sự phân công của Quản lý phòng.' },
    { panel: '1', tieu_de: '', noi_dung: 'Dọn dẹp vệ sinh nơi làm việc trước khi bàn giao ca.' },
    { panel: '2', tieu_de: '2. Kỷ luật & tác phong làm việc', noi_dung: '[R]Không được tự ý rời bỏ vị trí trực[/R] khi chưa có người thay thế. (Bất khả kháng phải báo cáo ngay cho Quản lý phòng).' },
    { panel: '2', tieu_de: '', noi_dung: 'Không được làm việc riêng trong ca trực.' },
    { panel: '2', tieu_de: '', noi_dung: '[R]Nghiêm cấm[/R] uống rượu, bia hoặc tổ chức liên hoan tại nơi làm việc trong thời gian trực.' },
    { panel: '2', tieu_de: '', noi_dung: '[W]Trật tự vệ sinh:[/W] Giữ gìn vệ sinh khu vực trực, sắp xếp đồ dùng cá nhân đúng nơi quy định.' },
    { panel: '3', tieu_de: '3. Trách nhiệm chuyên môn', noi_dung: '[W]Giám sát:[/W] Hệ thống mạng truyền dẫn SCADA, tín hiệu các TBA và mạng Điều hành sản xuất.' },
    { panel: '3', tieu_de: '', noi_dung: '[W]Xử lý sự cố:[/W] Báo cáo kịp thời cấp có thẩm quyền. Nguyên tắc: [O]Nhanh chóng, chính xác, đúng quy trình.[/O]' },
    { panel: '3', tieu_de: '', noi_dung: 'Khách vào khu vực làm việc [R]phải có sự phê duyệt của Lãnh đạo[/R] và đảm bảo an toàn.' },
    { panel: '3', tieu_de: '', noi_dung: 'Tất cả khách phải đăng ký thông tin vào [O]Sổ nhật ký ra vào[/O] phòng trực ĐHCS.' },
    { panel: '4', tieu_de: '4. Trang thiết bị & an toàn', noi_dung: '[W]Bảo quản tài sản:[/W] Có trách nhiệm bảo quản vật tư, thiết bị điều hành và hồ sơ lưu trữ tại cơ sở.' },
    { panel: '4', tieu_de: '', noi_dung: '[W]Phòng cháy chữa cháy:[/W] Tuân thủ [R]nghiêm ngặt[/R] các quy định về an toàn điện, phòng chống cháy nổ tại phòng điều khiển.' },
];

// ============================================================
//  CSV PARSER — hỗ trợ trường có dấu phẩy bên trong ngoặc kép
// ============================================================
function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const parseRow = (line) => {
        const fields = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === '"') {
                // Escaped quote ("")
                if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
                else { inQuotes = !inQuotes; }
            } else if (ch === ',' && !inQuotes) {
                fields.push(current); current = '';
            } else {
                current += ch;
            }
        }
        fields.push(current);
        return fields.map(f => f.trim());
    };

    const headers = parseRow(lines[0]);
    return lines.slice(1)
        .map(line => {
            const fields = parseRow(line);
            const obj = {};
            headers.forEach((h, i) => { obj[h] = fields[i] || ''; });
            return obj;
        })
        .filter(row => Object.values(row).some(v => v !== '')); // bỏ dòng trống
}

// ============================================================
//  CHUẨN HÓA NGÀY — đưa về định dạng d/M/yyyy (không có số 0 ở đầu)
// ============================================================
function normalizeDate(str) {
    if (!str) return '';
    // Xử lý cả dấu gạch ngang hoặc gạch chéo
    const parts = str.replace(/-/g, '/').split('/');
    if (parts.length !== 3) return str;
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const y = parts[2];
    return `${d}/${m}/${y}`;
}


// ============================================================
//  BUILD SCHEDULE DATA từ CSV rows
// ============================================================
function buildScheduleData(rows) {
    const data = {};
    rows.forEach(row => {
        const rawNgay = (row['Ngay'] || row['ngay'] || '').trim();
        const ngay = normalizeDate(rawNgay);
        const c1Raw = (row['C1'] || row['c1'] || '').trim();
        const c2Raw = (row['C2'] || row['c2'] || '').trim();
        if (!ngay) return;
        data[ngay] = {
            C1: c1Raw ? c1Raw.split(';').map(s => s.trim()).filter(Boolean) : ['(Trống)'],
            C2: c2Raw ? c2Raw.split(';').map(s => s.trim()).filter(Boolean) : ['(Trống)'],
        };
    });
    return data;
}

// ============================================================
//  BUILD CONFIG từ CSV rows (cặp key-value)
// ============================================================
function buildConfig(rows) {
    const config = {};
    rows.forEach(row => {
        const k = (row['key'] || row['Key'] || '').trim();
        const v = (row['value'] || row['Value'] || '').trim();
        if (k) config[k] = v;
    });
    return config;
}

// ============================================================
//  MARKUP PARSER: [R]...[/R] [O]...[/O] [W]...[/W]
//  Bộ phân giải tẫ markup thành HTML span highlight
// ============================================================
function parseMarkup(text) {
    return text
        .replace(/\[R\](.*?)\[\/R\]/g, '<span class="hl-red">$1</span>')
        .replace(/\[O\](.*?)\[\/O\]/g, '<span class="hl-orange">$1</span>')
        .replace(/\[W\](.*?)\[\/W\]/g, '<span class="hl-white">$1</span>');
}

// ============================================================
//  BUILD NOI QUY DATA từ CSV rows
// ============================================================
function buildNoiQuyData(rows) {
    // Group by panel number
    const panels = { '1': [], '2': [], '3': [], '4': [] };
    const titles = {};
    rows.forEach(row => {
        const p = (row['panel'] || row['Panel'] || '').trim();
        const tieude = (row['tieu_de'] || row['Tieu_de'] || '').trim();
        const noidung = (row['noi_dung'] || row['Noi_dung'] || '').trim();
        if (!p || !panels[p]) return;
        if (tieude) titles[p] = tieude;
        if (noidung) panels[p].push(noidung);
    });
    return { panels, titles };
}

// ============================================================
//  RENDER 4 PANELS NỘI QUY
// ============================================================
function renderPanels(rows) {
    const { panels, titles } = buildNoiQuyData(rows);
    for (let i = 1; i <= 4; i++) {
        const titleEl = document.getElementById(`panel-title-${i}`);
        const listEl  = document.getElementById(`panel-list-${i}`);
        if (titleEl && titles[String(i)]) {
            titleEl.innerHTML = parseMarkup(titles[String(i)]);
        }
        if (listEl && panels[String(i)] && panels[String(i)].length > 0) {
            listEl.innerHTML = panels[String(i)]
                .map(item => `<li>${parseMarkup(item)}</li>`)
                .join('');
        }
    }
}

// ============================================================
//  RENDER PANELS DỰNG DỮ LIỆU FALLBACK
// ============================================================
function renderFallbackPanels() {
    renderPanels(FALLBACK_NOI_QUY);
}

// ============================================================
//  ÁP DỤNG CONFIG vào DOM
// ============================================================
function applyConfig(config) {
    if (config.ticker) {
        const marquee = document.querySelector('.marquee');
        if (marquee) marquee.textContent = config.ticker;
    }
    if (config.note) {
        const note = document.querySelector('.schedule-note');
        if (note) note.textContent = config.note;
    }
}

// ============================================================
//  TRẠNG THÁI LOADING & STATUS
// ============================================================
function setLoadingState(isLoading) {
    const listIds = ['list-c1', 'list-c2', 'list-t1', 'list-t2'];
    if (isLoading) {
        listIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = '<li class="loading-item"><span class="spinner"></span> Đang tải...</li>';
        });
    }
}

function setStatusNote(state) {
    const note = document.querySelector('.schedule-note');
    if (!note) return;
    const messages = {
        live:   '🟢 Đồng bộ từ Google Sheets.',
        local:  '🟡 Dùng dữ liệu nội bộ (chưa cấu hình Sheets).',
        error:  '🔴 Lỗi kết nối Sheets — hiển thị dữ liệu nội bộ.',
    };
    note.textContent = messages[state] || '';
}

// ============================================================
//  FETCH helper
// ============================================================
async function fetchCSV(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
}

// ============================================================
//  LOAD DỮ LIỆU TỪ GOOGLE SHEETS
// ============================================================
async function loadFromSheets() {
    const id = SHEETS_CONFIG.SHEET_ID;

    // Chưa cấu hình Sheet ID
    if (!id || id === 'YOUR_SHEET_ID_HERE') {
        console.warn('[Sheets] Chưa cấu hình SHEET_ID trong js/config.js');
        setStatusNote('local');
        renderFallbackPanels();
        updateScheduleDisplay(new Date());
        return;
    }

    setLoadingState(true);

    try {
        // Fetch song song cả 3 sheet
        const [scheduleCSV, configCSV, noiQuyCSV] = await Promise.allSettled([
            fetchCSV(SHEETS_CONFIG.URL_LICH_TRUC),
            fetchCSV(SHEETS_CONFIG.URL_CAU_HINH),
            fetchCSV(SHEETS_CONFIG.URL_NOI_QUY),
        ]);

        // Xử lý LichTruc
        if (scheduleCSV.status === 'fulfilled') {
            const rows = parseCSV(scheduleCSV.value);
            if (rows.length > 0) {
                scheduleData = buildScheduleData(rows);
                console.log(`[Sheets] Đã tải ${Object.keys(scheduleData).length} ngày trực từ Sheets.`);
            }
        } else {
            console.error('[Sheets] Lỗi tải LichTruc:', scheduleCSV.reason);
        }

        // Xử lý CauHinh (tuỳ chọn)
        if (configCSV.status === 'fulfilled') {
            const rows = parseCSV(configCSV.value);
            const config = buildConfig(rows);
            applyConfig(config);
        }

        // Xử lý NoiQuy (hình thức panels nội quy)
        if (noiQuyCSV.status === 'fulfilled') {
            const rows = parseCSV(noiQuyCSV.value);
            if (rows.length > 0) {
                renderPanels(rows);
            } else {
                renderFallbackPanels();
            }
        } else {
            console.warn('[Sheets] Không tải được NoiQuy, dùng fallback.');
            renderFallbackPanels();
        }

        // Status badge
        const success = scheduleCSV.status === 'fulfilled';
        setStatusNote(success ? 'live' : 'error');

    } catch (err) {
        console.error('[Sheets] Lỗi không xác định:', err);
        setStatusNote('error');
        renderFallbackPanels();
    }

    updateScheduleDisplay(new Date());
}

// ============================================================
//  RENDER HTML cho 1 thành viên
// ============================================================
function memberHTML(name) {
    return `<li>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--evn-orange)" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg> ${name}
    </li>`;
}

// ============================================================
//  HIỂN THỊ LỊCH TRỰC (logic giữ nguyên từ bản cũ)
// ============================================================
function updateScheduleDisplay(now) {
    const hour = now.getHours();

    // Logic "Ngày hiệu lực": trước 6h sáng thuộc kỳ trực ngày hôm trước
    const effectiveDate = new Date(now);
    if (hour < 6) effectiveDate.setDate(now.getDate() - 1);

    const dateStr = `${effectiveDate.getDate()}/${effectiveDate.getMonth() + 1}/${effectiveDate.getFullYear()}`;
    const nextDate = new Date(effectiveDate);
    nextDate.setDate(effectiveDate.getDate() + 1);
    const tomorrowStr = `${nextDate.getDate()}/${nextDate.getMonth() + 1}/${nextDate.getFullYear()}`;

    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    const scheduleDateStr = document.getElementById('scheduleDateStr');
    if (!scheduleDateStr) return;

    const paddedDate = `${String(effectiveDate.getDate()).padStart(2, '0')}/${String(effectiveDate.getMonth() + 1).padStart(2, '0')}/${effectiveDate.getFullYear()}`;
    scheduleDateStr.innerText = `${days[effectiveDate.getDay()]}, ${paddedDate}`;

    const todaySchedule    = scheduleData[dateStr]    || { C1: ['(Trống)'], C2: ['(Trống)'] };
    const tomorrowSchedule = scheduleData[tomorrowStr] || { C1: ['(Trống)'], C2: ['(Trống)'] };

    const listMap = {
        'list-c1': todaySchedule.C1,
        'list-c2': todaySchedule.C2,
        'list-t1': tomorrowSchedule.C1,
        'list-t2': tomorrowSchedule.C2,
    };
    Object.entries(listMap).forEach(([id, names]) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = names.map(memberHTML).join('');
    });

    // Highlight ca đang trực
    const cardC1 = document.getElementById('card-c1');
    const cardC2 = document.getElementById('card-c2');
    if (cardC1 && cardC2) {
        if (now.getHours() >= 6 && now.getHours() < 18) {
            cardC1.classList.add('active');
            cardC2.classList.remove('active');
        } else {
            cardC2.classList.add('active');
            cardC1.classList.remove('active');
        }
    }
}

// ============================================================
//  ĐỒNG HỒ
// ============================================================
function updateClock() {
    const now = new Date();
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.innerHTML = `${String(now.getHours()).padStart(2, '0')}<span class="blink-c">:</span>${String(now.getMinutes()).padStart(2, '0')}`;
    }

    const dateEl = document.getElementById('date');
    if (dateEl) {
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        dateEl.innerText = `${days[now.getDay()]}, ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    }

    // Cập nhật lịch mỗi phút (giây = 0)
    if (now.getSeconds() === 0 || !window.scheduleInitialized) {
        updateScheduleDisplay(now);
        window.scheduleInitialized = true;
    }
}

// ============================================================
//  KIOSK MODE (FULLSCREEN & IDLE CURSOR)
// ============================================================
function initKioskMode() {
    const btn = document.getElementById('fullscreen-btn');
    if (!btn) return;

    // Toggle Fullscreen
    btn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    // Cập nhật icon nút dựa trên trạng thái fullscreen
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
            </svg>`;
            btn.setAttribute('title', 'Thoát toàn màn hình');
        } else {
            btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>`;
            btn.setAttribute('title', 'Chế độ TV (Toàn màn hình)');
        }
    });

    // Ẩn con trỏ chuột khi không có tương tác
    let idleTimeout;
    const idleTime = 3000; // 3 giây
    
    function resetIdleTimer() {
        document.body.classList.remove('kiosk-active');
        clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => {
            document.body.classList.add('kiosk-active');
        }, idleTime);
    }

    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('mousedown', resetIdleTimer);
    window.addEventListener('keypress', resetIdleTimer);
    window.addEventListener('touchstart', resetIdleTimer);

    resetIdleTimer();
}

// ============================================================
//  ENTRY POINT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Khởi động đồng hồ
    setInterval(updateClock, 1000);
    updateClock();

    // Load dữ liệu từ Google Sheets
    loadFromSheets();

    // Khởi tạo tính năng Kiosk Mode (Toàn màn hình)
    initKioskMode();

    // Reload trang mỗi 30 phút để lấy dữ liệu mới nhất từ Sheets
    setTimeout(() => { location.reload(); }, 30 * 60 * 1000);
});
