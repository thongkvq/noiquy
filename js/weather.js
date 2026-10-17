/**
 * ============================================================
 *  THỜI TIẾT TRÊN HEADER (ngay bên trái đồng hồ)
 * ============================================================
 *  Nguồn: Open-Meteo (không cần khoá). Cấu hình: WEATHER_CONFIG (js/config.js).
 *  - Tải lúc mở trang và mỗi 10 phút.
 *  - Lỗi mạng → giữ số liệu cũ (bản lưu localStorage), KHÔNG làm vỡ header.
 *  - Chỉ ghi lại DOM khi nội dung đổi (TV box yếu).
 * ============================================================
 */
const Weather = (function () {
    // Mã thời tiết WMO (Open-Meteo) → mô tả tiếng Việt
    const WMO = {
        0: ['Trời quang', 'sun'],
        1: ['Ít mây', 'cloudSun'],
        2: ['Nhiều mây', 'cloudSun'],
        3: ['U ám', 'cloud'],
        45: ['Sương mù', 'fog'],
        48: ['Sương mù đóng băng', 'fog'],
        51: ['Mưa phùn nhẹ', 'drizzle'],
        53: ['Mưa phùn', 'drizzle'],
        55: ['Mưa phùn dày', 'drizzle'],
        56: ['Mưa phùn đóng băng', 'drizzle'],
        57: ['Mưa phùn đóng băng dày', 'drizzle'],
        61: ['Mưa nhỏ', 'rain'],
        63: ['Mưa vừa', 'rain'],
        65: ['Mưa lớn', 'rain'],
        66: ['Mưa đóng băng', 'rain'],
        67: ['Mưa đóng băng lớn', 'rain'],
        71: ['Tuyết nhẹ', 'snow'],
        73: ['Tuyết vừa', 'snow'],
        75: ['Tuyết dày', 'snow'],
        77: ['Hạt tuyết', 'snow'],
        80: ['Mưa rào nhẹ', 'rain'],
        81: ['Mưa rào vừa', 'rain'],
        82: ['Mưa rào rất to', 'rain'],
        85: ['Mưa tuyết rào nhẹ', 'snow'],
        86: ['Mưa tuyết rào to', 'snow'],
        95: ['Dông', 'thunder'],
        96: ['Dông kèm mưa đá nhẹ', 'thunder'],
        99: ['Dông kèm mưa đá', 'thunder'],
    };

    // Icon SVG nhỏ (stroke, ăn theo màu nhóm) — không dùng ảnh/CDN
    const ICONS = {
        sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4"/>',
        cloudSun: '<circle cx="8.5" cy="8.5" r="2.6"/><path d="M8.5 2.6v1.6M2.6 8.5h1.6M3.9 3.9l1.1 1.1M13.1 3.9l-1.1 1.1"/><path d="M9 19.4h8.6a3.6 3.6 0 0 0 .3-7.2 5 5 0 0 0-9.5 1.3A3.1 3.1 0 0 0 9 19.4z"/>',
        cloud: '<path d="M6.6 18.6h11a3.9 3.9 0 0 0 .3-7.8 5.4 5.4 0 0 0-10.3 1.4A3.3 3.3 0 0 0 6.6 18.6z"/>',
        fog: '<path d="M6.6 14.6h11a3.6 3.6 0 0 0 .3-7.2 5 5 0 0 0-9.6 1.3A3.1 3.1 0 0 0 6.6 14.6z"/><path d="M4 17.6h16M6 20.4h12"/>',
        drizzle: '<path d="M6.6 15.4h11a3.6 3.6 0 0 0 .3-7.2 5 5 0 0 0-9.6 1.3A3.1 3.1 0 0 0 6.6 15.4z"/><path d="M8.5 18v1.6M12 18v1.6M15.5 18v1.6"/>',
        rain: '<path d="M6.6 14.8h11a3.6 3.6 0 0 0 .3-7.2 5 5 0 0 0-9.6 1.3A3.1 3.1 0 0 0 6.6 14.8z"/><path d="M8 17.2l-.9 3.2M12 17.2l-.9 3.2M16 17.2l-.9 3.2"/>',
        snow: '<path d="M6.6 14.4h11a3.6 3.6 0 0 0 .3-7.2 5 5 0 0 0-9.6 1.3A3.1 3.1 0 0 0 6.6 14.4z"/><path d="M9 18.6v.01M12 20.6v.01M15 18.6v.01"/>',
        thunder: '<path d="M6.6 14.4h11a3.6 3.6 0 0 0 .3-7.2 5 5 0 0 0-9.6 1.3A3.1 3.1 0 0 0 6.6 14.4z"/><path d="M13 16.4l-2.2 3.4h3l-2.2 3.4"/>',
    };

    const ICON_COLOR = {
        sun: '#fbbf24',
        cloudSun: '#fbbf24',
        cloud: '#b0d0ff',
        fog: '#9fb3c8',
        drizzle: '#60a5fa',
        rain: '#60a5fa',
        snow: '#bae6fd',
        thunder: '#a855f7',
    };

    let timer = null;
    let lastHTML = '';

    function key(code) {
        return WMO[code] ? WMO[code] : ['Không rõ', 'cloud'];
    }

    function iconHTML(name) {
        const body = ICONS[name] || ICONS.cloud;
        const color = ICON_COLOR[name] || '#b0d0ff';
        return '<svg viewBox="0 0 24 24" fill="none" stroke="' + color + '" stroke-width="1.8"'
            + ' stroke-linecap="round" stroke-linejoin="round">' + body + '</svg>';
    }

    function num(v, digits) {
        if (typeof v !== 'number' || !isFinite(v)) return null;
        return digits ? v.toFixed(digits).replace(/\.0+$/, '') : String(Math.round(v));
    }

    // Đọc payload Open-Meteo → object gọn để hiển thị / lưu máy
    function parse(payload) {
        if (!payload || !payload.current) return null;
        const c = payload.current;
        const info = key(c.weather_code);
        let popMax = null;
        const arr = payload.hourly && payload.hourly.precipitation_probability;
        if (Array.isArray(arr)) {
            arr.forEach(v => {
                if (typeof v === 'number' && (popMax === null || v > popMax)) popMax = v;
            });
        }
        return {
            desc: info[0],
            icon: info[1],
            temp: num(c.temperature_2m),
            feels: num(c.apparent_temperature),
            humidity: num(c.relative_humidity_2m),
            precip: num(c.precipitation, 1),
            wind: num(c.wind_speed_10m),
            pop: popMax === null ? null : Math.round(popMax),
        };
    }

    function readCache() {
        try {
            const raw = localStorage.getItem(WEATHER_CONFIG.STORAGE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!parsed || !parsed.data || !parsed.data.desc) return null;
            return parsed.data;
        } catch (err) {
            return null;
        }
    }

    function writeCache(data) {
        try {
            localStorage.setItem(WEATHER_CONFIG.STORAGE_KEY, JSON.stringify({ data: data, at: Date.now() }));
        } catch (err) {
            /* localStorage hỏng: bỏ qua, vẫn hiển thị bình thường */
        }
    }

    function render(data) {
        const box = document.getElementById('weatherWidget');
        if (!box || !data) return;

        const temp = data.temp === null ? '--°' : data.temp + '°';
        const feels = data.feels === null ? '' : 'cảm giác như ' + data.feels + '°';
        const parts = [WEATHER_CONFIG.TEN_KHU_VUC];
        if (data.humidity !== null) parts.push('Ẩm ' + data.humidity + '%');
        if (data.wind !== null) parts.push('Gió ' + data.wind + ' km/h');
        if (data.precip !== null && parseFloat(data.precip) > 0) parts.push('Mưa ' + data.precip + ' mm');
        if (data.pop !== null) parts.push('Mưa 3h tới ' + data.pop + '%');

        const html = '<span class="w-icon">' + iconHTML(data.icon) + '</span>'
            + '<div class="w-body"><div class="w-line1"><span class="w-temp">' + temp
            + '</span><span class="w-desc">' + data.desc
            + '</span><span class="w-feels">' + feels + '</span></div>'
            + '<div class="w-line2">' + parts.join(' · ') + '</div></div>';

        if (html === lastHTML) return;   // dữ liệu không đổi → không đụng vào DOM
        lastHTML = html;
        box.innerHTML = html;
        box.hidden = false;
    }

    async function load() {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), WEATHER_CONFIG.TIMEOUT_MS);
        try {
            const res = await fetch(WEATHER_CONFIG.URL, {
                cache: 'no-store',
                headers: { Accept: 'application/json' },
                signal: controller.signal,
            });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = parse(await res.json());
            if (!data) throw new Error('JSON thời tiết không hợp lệ');
            writeCache(data);
            render(data);
            console.log('[Thời tiết] Đã cập nhật: ' + data.desc + ' ' + data.temp + '°C');
        } catch (err) {
            // Lỗi mạng: giữ số liệu cũ (localStorage) — header không bị vỡ
            console.warn('[Thời tiết] Không tải được, giữ số liệu cũ:', (err && err.message) || err);
            render(readCache());
        } finally {
            clearTimeout(t);
        }
    }

    return {
        init: function () {
            if (typeof WEATHER_CONFIG === 'undefined') return;
            render(readCache());          // hiện ngay số liệu lần trước (nếu có)
            load();
            timer = setInterval(load, WEATHER_CONFIG.REFRESH_MS);
        },
        // Dùng cho kiểm tra thủ công
        reload: load,
        _stop: function () { if (timer) clearInterval(timer); },
    };
})();
