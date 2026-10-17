/**
 * ============================================================
 *  NỘI QUY + CẤU HÌNH CỐ ĐỊNH (hardcode trong source)
 * ============================================================
 *
 *  >>> MUỐN SỬA NỘI QUY THÌ SỬA Ở ĐÂY <<<
 *
 *  Nội dung dưới đây chép nguyên văn từ Google Sheets (sheet NoiQuy và
 *  CauHinh) ngày 2026-10-17. Web KHÔNG tải hai sheet này nữa: nội quy và
 *  dòng chữ chạy hiện ra ngay khi mở trang, không cần mạng.
 *
 *  Định dạng đánh dấu trong noi_dung (js/app.js — parseMarkup):
 *    [R]...[/R] = chữ đỏ, [O]...[/O] = chữ cam, [W]...[/W] = chữ trắng đậm.
 *
 *  Thêm dòng: thêm object { panel: '1'|'2'|'3'|'4', tieu_de, noi_dung }.
 *  tieu_de chỉ cần ghi ở dòng đầu của mỗi panel, các dòng sau để trống.
 * ============================================================
 */

// Nội quy trực ca — 4 panel (panel 1..4)
const NOI_QUY_ROWS = [
    { panel: "1", tieu_de: "1. Quy định thời gian & bàn giao", noi_dung: "Có mặt trước giờ giao nhận ca ít nhất [O]15 phút[/O] để nắm bắt tình hình hệ thống và các sự cố từ ca trước." },
    { panel: "1", tieu_de: "", noi_dung: "[W]Thủ tục bàn giao:[/W] Ghi chép đầy đủ vào sổ nhật ký (Tình trạng mạng IT/OT, sự cố đang xử lý, kế hoạch công tác)." },
    { panel: "1", tieu_de: "", noi_dung: "Tuân thủ lịch trực theo ca kíp dưới sự phân công của Quản lý phòng." },
    { panel: "1", tieu_de: "", noi_dung: "Dọn dẹp vệ sinh nơi làm việc trước khi bàn giao ca." },
    { panel: "2", tieu_de: "2. Kỷ luật & tác phong làm việc", noi_dung: "[R]Không được tự ý rời bỏ vị trí trực[/R] khi chưa có người thay thế. (Bất khả kháng phải báo cáo ngay cho Quản lý phòng)." },
    { panel: "2", tieu_de: "", noi_dung: "Không được làm việc riêng trong ca trực." },
    { panel: "2", tieu_de: "", noi_dung: "[R]Nghiêm cấm[/R] uống rượu, bia hoặc tổ chức liên hoan tại nơi làm việc trong thời gian trực." },
    { panel: "2", tieu_de: "", noi_dung: "[W]Trật tự vệ sinh:[/W] Giữ gìn vệ sinh khu vực trực, sắp xếp đồ dùng cá nhân đúng nơi quy định." },
    { panel: "3", tieu_de: "3. Trách nhiệm chuyên môn", noi_dung: "[W]Giám sát:[/W] Hệ thống mạng truyền dẫn SCADA, tín hiệu, kênh truyền các TBA và mạng Điều hành sản xuất." },
    { panel: "3", tieu_de: "", noi_dung: "[W]Xử lý sự cố:[/W] Báo cáo kịp thời cấp có thẩm quyền. Nguyên tắc: [O]Nhanh chóng, chính xác, đúng quy trình.[/O]" },
    { panel: "3", tieu_de: "", noi_dung: "Khách vào khu vực làm việc [R]phải có sự phê duyệt của Lãnh đạo[/R] và đảm bảo an toàn." },
    { panel: "3", tieu_de: "", noi_dung: "Tất cả khách phải đăng ký thông tin vào [O]Sổ nhật ký ra vào[/O] phòng trực ĐHCS." },
    { panel: "4", tieu_de: "4. Trang thiết bị & an toàn", noi_dung: "[W]Bảo quản tài sản:[/W] Có trách nhiệm bảo quản vật tư, thiết bị điều hành và hồ sơ lưu trữ tại cơ sở." },
    { panel: "4", tieu_de: "", noi_dung: "[W]Phòng cháy chữa cháy:[/W] Tuân thủ [R]nghiêm ngặt[/R] các quy định về an toàn điện, phòng chống cháy nổ tại phòng điều khiển." },
];

// Cấu hình hiển thị — thay cho sheet CauHinh
const APP_CONFIG = {
    // Dòng chữ chạy ở footer (ticker)
    ticker: "Điều hành cơ sở thực hiện theo QĐ 2578/QĐ-EVNSPC ngày 02/10/2024; QĐ 696/QĐ-EVN ngày 30/5/2025 và QĐ 292/QĐ-HĐTV ngày 18/11/2025 về quản lý, khai thác hệ thống VT-CNTT của EVN và EVNSPC.",

    // Ghi chú hiển thị ở cuối sidebar (phần tử .schedule-note), không trộn với nhãn nguồn dữ liệu
    note: "Dong bo tu Google Sheets. [Test Sync 100% OK]",
};
