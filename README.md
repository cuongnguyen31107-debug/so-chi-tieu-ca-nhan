# Sổ chi tiêu cá nhân

**Họ và tên:** Nguyễn Việt Cường  
**Mã sinh viên:** B25DCTV009

Ứng dụng React ghi lại các khoản chi hằng ngày, được xây dựng hai lần với cùng chức năng:

- [part-a-class](./part-a-class) — Class Component
- [part-b-hooks](./part-b-hooks) — Function Component + Hooks

Không sử dụng React Router, Redux hay thư viện UI.

## Cách chạy

Cần cài Node.js (khuyến nghị bản 20 trở lên).

### Part A — Class Component

```bash
cd part-a-class
npm install
npm run dev
```

### Part B — Function Component + Hooks

```bash
cd part-b-hooks
npm install
npm run dev
```

Mở địa chỉ mà Vite in ra (mặc định `http://localhost:5173`). Nếu chạy cả hai cùng lúc, Vite sẽ tự tăng cổng cho ứng dụng thứ hai.

Build bản production trong từng thư mục:

```bash
npm run build
npm run preview
```

## Chức năng

- Đồng hồ chạy mỗi giây, hiển thị giờ và ngày hiện tại.
- Thêm khoản chi gồm nội dung, số tiền, loại (Ăn uống / Đi lại / Học tập / Giải trí) và ngày; có kiểm tra dữ liệu.
- Lọc theo loại, tìm kiếm theo nội dung, xóa khoản chi có xác nhận.
- Danh sách dùng `key`, hiển thị tổng tiền và thống kê theo từng loại.
- Tiêu đề tab trình duyệt cập nhật theo tổng chi.
- Riêng Part B: dữ liệu lấy từ mock API qua `useFetch` với trạng thái đang tải và lỗi; `useRef` đưa con trỏ về ô nhập sau khi thêm; `useContext` cho chế độ sáng/tối; tìm kiếm có debounce.

## Hooks đã khắc phục thách thức của Class ở đâu

- **Đồng hồ:** Class phải chia logic giữa `componentDidMount` và `componentWillUnmount`; `useEffect` gom việc bật/tắt bộ đếm vào một chỗ nên khó quên dọn dẹp.
- **Tải dữ liệu:** Class rải logic qua `componentDidMount`, `componentDidUpdate` và `this.setState`; `useFetch` đóng gói toàn bộ vòng đời tải dữ liệu, kể cả trường hợp component bị gỡ khi request chưa xong.
- **Focus ô nhập:** Class cần tạo ref trong constructor và xử lý sau `setState`; `useRef` kết hợp `await` cho phép focus ngay sau khi thêm thành công.
- **Chế độ sáng/tối:** Không cần truyền prop qua nhiều tầng; `createContext` + `useContext` cho phép nút chuyển chế độ và mọi component đọc trực tiếp trạng thái.
- **Tìm kiếm debounce:** `useEffect` với hàm dọn dẹp `clearTimeout` xử lý gọn việc hủy hẹn giờ cũ; Class phải tự quản lý timer trong `this` và dọn ở `componentWillUnmount`.
- **Tiêu đề tab:** Class dùng `componentDidUpdate` để so sánh state trước/sau; `useEffect` phụ thuộc trực tiếp vào tổng tiền nên ngắn gọn và ít sai sót hơn.
