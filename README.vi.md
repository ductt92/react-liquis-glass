# react-liquis-glass

**Bộ giao diện liquid glass cho React.** Hơn 80 component với hiệu ứng kính trong suốt, khúc xạ ánh sáng theo phong cách Apple, đầy đủ như Material UI hay Ant Design, kèm 139 icon. Viết bằng TypeScript, chạy được cả khi render phía máy chủ.

> 🇬🇧 English: [README.md](./README.md) · 📖 Storybook (xem trực tiếp mọi component): https://ductt92.github.io/react-liquis-glass/

## Cài đặt

```bash
npm install react-liquis-glass
```

Cần `react` và `react-dom` bản **18 trở lên**.

## Bắt đầu nhanh

```tsx
// main.tsx (hoặc app/layout.tsx với Next.js)
import 'react-liquis-glass/styles.css';            // import CSS một lần duy nhất
import { ConfigProvider, viVN, Card, Button, message } from 'react-liquis-glass';
import { SparklesIcon } from 'react-liquis-glass/icons';

export default function App() {
  return (
    <ConfigProvider theme="light" accent="#0a84ff" locale={viVN}>
      <Card title="Xin chào">
        <Button variant="filled" color="primary" icon={<SparklesIcon />} onClick={() => message.success('Đã lưu!')}>
          Lưu
        </Button>
      </Card>
    </ConfigProvider>
  );
}
```

> **Lưu ý quan trọng:** kính chỉ đẹp khi **phía sau có màu**. Hãy đặt nền gradient, ảnh hoặc nội dung nhiều màu cho trang, nếu không component sẽ trông xám và phẳng.

```css
body {
  min-height: 100vh;
  background: radial-gradient(60% 50% at 15% 20%, #ffd1e8 0%, transparent 60%),
              radial-gradient(50% 60% at 85% 15%, #c6e2ff 0%, transparent 60%), #eef1f8;
  background-attachment: fixed;
}
```

### Next.js (App Router)

Mọi component đã có sẵn `"use client"`. Bạn đặt CSS và `ConfigProvider` trong `app/layout.tsx`. Riêng `message`, `notification`, `confirm` thì gọi trong sự kiện hoặc `useEffect`, không gọi lúc render.

## Theme và giao diện

| Prop của `ConfigProvider` | Ý nghĩa |
| --- | --- |
| `theme` | `'light'` hoặc `'dark'` |
| `accent` | Màu chủ đạo (nút, viền focus, mục đang chọn) |
| `success`, `warning`, `danger`, `info` | Màu trạng thái |
| `radius` | Độ bo góc gốc (px) |
| `blur` | Độ mờ của kính (px) |
| `fontFamily` | Phông chữ |
| `locale` | Ngôn ngữ nhãn: `viVN` hoặc `enUS` (mặc định) |
| `refraction` | Hiệu ứng khúc xạ SVG, chỉ chạy trên Chrome/Edge |

Mọi màu và kích thước đều là biến CSS (`--lg-accent`, `--lg-blur`, `--lg-radius`, `--lg-glass-bg`…), nên có thể chỉnh trực tiếp bằng CSS:

```css
.lg-root { --lg-blur: 32px; --lg-radius: 18px; }
```

Muốn biến một thẻ bất kỳ thành tấm kính, thêm class `lg-glass` (hoặc `lg-glass lg-glass-strong` để kính đặc hơn).

## Tiếng Việt

Đặt `<ConfigProvider locale={viVN}>` thì mọi chữ có sẵn đều sang tiếng Việt: Đồng ý / Hủy / Đóng, Hiện / Ẩn mật khẩu, Chọn…, Tìm kiếm…, tên tháng, thứ (CN, T2…T7), Hôm nay, Bây giờ, phân trang, tải tệp, "12 mục"…, kể cả nhãn đọc màn hình. Thông báo `message`, `notification` và `confirm()` cũng theo.

Tìm kiếm trong `Select`, `AutoComplete`, `TreeSelect`, `Cascader`, `Transfer` **không phân biệt dấu**: gõ "ha noi" vẫn ra "Hà Nội".

## Danh sách component

| Nhóm | Component |
| --- | --- |
| Cơ bản | `Button`, `IconButton` (có `as` để thành `Link` của router), `ButtonGroup`, `Typography` (`Title`, `Text`, `Paragraph`, có nút copy) |
| Bố cục | `Layout` (`Header`, `Sider` thu gọn được, `Content`, `Footer`), `Space`, `Flex`, `Row`/`Col` (lưới 24 cột), `Card` (có `as` và `bare` để tự bố cục nội dung), `Divider` |
| Nhập liệu | `Input`, `Password`, `SearchInput`, `TextArea`, `InputNumber`, `Select`, `AutoComplete`, `Checkbox`, `Radio`, `Switch`, `Slider`, `Rate`, `Segmented`, `DatePicker`, `RangePicker`, `TimePicker`, `Calendar`, `ColorPicker`, `Cascader`, `TreeSelect`, `Transfer`, `Upload`, `Form`/`FormItem` |
| Hiển thị | `Table`, `List`, `Tree`, `Collapse`, `Avatar`, `Badge`, `Tag`, `Progress`, `Statistic`, `Countdown`, `Timeline`, `Descriptions`, `Carousel`, `Image` (xem phóng to), `Skeleton`, `Spin`, `Empty`, `Kbd`, `Watermark` |
| Điều hướng | `Tabs`, `Menu`, `Dropdown`, `Breadcrumb`, `Pagination`, `Steps`, `Anchor`, `NavBar`, `TabBar` (thanh tab kiểu iOS), `FloatButton`, `BackTop` |
| Phản hồi | `Modal`, `Drawer`, `Tooltip`, `Popover`, `Popconfirm`, `Alert`, `Result`, `message`, `notification`, `confirm` |

Ví dụ chi tiết cho từng nhóm có trong [README.md](./README.md#components), và bản xem trực tiếp có trên [Storybook](https://ductt92.github.io/react-liquis-glass/).

### Ví dụ form

```tsx
<Form layout="vertical">
  <FormItem label="Thành phố" required>
    <Select showSearch allowClear options={[{ label: 'Hà Nội', value: 'hn' }, { label: 'Hồ Chí Minh', value: 'hcm' }]} />
  </FormItem>
  <FormItem label="Ngày đi – ngày về"><RangePicker format="DD/MM/YYYY" /></FormItem>
  <FormItem label="Giờ khởi hành"><TimePicker format="HH:mm" minuteStep={15} /></FormItem>
  <Button type="submit" variant="filled" color="primary" block>Đặt chỗ</Button>
</Form>
```

### Thông báo và hộp xác nhận

```ts
import { message, notification, confirm } from 'react-liquis-glass';

message.success('Đã lưu');
notification.info({ title: 'Tin nhắn mới', description: 'Anna: giao diện kính đẹp quá!' });
confirm({ title: 'Xóa dự án?', content: 'Không thể hoàn tác.', okText: 'Xóa', okDanger: true, onOk: () => api.xoa() });
```

## Icon

```tsx
import { HomeIcon, LoadingIcon } from 'react-liquis-glass/icons';

<HomeIcon size={24} color="var(--lg-accent)" />
<LoadingIcon spin />
```

Icon mặc định cỡ `1em` và lấy màu chữ xung quanh. Có 139 icon (danh sách đầy đủ trong [README.md](./README.md#icons)). Muốn thêm icon riêng thì dùng `createIcon(tên, markupSVG)`.

## Hỏi đáp

- **Component trông xám, phẳng?** Phía sau chưa có màu để kính làm mờ. Thêm nền gradient như ví dụ ở trên.
- **Có cần Tailwind hay CSS-in-JS không?** Không. Chỉ cần import `react-liquis-glass/styles.css`, và vẫn dùng chung được với Tailwind.
- **Muốn chỉnh riêng một component?** Mọi phần tử có class cố định `lg-*` (`lg-btn`, `lg-card`, `lg-modal`…), và component nào cũng nhận `className` và `style`.
- **Trình duyệt nào hỗ trợ?** Chrome, Edge, Safari 15.4+, Firefox 103+. Trình duyệt cũ hơn sẽ hiện nền đặc thay cho kính.

## Phát triển

```bash
git clone https://github.com/ductt92/react-liquis-glass.git
cd react-liquis-glass
npm install
npm run storybook     # xem thử tại http://localhost:6006
npm run build         # build ra dist/
```

Xem thêm [CONTRIBUTING.md](./CONTRIBUTING.md) và [CHANGELOG.md](./CHANGELOG.md).

## Giấy phép

[MIT](./LICENSE)
