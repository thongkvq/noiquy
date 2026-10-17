// ============================================================
//  DỮ LIỆU LỊCH TRỰC DỰ PHÒNG CUỐI CÙNG
//  Chỉ dùng khi: NAS lỗi + Sheets lỗi + chưa từng có bản lưu trong máy.
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

// ============================================================
//  LƯU LỊCH GẦN NHẤT VÀO MÁY (localStorage) — dùng khi mất mạng
//  Mọi thao tác đọc/ghi đều bọc try/catch: localStorage lỗi hoặc trống
//  thì web vẫn chạy bình thường.
// ============================================================
const SCHEDULE_CACHE_KEY = 'noiquy.lastSchedule';

// Dữ liệu lịch trực đang hiển thị (chỉ bị ghi đè khi tải thành công)
let scheduleData = FALLBACK_SCHEDULE;

// Bản lưu gần nhất trong phiên đang chạy (dùng khi localStorage không ghi được)
let inMemoryLastGood = null; // { data, source, at }

function readScheduleCache() {
    try {
        const raw = localStorage.getItem(SCHEDULE_CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return null;
        if (!parsed.data || typeof parsed.data !== 'object') return null;
        if (Object.keys(parsed.data).length === 0) return null;
        return parsed;
    } catch (err) {
        console.warn('[Cache] Không đọc được bản lưu trong máy:', (err && err.message) || err);
        return null;
    }
}

function writeScheduleCache(data, source) {
    try {
        localStorage.setItem(SCHEDULE_CACHE_KEY, JSON.stringify({
            data: data,
            source: source,
            savedAt: Date.now(),
        }));
    } catch (err) {
        console.warn('[Cache] Không ghi được bản lưu vào máy:', (err && err.message) || err);
    }
}

// Lịch đang hiển thị: ưu tiên bản lưu trong máy, chưa có thì dùng dữ liệu dự phòng cũ.
// (Bản lưu được ghi lại mỗi lần tải NAS/Sheets thành công.)
(function initScheduleData() {
    const cached = readScheduleCache();
    scheduleData = (cached && cached.data) ? cached.data : FALLBACK_SCHEDULE;
    if (cached) inMemoryLastGood = { data: cached.data, source: cached.source || 'cache', at: cached.savedAt || 0 };
})();


// ============================================================
//  NỘI QUY — nay hardcode trong js/content.js (NOI_QUY_ROWS),
//  KHÔNG tải từ Google Sheets nữa. Muốn sửa nội quy: sửa js/content.js.
// ============================================================

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


function splitShiftMembers(value) {
    return String(value || '')
        .split(';')
        .map(s => s.trim())
        .filter(Boolean);
}

function normalizeShiftCode(value) {
    return String(value || '').trim().toUpperCase().replace(/\s+/g, '');
}

function isMatrixScheduleRow(row) {
    return Object.keys(row).some(key => {
        const normalizedKey = key.trim().toLowerCase();
        if (!normalizedKey || normalizedKey === 'ngay' || normalizedKey === 'thu' || normalizedKey === 'thứ' || normalizedKey === 'c1' || normalizedKey === 'c2') return false;
        return ['C1', 'C2'].includes(normalizeShiftCode(row[key]));
    });
}

function buildLegacyScheduleData(rows) {
    const data = {};
    rows.forEach(row => {
        const rawNgay = (row['Ngày'] || row['Ngay'] || row['ngay'] || '').trim();
        const ngay = normalizeDate(rawNgay);
        const c1Raw = (row['C1'] || row['c1'] || '').trim();
        const c2Raw = (row['C2'] || row['c2'] || '').trim();
        if (!ngay) return;
        data[ngay] = {
            C1: splitShiftMembers(c1Raw),
            C2: splitShiftMembers(c2Raw),
        };
    });
    return data;
}

function buildMatrixScheduleData(rows) {
    const data = {};
    rows.forEach(row => {
        const rawNgay = (row['Ngày'] || row['Ngay'] || row['ngay'] || '').trim();
        const ngay = normalizeDate(rawNgay);
        if (!ngay) return;

        const shifts = { C1: [], C2: [] };
        Object.entries(row).forEach(([memberName, shiftValue]) => {
            const normalizedName = memberName.trim();
            const normalizedKey = normalizedName.toLowerCase();
            if (!normalizedName || normalizedKey === 'ngay' || normalizedKey === 'ngày' || normalizedKey === 'thu' || normalizedKey === 'thứ') return;

            splitShiftMembers(shiftValue).forEach(code => {
                const normalizedCode = normalizeShiftCode(code);
                if (normalizedCode === 'C1' || normalizedCode === 'C2') {
                    shifts[normalizedCode].push(normalizedName);
                }
            });
        });

        data[ngay] = shifts;
    });
    return data;
}

// ============================================================
//  BUILD SCHEDULE DATA từ CSV rows
//  Hỗ trợ 2 kiểu sheet:
//  1) Cũ: Ngay | C1 | C2
//  2) Ma trận: Ngay | Tên nhân sự 1 | Tên nhân sự 2 | ...; ô chứa C1/C2
// ============================================================
function buildScheduleData(rows) {
    const hasLegacyColumns = rows.some(row => 'C1' in row || 'c1' in row || 'C2' in row || 'c2' in row);
    const hasMatrixRows = rows.some(isMatrixScheduleRow);
    const data = hasMatrixRows && !hasLegacyColumns
        ? buildMatrixScheduleData(rows)
        : buildLegacyScheduleData(rows);

    Object.values(data).forEach(day => {
        day.C1 = day.C1.length ? day.C1 : ['(Trống)'];
        day.C2 = day.C2.length ? day.C2 : ['(Trống)'];
    });

    return data;
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
//  BUILD NOI QUY DATA từ rows (nay lấy từ js/content.js)
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
//  ÁP DỤNG CẤU HÌNH (ticker, note) — nay lấy từ js/content.js
//  Ghi chú `note` giữ nguyên chỗ cũ (.schedule-note), KHÔNG trộn
//  với nhãn nguồn dữ liệu ở góc dưới màn hình.
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
//  NHÃN NGUỒN DỮ LIỆU (góc dưới phải, ngay trên footer)
//    nas      : xanh  — "NAS · HH:mm"
//    sheets   : vàng  — "Google Sheets (NAS lỗi) · HH:mm"
//    cache    : cam   — "Bản lưu dd/MM HH:mm (mất mạng)"
//    fallback : đỏ    — "Dữ liệu dự phòng cũ"
// ============================================================
function pad2(n) {
    return String(n).padStart(2, '0');
}

function formatHM(date) {
    return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

function formatDMHM(date) {
    return `${pad2(date.getDate())}/${pad2(date.getMonth() + 1)} ${formatHM(date)}`;
}

const SOURCE_BADGE_CLASS = {
    nas: 'is-nas',
    sheets: 'is-sheets',
    cache: 'is-cache',
    fallback: 'is-fallback',
};

function sourceBadgeText(kind, at) {
    const when = at instanceof Date ? at : new Date();
    if (kind === 'nas') return `NAS · ${formatHM(when)}`;
    if (kind === 'sheets') return `Google Sheets (NAS lỗi) · ${formatHM(when)}`;
    if (kind === 'cache') return `Bản lưu ${formatDMHM(when)} (mất mạng)`;
    return 'Dữ liệu dự phòng cũ';
}

function setSourceBadge(kind, at) {
    const badge = document.getElementById('sourceBadge');
    if (!badge) return;

    const txt = badge.querySelector('.txt');
    if (txt) txt.textContent = sourceBadgeText(kind, at);
    badge.classList.remove(...Object.values(SOURCE_BADGE_CLASS));
    if (SOURCE_BADGE_CLASS[kind]) badge.classList.add(SOURCE_BADGE_CLASS[kind]);
    badge.title = 'Nguồn dữ liệu lịch trực';
    badge.hidden = false;

    positionSourceBadge();
}

// Đặt nhãn ngay trên footer, sát mép phải (footer chiếm cả đáy màn hình)
function positionSourceBadge() {
    const badge = document.getElementById('sourceBadge');
    const footer = document.querySelector('.footer');
    if (!badge || !footer) return;
    badge.style.bottom = `${footer.offsetHeight + 8}px`;
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
//  FETCH lịch trực từ API public trên NAS
//  Thành công khi: HTTP 200 + JSON có `rows` là mảng không rỗng.
//  Trả về mảng rows (dùng thẳng cho buildScheduleData).
// ============================================================
async function fetchNASLichTruc() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), NAS_CONFIG.TIMEOUT_MS);
    try {
        const res = await fetch(NAS_CONFIG.URL_LICH_TRUC, {
            cache: 'no-store',
            headers: { Accept: 'application/json' },
            signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const payload = await res.json();
        if (!payload || !Array.isArray(payload.rows)) {
            throw new Error('JSON không có mảng rows');
        }
        if (payload.rows.length === 0) {
            throw new Error('rows rỗng');
        }
        return payload.rows;
    } catch (err) {
        if (err && err.name === 'AbortError') {
            throw new Error(`quá hạn ${NAS_CONFIG.TIMEOUT_MS}ms`);
        }
        throw err;
    } finally {
        clearTimeout(timer);
    }
}

// ============================================================
//  LOAD LỊCH TRỰC (chỉ lịch trực — nội quy/cấu hình đã hardcode trong js/content.js)
//  Thứ tự: NAS -> Google Sheets LichTrucMoi -> bản lưu trong máy -> FALLBACK_SCHEDULE
//  Một lần tải lỗi KHÔNG được xoá lịch đang hiển thị.
// ============================================================
async function loadScheduleData() {
    const id = SHEETS_CONFIG.SHEET_ID;
    const hasSheetsId = Boolean(id) && id !== 'YOUR_SHEET_ID_HERE';
    if (!hasSheetsId) {
        console.warn('[Sheets] Chưa cấu hình SHEET_ID trong js/config.js — chỉ dùng NAS (nếu bật).');
    }

    let loaded = null; // { data, source } — chỉ khác null khi tải THÀNH CÔNG

    // (a) NAS là nguồn chính
    if (typeof NAS_CONFIG !== 'undefined' && NAS_CONFIG.ENABLED) {
        try {
            const rows = await fetchNASLichTruc();
            const tenDayDu = NAS_CONFIG.TEN_DAY_DU || {};
            const nasData = buildScheduleData(rows.map(row => Object.fromEntries(
                Object.entries(row).map(([key, value]) => [tenDayDu[key.normalize('NFC')] || key, value])
            )));
            // NAS thiếu ngày trực hiện tại (trước 6h tính là hôm trước) → coi như lỗi để dùng Sheets.
            const effectiveDate = new Date();
            if (effectiveDate.getHours() < 6) effectiveDate.setDate(effectiveDate.getDate() - 1);
            const todayKey = `${effectiveDate.getDate()}/${effectiveDate.getMonth() + 1}/${effectiveDate.getFullYear()}`;
            if (!nasData[todayKey]) throw new Error(`thiếu lịch ngày ${todayKey}`);
            loaded = { data: nasData, source: 'nas' };
            console.log(`[NAS] Đã tải ${Object.keys(nasData).length} ngày trực từ NAS.`);
        } catch (err) {
            console.warn('[NAS] Không tải được lịch trực từ NAS:', (err && err.message) || err);
        }
    } else {
        console.warn('[NAS] Nguồn NAS đang tắt (NAS_CONFIG.ENABLED = false).');
    }

    // (b) Sheets dự phòng khi NAS tắt/lỗi/rỗng
    if (!loaded && hasSheetsId) {
        try {
            const scheduleCSV = await fetchCSV(SHEETS_CONFIG.URL_LICH_TRUC);
            const rows = parseCSV(scheduleCSV);
            if (rows.length > 0) {
                const sheetsData = buildScheduleData(rows);
                loaded = { data: sheetsData, source: 'sheets' };
                console.log(`[Sheets] Đã tải ${Object.keys(sheetsData).length} ngày trực từ Sheets (dự phòng).`);
            } else {
                console.warn('[Sheets] Sheet LichTrucMoi rỗng.');
            }
        } catch (err) {
            console.warn('[Sheets] Lỗi tải lịch trực:', (err && err.message) || err);
        }
    }

    if (loaded) {
        // Tải thành công → lưu bản lưu vào máy rồi mới hiển thị
        scheduleData = loaded.data;
        inMemoryLastGood = { data: loaded.data, source: loaded.source, at: Date.now() };
        writeScheduleCache(loaded.data, loaded.source);
        setSourceBadge(loaded.source, new Date());
    } else {
        // (c) Cả NAS lẫn Sheets đều lỗi → dùng bản lưu trong máy (nhãn màu cam)
        const cached = readScheduleCache();
        if (cached) {
            scheduleData = cached.data;
            setSourceBadge('cache', new Date(cached.savedAt || Date.now()));
            console.log('[Cache] Mất mạng — dùng bản lưu lịch trực trong máy.');
        } else if (inMemoryLastGood) {
            // localStorage hỏng nhưng phiên này đã từng tải được → giữ nguyên lịch đang hiển thị
            scheduleData = inMemoryLastGood.data;
            setSourceBadge('cache', new Date(inMemoryLastGood.at || Date.now()));
            console.log('[Cache] Không đọc được bản lưu — giữ lịch đã tải trong phiên này.');
        } else {
            // (d) Chưa từng tải được lần nào → giữ FALLBACK_SCHEDULE (nhãn màu đỏ)
            setSourceBadge('fallback');
            console.log('[Fallback] Chưa có bản lưu nào — dùng dữ liệu dự phòng cũ.');
        }
    }

    updateScheduleDisplay(new Date(), true);
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

let lastRenderedScheduleKey = '';
let lastRenderedMinute = '';

// ============================================================
//  HIỂN THỊ LỊCH TRỰC (logic giữ nguyên từ bản cũ)
// ============================================================
function updateScheduleDisplay(now, forceRender = false) {
    const hour = now.getHours();
    const minuteKey = `${hour}:${now.getMinutes()}`;

    if (!forceRender && minuteKey === lastRenderedMinute) return;
    lastRenderedMinute = minuteKey;

    // Logic "Ngày hiệu lực": trước 6h sáng thuộc kỳ trực ngày hôm trước
    const effectiveDate = new Date(now);
    if (hour < 6) effectiveDate.setDate(now.getDate() - 1);

    const dateStr = `${effectiveDate.getDate()}/${effectiveDate.getMonth() + 1}/${effectiveDate.getFullYear()}`;
    const nextDate = new Date(effectiveDate);
    nextDate.setDate(effectiveDate.getDate() + 1);
    const tomorrowStr = `${nextDate.getDate()}/${nextDate.getMonth() + 1}/${nextDate.getFullYear()}`;

    const scheduleKey = `${dateStr}|${tomorrowStr}|${hour >= 6 && hour < 18 ? 'C1' : 'C2'}`;
    if (!forceRender && scheduleKey === lastRenderedScheduleKey) return;
    lastRenderedScheduleKey = scheduleKey;

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
        if (el) {
            const html = names.map(memberHTML).join('');
            if (el.dataset.html !== html) {
                el.innerHTML = html;
                el.dataset.html = html;
            }
        }
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
    const timeText = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const clockEl = document.getElementById('clock');
    if (clockEl && clockEl.textContent !== timeText) {
        clockEl.textContent = timeText;
    }

    const dateEl = document.getElementById('date');
    if (dateEl) {
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const dateText = `${days[now.getDay()]}, ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
        if (dateEl.innerText !== dateText) dateEl.innerText = dateText;
    }

    updateScheduleDisplay(now);
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
    if (!('ontouchstart' in window)) {
        let idleTimeout;
        const idleTime = 3000; // 3 giây
        let lastIdleReset = 0;

        function resetIdleTimer() {
            const now = Date.now();
            if (now - lastIdleReset < 500) return;
            lastIdleReset = now;
            document.body.classList.remove('kiosk-active');
            clearTimeout(idleTimeout);
            idleTimeout = setTimeout(() => {
                document.body.classList.add('kiosk-active');
            }, idleTime);
        }

        window.addEventListener('mousemove', resetIdleTimer, { passive: true });
        window.addEventListener('mousedown', resetIdleTimer, { passive: true });
        window.addEventListener('keypress', resetIdleTimer, { passive: true });

        resetIdleTimer();
    }
}

// ============================================================
//  TẢI LẠI CẢ TRANG MỖI NGÀY LÚC 04:00 (để TV nhận code mới khi deploy)
// ============================================================
function msUntilDailyReload(now) {
    const hour = (typeof DAILY_RELOAD_HOUR === 'number') ? DAILY_RELOAD_HOUR : 4;
    const next = new Date(now);
    next.setHours(hour, 0, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    return next - now;
}

function scheduleDailyReload() {
    const delay = msUntilDailyReload(new Date());
    console.log(`[Reload] Tải lại cả trang sau ${Math.round(delay / 60000)} phút (04:00).`);
    setTimeout(() => { location.reload(); }, delay);
}

// ============================================================
//  ENTRY POINT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // NỘI QUY + CẤU HÌNH: hardcode trong js/content.js → hiện ngay, không chờ mạng
    if (typeof NOI_QUY_ROWS !== 'undefined') {
        renderPanels(NOI_QUY_ROWS);
    } else {
        console.error('[Nội quy] Không thấy js/content.js — kiểm tra thẻ <script> trong index.html.');
    }
    if (typeof APP_CONFIG !== 'undefined') applyConfig(APP_CONFIG);

    // Khởi động đồng hồ: chỉ cập nhật mỗi phút để giảm reflow trên TV yếu
    updateClock();
    setInterval(updateClock, 60 * 1000);

    // Vẽ lịch ngay từ bản lưu trong máy (hoặc dữ liệu dự phòng) rồi mới tải mạng
    updateScheduleDisplay(new Date(), true);

    // Load lịch trực: NAS (Sheets dự phòng) → bản lưu trong máy → fallback
    loadScheduleData();

    // Khởi tạo tính năng Kiosk Mode (Toàn màn hình)
    initKioskMode();

    // Nhãn nguồn nằm ngay trên footer
    positionSourceBadge();
    window.addEventListener('resize', positionSourceBadge);

    // Tải lại dữ liệu NGẦM mỗi 5 phút — không tải lại trang, chỉ vẽ lại phần lịch
    setInterval(loadScheduleData, (typeof REFRESH_MS === 'number') ? REFRESH_MS : 5 * 60 * 1000);

    // Tải lại cả trang 1 lần mỗi ngày lúc 04:00 sáng
    scheduleDailyReload();
});
