/**
 * ============================================================
 *  VÒNG XOAY MÀN HÌNH (4 tab tự chuyển)
 * ============================================================
 *  Màn 1 "Nội quy"  : DOM tĩnh (4 khung nội quy) — không vẽ lại.
 *  Màn 2/3/4        : vẽ vào 2 lớp luân phiên, cross-fade bằng opacity
 *                     (không blur, không box-shadow động).
 *
 *  Chia trang: mỗi trang tối thiểu MIN_PAGE_MS, tối đa MAX_PAGE_MS;
 *  nhiều trang thì màn được kéo dài cho đủ; quá MAX_PAGES trang thì cắt
 *  bớt và ghi "+N mục".
 *
 *  Phím remote: ← / → chuyển màn, Enter = màn kế tiếp.
 * ============================================================
 */
const Tabs = (function () {
    const screens = (typeof Screens !== 'undefined') ? Screens.SCREEN_DEFS : [];

    let idx = 0;
    let pageIdx = 0;
    let plan = null;
    let timer = null;
    let started = false;

    let staticEl = null;
    let dynA = null;
    let dynB = null;
    let activeEl = null;

    function cfg() {
        return (typeof ROTATION !== 'undefined') ? ROTATION : {};
    }

    function fadeMs() {
        const v = cfg().FADE_MS;
        return typeof v === 'number' ? v : 400;
    }

    function hostEl() { return document.getElementById('screenHost'); }

    // ------------------------------------------------------------
    //  Dải tab + thanh tiến trình
    // ------------------------------------------------------------
    function buildTabStrip() {
        const list = document.getElementById('tabList');
        if (!list) return;
        list.innerHTML = screens.map(function (s, i) {
            return '<button type="button" class="tab" data-i="' + i + '">' + s.label + '</button>';
        }).join('');
        list.onclick = function (e) {
            const btn = e.target && e.target.closest ? e.target.closest('.tab') : null;
            if (!btn) return;
            goScreen(parseInt(btn.dataset.i, 10));
        };
    }

    function updateStrip() {
        const tabs = document.querySelectorAll('#tabList .tab');
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.toggle('is-active', i === idx);
        }
        const pg = document.getElementById('tabPage');
        if (!pg) return;
        const screen = screens[idx] || {};
        const total = (plan && plan.pages) ? plan.pages.length : 0;
        if (screen.isStatic || total <= 0) {
            pg.hidden = true;
        } else {
            pg.hidden = false;
            pg.textContent = 'Trang ' + (pageIdx + 1) + '/' + total;
        }
    }

    // ------------------------------------------------------------
    //  Dựng kế hoạch hiển thị (số dòng mỗi trang, thời lượng mỗi trang)
    // ------------------------------------------------------------
    function bodyHeight(screen) {
        const host = hostEl();
        const h = host ? host.clientHeight : 800;
        return Math.max(160, h - (screen.headHeight || 0));
    }

    function buildPlan(screen, now) {
        const c = cfg();
        const duration = (typeof screen.duration === 'number') ? screen.duration : 30000;
        const sig = screen.sig ? screen.sig() : '';

        if (screen.isStatic) {
            return { status: 'ok', pages: [], pageMs: duration, sig: sig, omitted: 0 };
        }

        if (screen.single) {
            const res = screen.page(now);
            if (res.status !== 'ok') {
                return { status: res.status, message: res.message, pages: [], pageMs: duration, sig: sig, omitted: 0 };
            }
            return { status: 'ok', pages: [res.html], pageMs: duration, sig: sig, omitted: 0 };
        }

        const res = screen.get(now);
        if (res.status !== 'ok') {
            return { status: res.status, message: res.message, pages: [], pageMs: duration, sig: sig, omitted: 0 };
        }

        const rowH = screen.rowHeight || 52;
        const minRows = screen.minRows || 2;
        const maxPages = Math.max(1, c.MAX_PAGES || 3);
        const bh = bodyHeight(screen);

        let rpp = Math.max(minRows, Math.floor(bh / rowH));
        let omitted = 0;
        if (res.items.length > rpp * maxPages) {
            // Có ghi chú "+N mục" ở cuối màn → chừa chỗ cho nó
            rpp = Math.max(minRows, Math.floor((bh - (screen.noteHeight || 30)) / rowH));
            omitted = res.items.length - rpp * maxPages;
        }
        const items = omitted > 0 ? res.items.slice(0, rpp * maxPages) : res.items;

        const pages = [];
        for (let i = 0; i < items.length; i += rpp) pages.push(items.slice(i, i + rpp));
        if (!pages.length) pages.push([]);

        const n = pages.length;
        const minMs = c.MIN_PAGE_MS || 10000;
        const maxMs = c.MAX_PAGE_MS || 30000;
        const pageMs = Math.min(maxMs, Math.max(minMs, Math.round(duration / n)));

        return { status: 'ok', pages: pages, pageMs: pageMs, sig: sig, omitted: omitted, rpp: rpp };
    }

    // ------------------------------------------------------------
    //  Vẽ
    // ------------------------------------------------------------
    function msgHTML(screen, message, kind) {
        const text = message || ((screen && screen.emptyText) ? screen.emptyText : '');
        const cls = kind === 'empty' ? 'is-empty' : (kind === 'nokey' ? 'is-nokey' : 'is-error');
        return '<div class="screen-msg ' + cls + '">' + text + '</div>';
    }

    function pageHTML(screen, items, omitted) {
        const now = new Date();
        const ctx = { now: now, page: pageIdx + 1, pages: plan.pages.length };
        const rows = items.map(function (it, i) { return screen.itemHTML(it, i, ctx); }).join('');
        const note = omitted > 0 ? '<div class="rows-note">+' + omitted + ' mục</div>' : '';
        return (screen.headHTML ? screen.headHTML() : '') + '<div class="rows">' + rows + '</div>' + note;
    }

    function contentHTML(screen) {
        if (screen.isStatic) return '';
        if (!plan || plan.status !== 'ok') {
            return msgHTML(screen, plan ? plan.message : '', plan ? plan.status : 'error');
        }
        if (screen.single) return '<div class="screen-body">' + plan.pages[pageIdx] + '</div>';
        return '<div class="screen-body">' + pageHTML(screen, plan.pages[pageIdx] || [], plan.omitted) + '</div>';
    }

    function layerKey(screen) {
        return screen.id + '|' + (plan ? plan.status + ':' + plan.pages.length + ':' + plan.sig : '') + '|p' + pageIdx;
    }

    function activate(el) {
        [staticEl, dynA, dynB].forEach(function (l) {
            if (l) l.classList.toggle('is-active', l === el);
        });
        activeEl = el;
    }

    // fade = true: đổi màn (cross-fade 400ms, vẽ vào lớp đang ẩn)
    // fade = false: đổi trang trong cùng màn (thay nội dung lớp đang hiện)
    function present(fade) {
        const screen = screens[idx];
        if (!screen) return;

        if (screen.isStatic) {
            activate(staticEl);
            updateStrip();
            return;
        }

        const html = contentHTML(screen);
        const key = layerKey(screen);

        if (!fade && activeEl && activeEl !== staticEl && activeEl.dataset.screenId === screen.id) {
            activeEl.innerHTML = html;
            activeEl.dataset.key = key;
            updateStrip();
            return;
        }

        const target = (activeEl === dynA) ? dynB : dynA;
        if (target.dataset.key !== key) {
            target.innerHTML = html;
            target.dataset.key = key;
        }
        target.dataset.screenId = screen.id;
        activate(target);
        updateStrip();
    }

    // ------------------------------------------------------------
    //  Nhịp xoay
    // ------------------------------------------------------------
    function startProgressBar(ms) {
        const bar = document.getElementById('tabProgress');
        if (!bar) return;
        bar.style.transition = 'none';
        bar.style.transform = 'scaleX(0)';
        void bar.offsetWidth;                      // ép áp lại transform gốc
        bar.style.transition = 'transform ' + ms + 'ms linear';
        bar.style.transform = 'scaleX(1)';
    }

    function stopTimer() {
        if (timer) { clearTimeout(timer); timer = null; }
    }

    function startTimer(ms) {
        stopTimer();
        if (cfg().ENABLED === false) return;
        startProgressBar(ms);
        timer = setTimeout(advance, ms);
    }

    function advance() {
        const screen = screens[idx];
        const total = (plan && plan.pages) ? plan.pages.length : 0;
        if (total > 1 && pageIdx + 1 < total) {
            pageIdx += 1;
            present(false);
            startTimer(plan.pageMs);
            return;
        }
        goScreen((idx + 1) % screens.length);
    }

    function goScreen(i) {
        if (!screens.length) return;
        idx = ((i % screens.length) + screens.length) % screens.length;
        pageIdx = 0;
        const screen = screens[idx];
        plan = buildPlan(screen, new Date());
        present(true);
        startTimer(plan.pageMs);
        // Nhắc lại thời lượng thật của màn (có thể dài hơn cấu hình do chia trang)
        if (plan.status === 'ok' && plan.pages.length > 1) {
            console.log('[Vòng xoay] ' + screen.label + ': ' + plan.pages.length + ' trang × '
                + Math.round(plan.pageMs / 1000) + 's');
        }
    }

    // Khi dữ liệu nền vừa đổi: dựng lại kế hoạch nhưng KHÔNG reset nhịp đếm
    function onDataChanged() {
        if (!started) return;
        const screen = screens[idx];
        if (!screen || screen.isStatic) return;
        const sig = screen.sig ? screen.sig() : '';
        if (plan && plan.sig === sig) return;      // dữ liệu không đổi → không vẽ lại
        plan = buildPlan(screen, new Date());
        if (pageIdx >= Math.max(1, plan.pages.length)) pageIdx = 0;
        present(false);
    }

    function onResize() {
        if (!started) return;
        const screen = screens[idx];
        if (!screen || screen.isStatic) return;
        plan = buildPlan(screen, new Date());
        if (pageIdx >= Math.max(1, plan.pages.length)) pageIdx = 0;
        present(false);
    }

    function onKey(e) {
        if (!screens.length) return;
        const k = e.key;
        if (k === 'ArrowRight' || k === 'Enter') {
            goScreen(idx + 1);
        } else if (k === 'ArrowLeft') {
            goScreen(idx - 1);
        } else {
            return;
        }
        e.preventDefault();
    }

    // ------------------------------------------------------------
    //  Khởi động
    // ------------------------------------------------------------
    function init() {
        if (!screens.length) return;
        staticEl = document.getElementById('screenStatic');
        dynA = document.getElementById('screenDynA');
        dynB = document.getElementById('screenDynB');
        if (!staticEl || !dynA || !dynB) {
            console.error('[Vòng xoay] Thiếu lớp màn hình trong index.html');
            return;
        }
        // Thời gian fade lấy từ config (dùng chung cho cả 3 lớp)
        [staticEl, dynA, dynB].forEach(function (l) {
            l.style.transition = 'opacity ' + fadeMs() + 'ms linear';
        });
        activeEl = staticEl;
        buildTabStrip();
        started = true;
        goScreen(0);
        window.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize);
    }

    return {
        init: init,
        goScreen: goScreen,
        next: function () { goScreen(idx + 1); },
        prev: function () { goScreen(idx - 1); },
        restart: function () { goScreen(idx); },
        onDataChanged: onDataChanged,
        // Đổi thời lượng 1 màn lúc đang chạy (dùng cho cấu hình/kiểm tra)
        setDuration: function (id, ms) {
            const s = screens.filter(function (x) { return x.id === id; })[0];
            if (s) s.duration = ms;
        },
        current: function () { return screens[idx] ? screens[idx].id : ''; },
        _screens: screens,
    };
})();
