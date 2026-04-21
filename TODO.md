# Danh sách công việc (TODO) - Dự án Dashboard Lịch Trực

## ✅ Đã hoàn thành (Done)
- [x] Thiết kế giao diện Glassmorphism cao cấp, hiện đại.
- [x] Hiển thị thông tin 2 ca trực trong ngày.
- [x] Thêm hiển thị 2 ca trực của ngày tiếp theo (Lịch ngày mai).
- [x] Sửa lỗi logic "Ngày hiệu lực": Lùi 1 ngày nếu thời gian hiện tại là sáng sớm (00:00 - 06:00) để khớp với chu kỳ trực.
- [x] Thêm tính năng tự động làm mới trang (Reload) sau mỗi 30 phút.
- [x] Tối ưu footer: Bỏ chữ "Đang vận hành", thu gọn icon trạng thái.
- [x] Đẩy mã nguồn lên GitHub repository: `thongkvq/noiquy`.
- [x] Tích hợp lấy dữ liệu tự động từ Google Sheets cho:
  - [x] Lịch trực (Sheet: `LichTruc`)
  - [x] Dòng chữ chạy footer (Sheet: `CauHinh`, key: `ticker`)
  - [x] 4 khung nội quy (Sheet: `NoiQuy`)
- [x] Cơ chế Fallback và Loading state cho toàn bộ dashboard.
- [x] Chuẩn hóa định dạng ngày tháng để khớp dữ liệu Sheets tự động.

## 🕒 Sắp tới / Gợi ý (Backlog)
- [ ] Triển khai lên Vercel (`noiquy.vercel.app`).
- [ ] Thêm thông báo đẩy (Browser Notifications) khi đến giờ giao nhận ca.
- [x] Chế độ hiển thị toàn màn hình (Kiosk mode) tối ưu cho TV theo dõi.
- [ ] Thêm thông tin thời tiết hoặc tin tức nội bộ chạy ở thanh ticker dưới cùng.
