// --- Dữ liệu giả lập trích xuất từ bảng Excel tháng 4/2026 ---
const scheduleData = {
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
    "1/5/2026": { C1: ["Nguyễn Hoàng Tiến Lâm"], C2: ["Lê Trường Giang", "Khương Vũ Quang Thông"] },
    "2/5/2026": { C1: ["Nguyễn Ngọc Lâm"], C2: ["Nguyễn Minh Quang", "Đỗ Thành Công"] },
    "3/5/2026": { C1: ["Nguyễn Ngọc Lâm"], C2: ["Nguyễn Minh Quang", "Đỗ Thành Công"] },
    "4/5/2026": { C1: ["Tống Minh Đức"], C2: ["Nguyễn Hoàng Tiến Lâm", "Khương Vũ Quang Thông"] },
    "5/5/2026": { C1: ["Tống Minh Đức"], C2: ["Nguyễn Hoàng Tiến Lâm", "Khương Vũ Quang Thông"] },
    "6/5/2026": { C1: ["Lê Trường Giang"], C2: ["Nguyễn Ngọc Lâm", "Nguyễn Minh Quang"] },
    "7/5/2026": { C1: ["Lê Trường Giang"], C2: ["Nguyễn Ngọc Lâm", "Nguyễn Minh Quang"] },
    "8/5/2026": { C1: ["Đỗ Thành Công"], C2: ["Tống Minh Đức", "Nguyễn Hoàng Tiến Lâm"] },
    "9/5/2026": { C1: ["Đỗ Thành Công"], C2: ["Tống Minh Đức", "Nguyễn Hoàng Tiến Lâm"] },
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
    "31/5/2026": { C1: ["Nguyễn Ngọc Lâm"], C2: ["Nguyễn Minh Quang", "Đỗ Thành Công"] }
};

/**
 * Logic Hiển thị & Cập nhật Lịch Trực
 */
function updateScheduleDisplay(now) {
    const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    
    const scheduleDateStr = document.getElementById('scheduleDateStr');
    if (!scheduleDateStr) return;

    // Cập nhật thẻ hiển thị ngày của sidebar
    const paddedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    scheduleDateStr.innerText = `${days[now.getDay()]}, ${paddedDate}`;

    // Lấy dữ liệu phân ca
    const todaySchedule = scheduleData[dateStr] || { C1: ["(Trống)"], C2: ["(Trống)"] };

    // Render danh sách người trực C1
    const listC1 = document.getElementById('list-c1');
    if (listC1) {
        listC1.innerHTML = todaySchedule.C1.map(name => `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--evn-orange)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${name}</li>`).join('');
    }

    // Render danh sách người trực C2
    const listC2 = document.getElementById('list-c2');
    if (listC2) {
        listC2.innerHTML = todaySchedule.C2.map(name => `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--evn-orange)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ${name}</li>`).join('');
    }

    // Highlight Ca Đang Trực (C1: 06:00-18:00, C2: 18:00-06:00 hsau)
    const hour = now.getHours();
    const cardC1 = document.getElementById('card-c1');
    const cardC2 = document.getElementById('card-c2');

    if (cardC1 && cardC2) {
        if (hour >= 6 && hour < 18) {
            cardC1.classList.add('active');
            cardC2.classList.remove('active');
        } else {
            cardC2.classList.add('active');
            cardC1.classList.remove('active');
        }
    }
}

/**
 * Clock Update
 */
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.innerHTML = `${hours}<span class="blink-c">:</span>${minutes}`;
    }

    const dateEl = document.getElementById('date');
    if (dateEl) {
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        dateEl.innerText = `${days[now.getDay()]}, ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    }
    
    // Cập nhật lại lịch trực mỗi phút
    if (now.getSeconds() === 0 || !window.scheduleInitialized) {
        updateScheduleDisplay(now);
        window.scheduleInitialized = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(updateClock, 1000);
    updateClock();
});
