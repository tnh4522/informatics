# Quy định & Hướng dẫn dành cho AI Agent (Project Instructions)

## 1. Quy tắc Tự Động Commit và Push (Bắt buộc)
Người dùng đã yêu cầu rõ ràng và thiết lập quy tắc thường trực cho dự án này:
**Mỗi lần AI hoàn thành một task, tính năng, hoặc sửa lỗi có thay đổi code (thêm, sửa, xóa file):**
1. **Kiểm tra chất lượng code**:
   - Chạy `npx tsc --noEmit` để đảm bảo không có lỗi TypeScript.
   - Chạy `npm run lint` để đảm bảo chuẩn code và không có lỗi linter.
2. **Kiểm tra trạng thái Git**:
   - Chạy `git status` để kiểm tra danh sách file đã thay đổi.
3. **Stage, Commit & Push**:
   - Stage các file liên quan: `git add <files>` (hoặc `git add .`, luôn tuân thủ `.gitignore`).
   - Tạo commit với thông điệp rõ ràng theo chuẩn Conventional Commits (ví dụ: `feat(...)`, `fix(...)`, `refactor(...)`, `style(...)`):
     ```bash
     git commit -m "<loại commit>: <mô tả ngắn gọn>"
     ```
   - Push ngay lập tức lên remote repository:
     ```bash
     git push origin main
     ```
4. **Báo cáo kết quả**:
   - Trong phản hồi cuối cùng gửi cho người dùng, luôn thông báo mã commit hash và xác nhận việc push code lên GitHub đã thành công.

---

## 2. Tiêu chuẩn mã nguồn dự án
- Framework: Next.js (App Router), React 19, TypeScript, Tailwind CSS v4.
- Luôn giữ code sạch sẽ, không để lại code thừa, debug log hoặc cảnh báo không cần thiết.
- Không commit các thư mục cache/tạm thời như `.next/`, `node_modules/`, `.agent/`, `.agents/`, `.claude/`, `.impeccable/`.
