/**
 * ============================================================
 *  DỮ LIỆU + NỘI DUNG 3 MÀN MỚI
 *    (2) Lịch công tác các đơn vị   — /v2/public/lich-cong-tac  (cần khoá đọc)
 *    (3) Lịch trực tháng            — /v2/public/lich-truc      (không cần khoá)
 *    (4) Sự cố còn tồn              — /v2/public/su-co-ton      (cần khoá đọc)
 *
 *  KHOÁ ĐỌC: mở web kèm #key=<khoá> một lần → lưu localStorage
 *  (`noiquy.readKey`) → xoá hash khỏi thanh địa chỉ. Khoá chỉ đi trong
 *  header `X-Read-Key`, KHÔNG ghi vào source, KHÔNG ghi log, KHÔNG vào URL.
 *
 *  Lỗi tải: 401/503 hoặc thiếu khoá → màn hiện "Chưa cấu hình khoá đọc";
 *  lỗi khác (429, mạng...) → "Không tải được dữ liệu". Vẫn nằm trong vòng xoay.
 * ============================================================
 */
const Screens = (function () {
    const MSG = {
        loading: 'Đang tải dữ liệu...',
        nokey: 'Chưa cấu hình khoá đọc',
        error: 'Không tải được dữ liệu',
    };

    const state = {
        congtac: { status: 'loading', rows: [], sig: '', from: '', to: '' },
        suco: { status: 'loading', rows: [], total: 0, sig: '', at: 0 },
        thang: { status: 'loading', matrix: null, matrixFrom: '', sig: '', from: '', to: '' },
    };

    let readKey = '';
    let cachedReadKeyRead = false;

    // ---------- tiện ích ngày/giờ ----------
    function p2(n) { return String(n).padStart(2, '0'); }
    function isoDate(d) { return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()); }
    function addDays(d, n) { const x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
    function fmtHM(d) { return p2(d.getHours()) + ':' + p2(d.getMinutes()); }
    function fmtDM(d) { return p2(d.getDate()) + '/' + p2(d.getMonth() + 1); }
    function fmtDMY(d) { return p2(d.getDate()) + '/' + p2(d.getMonth() + 1) + '/' + d.getFullYear(); }
    function sameDay(a, b) {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }

    function parseIso(s) {
        if (!s) return null;
        const d = new Date(s);           // "2026-10-07T08:00:00" → giờ địa phương
        return isNaN(d.getTime()) ? null : d;
    }

    function parseVN(s) {
        if (!s) return null;
        const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/.exec(String(s).trim());
        if (!m) return null;
        return new Date(parseInt(m[3], 10), parseInt(m[2], 10) - 1, parseInt(m[1], 10),
            parseInt(m[4] || '0', 10), parseInt(m[5] || '0', 10));
    }

    // "08:00 17/10 → 18:00 19/10"
    function rangeText(start, end, rawStart, rawEnd) {
        if (!start && !end) return rawStart || rawEnd || '—';
        if (start && !end) return fmtHM(start) + ' ' + fmtDM(start) + ' → ' + (rawEnd || '?');
        if (!start) return '→ ' + fmtHM(end) + ' ' + fmtDM(end);
        return fmtHM(start) + ' ' + fmtDM(start) + ' → ' + fmtHM(end) + ' ' + fmtDM(end);
    }

    // "3 ngày 4 giờ" / "5 giờ 20 phút" / "12 phút"
    function durText(ms) {
        if (!isFinite(ms) || ms < 0) ms = 0;
        const mins = Math.floor(ms / 60000);
        if (mins < 60) return mins + ' phút';
        const hours = Math.floor(mins / 60);
        if (hours < 24) return hours + ' giờ' + (mins % 60 ? ' ' + (mins % 60) + ' phút' : '');
        const days = Math.floor(hours / 24);
        const h = hours % 24;
        return days + ' ngày' + (h ? ' ' + h + ' giờ' : '');
    }

    function esc(s) {
        return String(s === null || s === undefined ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function isBlank(v) {
        const s = String(v === null || v === undefined ? '' : v).trim();
        return !s || s === '—' || s === '-';
    }

    function orDash(v) { return isBlank(v) ? '—' : esc(v); }

    // ---------- khoá đọc ----------
    function initReadKey() {
        const store = API_CONFIG.READ_KEY_STORAGE;
        let fromHash = '';
        try {
            const m = /(?:^#|&)key=([^&]*)/.exec(String(location.hash || ''));
            if (m && m[1]) fromHash = decodeURIComponent(m[1]);
        } catch (e) { fromHash = ''; }

        if (fromHash) {
            try { localStorage.setItem(store, fromHash); } catch (e) { /* bỏ qua */ }
            try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* bỏ qua */ }
        }
        try {
            readKey = localStorage.getItem(store) || fromHash || '';
        } catch (e) {
            readKey = fromHash || '';
        }
        cachedReadKeyRead = true;
    }

    function hasReadKey() {
        if (!cachedReadKeyRead) initReadKey();
        return Boolean(readKey);
    }

    // Đọc khoá mới nhất (phòng khi người dùng nạp khoá trong lúc web đang chạy)
    function syncReadKey() {
        if (!hasReadKey()) initReadKey();
        return readKey;
    }

    // ---------- gọi API ----------
    async function fetchPublicJson(url, useKey) {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT_MS);
        const headers = { Accept: 'application/json' };
        // API hiện đọc công khai; khoá chỉ gửi nếu máy còn lưu (phòng khi bật lại khoá)
        if (useKey && syncReadKey()) headers[API_CONFIG.READ_KEY_HEADER] = syncReadKey();
        try {
            const res = await fetch(url, { cache: 'no-store', headers: headers, signal: controller.signal });
            if (!res.ok) {
                const err = new Error('HTTP ' + res.status);
                err.status = res.status;
                throw err;
            }
            return await res.json();
        } finally {
            clearTimeout(t);
        }
    }

    // 401 (sai/thiếu khoá) và 503 (server chưa cấu hình khoá) đều là lỗi cấu hình khoá
    function statusFromError(err) {
        const s = err && err.status;
        if (s === 401 || s === 403 || s === 503) return 'nokey';
        return 'error';
    }

    function rowsOf(payload) {
        return payload && Array.isArray(payload.rows) ? payload.rows : [];
    }

    // ---------- nạp dữ liệu ----------
    async function loadCongTac(now) {
        const from = isoDate(now);
        const to = isoDate(addDays(now, (API_CONFIG.CONG_TAC_DAYS || 7) - 1));
        const url = API_CONFIG.URL_LICH_CONG_TAC + '?from=' + from + '&to=' + to;
        try {
            const payload = await fetchPublicJson(url, true);
            const rows = rowsOf(payload);
            const sig = JSON.stringify(rows);
            if (sig !== state.congtac.sig) {
                state.congtac.sig = sig;
                state.congtac.rows = rows;
            }
            state.congtac.status = 'ok';
            state.congtac.from = payload && payload.from ? payload.from : from;
            state.congtac.to = payload && payload.to ? payload.to : to;
            console.log('[Lịch công tác] ' + rows.length + ' dòng (' + from + ' → ' + to + ').');
        } catch (err) {
            state.congtac.status = state.congtac.rows.length ? 'ok' : statusFromError(err);
            console.warn('[Lịch công tác] Không tải được:', (err && err.message) || err);
        }
    }

    async function loadSuCo() {
        try {
            const payload = await fetchPublicJson(API_CONFIG.URL_SU_CO_TON, true);
            const rows = rowsOf(payload);
            const sig = JSON.stringify(rows);
            if (sig !== state.suco.sig) {
                state.suco.sig = sig;
                state.suco.rows = rows;
            }
            state.suco.total = payload && typeof payload.total === 'number' ? payload.total : rows.length;
            state.suco.status = 'ok';
            state.suco.at = Date.now();
            console.log('[Sự cố tồn] ' + rows.length + ' mục.');
        } catch (err) {
            state.suco.status = state.suco.rows.length ? 'ok' : statusFromError(err);
            console.warn('[Sự cố tồn] Không tải được:', (err && err.message) || err);
        }
    }

    async function loadThangTruc(now) {
        const first = new Date(now.getFullYear(), now.getMonth(), 1);
        const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const from = isoDate(first);
        const to = isoDate(last);
        // Đổi tháng → dữ liệu tháng cũ không còn dùng được
        if (state.thang.from !== from) {
            state.thang.matrix = null;
            state.thang.matrixFrom = '';
            state.thang.sig = '';
        }
        try {
            const payload = await fetchPublicJson(NAS_CONFIG.URL_LICH_TRUC + '?from=' + from + '&to=' + to, false);
            const tenDayDu = NAS_CONFIG.TEN_DAY_DU || {};
            const rows = rowsOf(payload).map(row => Object.fromEntries(
                Object.entries(row).map(([k, v]) => [tenDayDu[k.normalize('NFC')] || k, v])
            ));
            const matrix = matrixFromRows(rows, payload && payload.columns,
                first.getFullYear(), first.getMonth());
            const sig = from + '|' + matrix.people.join('|') + '|' + JSON.stringify(matrix.byPerson);
            if (sig !== state.thang.sig) {
                state.thang.sig = sig;
                state.thang.matrix = matrix;
            }
            state.thang.status = 'ok';
            state.thang.from = from;
            state.thang.to = to;
            state.thang.matrixFrom = from;
            console.log('[Lịch trực tháng] ' + matrix.people.length + ' người, '
                + matrix.filled + ' lượt trực (' + from + ' → ' + to + ').');
        } catch (err) {
            // Lỗi → dùng lịch trực đang có (scheduleData của js/app.js)
            state.thang.status = 'fallback';
            state.thang.matrixFrom = '';
            console.warn('[Lịch trực tháng] Không tải được, dùng lịch đang có:', (err && err.message) || err);
        }
    }

    async function refresh() {
        const now = new Date();
        await Promise.all([loadCongTac(now), loadSuCo(), loadThangTruc(now)]);
        if (typeof Tabs !== 'undefined' && Tabs.onDataChanged) Tabs.onDataChanged();
    }

    // ============================================================
    //  MÀN 2 — LỊCH CÔNG TÁC CÁC ĐƠN VỊ
    // ============================================================
    function congTacRow(row, now) {
        const start = parseIso(row.bat_dau_iso) || parseVN(row.bat_dau);
        const end = parseIso(row.ket_thuc_iso) || parseVN(row.ket_thuc);
        const ongoing = Boolean(start && end && now >= start && now <= end);
        const today = Boolean(start && sameDay(start, now));
        const cls = ongoing ? ' is-now' : (today ? ' is-today' : '');
        const chip = ongoing
            ? '<span class="ct-chip is-now">ĐANG DIỄN RA</span>'
            : (today ? '<span class="ct-chip is-today">HÔM NAY</span>' : '');
        // Cột chính là "Vị trí / phạm vi ảnh hưởng": rộng nhất, chữ lớn hơn,
        // hiện đủ chữ (xuống tối đa 2 dòng rồi mới cắt "…" — xem .ct-row > .ct-zone).
        return '<div class="ct-row' + cls + '">'
            + '<div class="ct-flag">' + chip + '</div>'
            + '<div class="ct-time">' + esc(rangeText(start, end, row.bat_dau, row.ket_thuc)) + '</div>'
            + '<div class="ct-zone">' + orDash(row.tram_anh_huong) + '</div>'
            + '<div class="ct-unit">' + orDash(row.don_vi) + '</div>'
            + '<div class="ct-cv">' + orDash(row.so_cv) + '</div>'
            + '</div>';
    }

    // ============================================================
    //  MÀN 4 — SỰ CỐ CÒN TỒN
    // ============================================================
    const MUC_DO = [
        { ten: 'Nghiêm trọng', cls: 'red' },
        { ten: 'Nặng', cls: 'purple' },
        { ten: 'Có kế hoạch', cls: 'green' },
        { ten: 'Nhẹ', cls: 'gray' },
    ];

    function mucCls(muc) {
        const s = String(muc || '').toLowerCase();
        if (s.indexOf('nghiêm trọng') >= 0) return 'red';
        if (s.indexOf('nặng') >= 0) return 'purple';
        if (s.indexOf('kế hoạch') >= 0) return 'green';
        return 'gray';
    }

    function suCoCard(row, now) {
        const muc = String(row.muc_do || '').trim() || '—';
        const cls = mucCls(muc);
        const start = parseIso(row.tg_bat_dau_iso) || parseVN(row.tg_bat_dau);
        const ton = start ? 'đã tồn ' + durText(now - start) : '';
        const dichVu = String(row.dich_vu || '').trim().toUpperCase();
        const meta = [];
        if (!isBlank(row.pham_vi)) meta.push('<span class="sc-k">Phạm vi</span> ' + esc(row.pham_vi));
        if (!isBlank(row.dia_ban)) meta.push('<span class="sc-k">Địa bàn</span> ' + esc(row.dia_ban));
        if (!isBlank(row.don_vi)) meta.push('<span class="sc-k">Đơn vị</span> ' + esc(row.don_vi));
        if (!isBlank(row.sl_tba)) meta.push('<span class="sc-k">TBA</span> ' + esc(row.sl_tba));
        if (!isBlank(row.mat_dich_vu)) meta.push('<span class="sc-k">Mất DV</span> ' + esc(row.mat_dich_vu));

        const nn = isBlank(row.nguyen_nhan) ? '' : '<span class="sc-k">NN</span> ' + esc(row.nguyen_nhan);
        const xl = isBlank(row.cach_xu_ly) ? '' : '<span class="sc-k">XL</span> ' + esc(row.cach_xu_ly);

        return '<div class="sc-card sc-' + cls + '">'
            + '<div class="sc-top">'
            + '<span class="sc-badge">' + esc(muc.toUpperCase()) + '</span>'
            + '<span class="sc-name" title="' + esc(row.su_co) + '">' + orDash(row.su_co) + '</span>'
            + (dichVu ? '<span class="sc-svc">' + esc(dichVu) + '</span>' : '')
            + '</div>'
            + '<div class="sc-line">' + (meta.length ? meta.join(' <span class="sc-sep">·</span> ') : '—') + '</div>'
            + '<div class="sc-line"><span class="sc-k">Bắt đầu</span> '
            + (start ? fmtHM(start) + ' ' + fmtDMY(start) : orDash(row.tg_bat_dau))
            + (ton ? ' <span class="sc-ton">' + ton + '</span>' : '') + '</div>'
            + '<div class="sc-line sc-dim">' + (nn || xl ? (nn + (nn && xl ? ' <span class="sc-sep">·</span> ' : '') + xl) : '—') + '</div>'
            + '</div>';
    }

    function suCoHead() {
        const counts = {};
        MUC_DO.forEach(m => { counts[m.ten] = 0; });
        state.suco.rows.forEach(r => {
            const cls = mucCls(r.muc_do);
            const hit = MUC_DO.filter(m => m.cls === cls)[0];
            if (hit) counts[hit.ten] += 1;
        });
        const chips = MUC_DO.map(m => counts[m.ten]
            ? '<span class="sc-chip sc-' + m.cls + '">' + m.ten + ' ' + counts[m.ten] + '</span>' : '').join('');
        const upd = state.suco.at ? 'Cập nhật ' + fmtHM(new Date(state.suco.at)) : '';
        return '<div class="sc-sum">'
            + '<span class="sc-total">Còn tồn <b>' + state.suco.total + '</b></span>'
            + chips + '<span class="sc-upd">' + upd + '</span></div>';
    }

    // ============================================================
    //  MÀN 3 — LỊCH TRỰC THÁNG (bảng ma trận: hàng = người, cột = ngày)
    //  matrix = { people: [tên đầy đủ...], byPerson: [{ <ngày>: {c1,c2} }...], filled }
    //  byPerson[i][d] = { c1: true/false, c2: true/false }
    // ============================================================
    const DOW = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

    function isDayKey(k) {
        return /^(ng[àa]y|th[ứu])$/i.test(String(k).trim().normalize('NFC'));
    }

    function dayNumOf(raw, y, m) {
        const d = parseVN(raw);
        if (!d || d.getFullYear() !== y || d.getMonth() !== m) return 0;
        return d.getDate();
    }

    // "C1" | "C2" | "C1;C2" → { c1, c2 }
    function shiftFlags(v) {
        const s = String(v === null || v === undefined ? '' : v).toUpperCase();
        return { c1: s.indexOf('C1') >= 0, c2: s.indexOf('C2') >= 0 };
    }

    function emptyMatrix(people) {
        return { people: people, byPerson: people.map(() => ({})), filled: 0 };
    }

    // rows của NAS (đã đổi sang tên đầy đủ) + columns → ma trận
    function matrixFromRows(rows, columns, y, m) {
        const cfg = NAS_CONFIG.TEN_DAY_DU || {};
        const full = v => cfg[String(v).trim().normalize('NFC')] || String(v).trim();

        const added = [];
        const add = n => { if (n && !isDayKey(n) && added.indexOf(n) < 0) added.push(n); };
        (Array.isArray(columns) ? columns : []).forEach(c => add(full(c)));
        Object.keys(cfg).forEach(k => add(cfg[k]));          // luôn đủ 7 người, đúng thứ tự
        rows.forEach(row => Object.keys(row).forEach(k => add(String(k).trim())));

        const matrix = emptyMatrix(added);
        rows.forEach(row => {
            const day = dayNumOf(row['Ngày'] || row['Ngay'] || row['ngay'], y, m);
            if (!day) return;
            matrix.people.forEach((name, i) => {
                const raw = row[name];
                if (isBlank(raw)) return;
                const f = shiftFlags(raw);
                if (!f.c1 && !f.c2) return;
                const cell = matrix.byPerson[i][day] || { c1: false, c2: false };
                cell.c1 = cell.c1 || f.c1;
                cell.c2 = cell.c2 || f.c2;
                matrix.byPerson[i][day] = cell;
                matrix.filled += 1;
            });
        });
        return matrix;
    }

    // scheduleData (ngày → { C1: [tên], C2: [tên] }) → đảo ngược ra ma trận
    function matrixFromSchedule(data, y, m) {
        if (!data) return null;
        const cfg = NAS_CONFIG.TEN_DAY_DU || {};
        const people = [];
        const add = n => { if (n && people.indexOf(n) < 0) people.push(n); };
        Object.keys(cfg).forEach(k => add(cfg[k]));

        const days = [];
        Object.keys(data).forEach(k => {
            const d = dayNumOf(k, y, m);
            if (d) days.push({ day: d, v: data[k] || {} });
        });
        days.forEach(({ v }) => {
            ['C1', 'C2'].forEach(code => {
                (Array.isArray(v[code]) ? v[code] : []).forEach(n => {
                    const name = String(n).trim();
                    if (name && name !== '(Trống)') add(name);
                });
            });
        });

        const matrix = emptyMatrix(people);
        days.forEach(({ day, v }) => {
            ['C1', 'C2'].forEach(code => {
                (Array.isArray(v[code]) ? v[code] : []).forEach(n => {
                    const name = String(n).trim();
                    const i = name === '(Trống)' ? -1 : people.indexOf(name);
                    if (i < 0) return;
                    const cell = matrix.byPerson[i][day] || { c1: false, c2: false };
                    if (code === 'C1') cell.c1 = true; else cell.c2 = true;
                    matrix.byPerson[i][day] = cell;
                    matrix.filled += 1;
                });
            });
        });
        return matrix;
    }

    // Ô ca trực: tô kín ô bằng màu (không còn chip nhỏ).
    //   1 ca  → 1 khối phủ kín ô
    //   2 ca  → chia đôi ô trên/dưới (nửa trên C1, nửa dưới C2)
    function cellHTML(cell) {
        if (!cell) return '';
        if (cell.c1 && cell.c2) {
            return '<span class="tm-sh c1">C1</span><span class="tm-sh c2">C2</span>';
        }
        if (cell.c1) return '<span class="tm-sh c1">C1</span>';
        if (cell.c2) return '<span class="tm-sh c2">C2</span>';
        return '';
    }

    function matrixHTML(now, matrix) {
        const y = now.getFullYear();
        const m = now.getMonth();
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        const today = now.getDate();
        const dowOf = {};
        for (let d = 1; d <= daysInMonth; d++) dowOf[d] = DOW[(new Date(y, m, d).getDay() + 6) % 7];

        // Đặt vị trí TƯỜNG MINH cho mọi ô: overlay viền cột hôm nay là một grid item,
        // nếu để auto-placement thì nó chiếm chỗ và đẩy lệch cả bảng.
        const at = (col, row) => ' style="grid-column:' + col + ';grid-row:' + row + '"';

        let html = '<div class="tm-corner"' + at(1, 1) + '>Nhân sự</div>';
        for (let d = 1; d <= daysInMonth; d++) {
            const cls = ['tm-hd'];
            if (d === today) cls.push('is-today');
            else if (d < today) cls.push('is-past');
            if (dowOf[d] === 'T7' || dowOf[d] === 'CN') cls.push('is-weekend');
            html += '<div class="' + cls.join(' ') + '"' + at(d + 1, 1) + '>'
                + '<span class="tm-dow">' + dowOf[d] + '</span>'
                + '<span class="tm-day">' + d + '</span></div>';
        }

        matrix.people.forEach((name, i) => {
            const row = i + 2;
            html += '<div class="tm-name" title="' + esc(name) + '"' + at(1, row) + '>' + esc(name) + '</div>';
            for (let d = 1; d <= daysInMonth; d++) {
                const cell = matrix.byPerson[i][d];
                const cls = ['tm-cell'];
                if (cell && cell.c1 && cell.c2) cls.push('is-both');
                if (d === today) cls.push('is-today');
                else if (d < today) cls.push('is-past');
                if (dowOf[d] === 'T7' || dowOf[d] === 'CN') cls.push('is-weekend');
                html += '<div class="' + cls.join(' ') + '"' + at(d + 1, row) + '>' + cellHTML(cell) + '</div>';
            }
        });

        // Viền cam 3px bao TRỌN cột hôm nay (một overlay phủ cả cột, không thêm DOM cho từng ô)
        if (today >= 1 && today <= daysInMonth) {
            html += '<div class="tm-today-col"' + at(today + 1, '1/-1') + '></div>';
        }

        // Cột tên dùng max-content: tên dài nhất không bao giờ bị cắt
        const style = 'grid-template-columns:max-content repeat(' + daysInMonth + ',minmax(0,1fr));'
            + 'grid-template-rows:44px repeat(' + matrix.people.length + ',minmax(0,1fr))';
        return '<div class="tm-grid" style="' + style + '">' + html + '</div>';
    }

    function monthPageHTML(now, matrix, isFallback) {
        return '<div class="cal-head-bar">LỊCH TRỰC THÁNG ' + p2(now.getMonth() + 1) + '/' + now.getFullYear()
            + (isFallback ? '<span class="cal-note">dùng lịch trực đang có</span>' : '')
            + '</div>'
            + matrixHTML(now, matrix)
            + '<div class="tm-foot"><div class="tm-legend">'
            + '<span class="tm-sh c1">C1</span> Ca ngày 06:00–18:00'
            + '<span class="tm-sep">·</span>'
            + '<span class="tm-sh c2">C2</span> Ca đêm 18:00–06:00'
            + '</div></div>';
    }

    // ============================================================
    //  KHAI BÁO CÁC MÀN CHO VÒNG XOAY (js/tabs.js)
    //  - status: ok | empty | nokey | error | loading
    //  - items : danh sách dòng để chia trang (tabs lo phần chia trang)
    //  - manual: true → KHÔNG tự xoay, chỉ mở khi bấm tab (Lịch trực tháng)
    // ============================================================
    const SCREEN_DEFS = [
        {
            id: 'noiquy',
            label: 'NỘI QUY',
            duration: ROTATION.NOI_QUY_MS,
            isStatic: true,
            sig: function () { return 'static'; },
        },
        {
            id: 'congtac',
            label: 'LỊCH CÔNG TÁC',
            duration: ROTATION.CONG_TAC_MS,
            rowHeight: 68,
            headHeight: 44,
            noteHeight: 30,
            minRows: 3,
            emptyText: 'Không có lịch công tác trong 7 ngày tới',
            sig: function () { return state.congtac.sig || state.congtac.status; },
            get: function () {
                const st = state.congtac;
                if (st.status !== 'ok') return { status: st.status, message: MSG[st.status] };
                if (!st.rows.length) return { status: 'empty' };
                return { status: 'ok', items: st.rows };
            },
            headHTML: function () {
                return '<div class="ct-row ct-head">'
                    + '<div>Trạng thái</div><div>Thời gian</div>'
                    + '<div>Vị trí / Phạm vi ảnh hưởng</div>'
                    + '<div>Đơn vị</div><div>Số CV</div>'
                    + '</div>';
            },
            itemHTML: function (row, i, ctx) { return congTacRow(row, ctx.now); },
        },
        {
            id: 'thang',
            label: 'LỊCH TRỰC THÁNG',
            duration: ROTATION.LICH_TRUC_MS,
            single: true,
            // KHÔNG nằm trong vòng xoay tự động: chỉ mở khi bấm chuột vào tab
            // (hoặc phím ↓ / phím số). Mở ra thì vòng xoay tạm dừng —
            // xem ROTATION.MANUAL_HOLD_MS trong js/config.js.
            manual: true,
            sig: function () { return state.thang.sig || state.thang.status; },
            page: function (now) {
                const firstIso = isoDate(new Date(now.getFullYear(), now.getMonth(), 1));
                const usingNas = Boolean(state.thang.matrix) && state.thang.matrixFrom === firstIso;
                const matrix = usingNas
                    ? state.thang.matrix
                    : matrixFromSchedule(typeof scheduleData !== 'undefined' ? scheduleData : null,
                        now.getFullYear(), now.getMonth());
                if (!matrix || !matrix.people.length || !matrix.filled) {
                    return { status: 'error', message: MSG.error };
                }
                return { status: 'ok', html: monthPageHTML(now, matrix, !usingNas) };
            },
        },
        {
            id: 'suco',
            label: 'SỰ CỐ CÒN TỒN',
            duration: ROTATION.SU_CO_MS,
            // Thẻ sự cố cao 116px + 2px margin (chữ trong thẻ đã +2px)
            rowHeight: 118,
            headHeight: 48,
            noteHeight: 30,
            minRows: 2,
            emptyText: 'Không có sự cố còn tồn ✓',
            sig: function () { return state.suco.sig || state.suco.status; },
            get: function () {
                const st = state.suco;
                if (st.status !== 'ok') return { status: st.status, message: MSG[st.status] };
                if (!st.rows.length) return { status: 'empty' };
                return { status: 'ok', items: st.rows };
            },
            headHTML: suCoHead,
            itemHTML: function (row, i, ctx) { return suCoCard(row, ctx.now); },
        },
    ];

    function init() {
        initReadKey();
        refresh();
    }

    return {
        init: init,
        refresh: refresh,
        hasReadKey: hasReadKey,
        initReadKey: initReadKey,
        SCREEN_DEFS: SCREEN_DEFS,
        state: state,
        MSG: MSG,
        // dùng khi kiểm tra chạy tay
        reload: refresh,
    };
})();
