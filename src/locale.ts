/** UI strings used by built-in labels, placeholders and aria-labels. Pass one to `<ConfigProvider locale>`. */
export interface Locale {
  code: string;
  ok: string;
  cancel: string;
  close: string;
  clear: string;
  remove: string;
  search: string;
  select: string;
  noData: string;
  noOptions: string;
  noResults: string;
  noMatch: string;
  items: (count: number) => string;
  selectAll: string;
  selectRow: string;
  showPassword: string;
  hidePassword: string;
  increase: string;
  decrease: string;
  selectDate: string;
  selectTime: string;
  startDate: string;
  endDate: string;
  today: string;
  now: string;
  prevYear: string;
  prevMonth: string;
  nextMonth: string;
  nextYear: string;
  /** January … December. */
  months: string[];
  /** Short weekday names starting on Sunday. */
  weekdays: string[];
  breadcrumb: string;
  pagination: string;
  prevPage: string;
  nextPage: string;
  prevPages: string;
  nextPages: string;
  closeTab: string;
  uploadHint: string;
  uploadFailed: string;
  backToTop: string;
  onThisPage: string;
  prevSlide: string;
  nextSlide: string;
  imagePreview: string;
  prevImage: string;
  nextImage: string;
  zoomIn: string;
  zoomOut: string;
  rotate: string;
  moveToTarget: string;
  moveToSource: string;
  saturation: string;
  hue: string;
  opacity: string;
  hexColor: string;
}

export const enUS: Locale = {
  code: 'en-US',
  ok: 'OK',
  cancel: 'Cancel',
  close: 'Close',
  clear: 'Clear',
  remove: 'Remove',
  search: 'Search…',
  select: 'Select…',
  noData: 'No data',
  noOptions: 'No options',
  noResults: 'No results',
  noMatch: 'No match',
  items: (n) => `${n} ${n === 1 ? 'item' : 'items'}`,
  selectAll: 'Select all',
  selectRow: 'Select row',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
  increase: 'Increase',
  decrease: 'Decrease',
  selectDate: 'Select date',
  selectTime: 'Select time',
  startDate: 'Start date',
  endDate: 'End date',
  today: 'Today',
  now: 'Now',
  prevYear: 'Previous year',
  prevMonth: 'Previous month',
  nextMonth: 'Next month',
  nextYear: 'Next year',
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  breadcrumb: 'Breadcrumb',
  pagination: 'Pagination',
  prevPage: 'Previous page',
  nextPage: 'Next page',
  prevPages: 'Previous pages',
  nextPages: 'Next pages',
  closeTab: 'Close tab',
  uploadHint: 'Click or drag files here to upload',
  uploadFailed: 'Upload failed',
  backToTop: 'Back to top',
  onThisPage: 'On this page',
  prevSlide: 'Previous slide',
  nextSlide: 'Next slide',
  imagePreview: 'Image preview',
  prevImage: 'Previous image',
  nextImage: 'Next image',
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  rotate: 'Rotate',
  moveToTarget: 'Move to target',
  moveToSource: 'Move to source',
  saturation: 'Saturation and brightness',
  hue: 'Hue',
  opacity: 'Opacity',
  hexColor: 'Hex color',
};

export const viVN: Locale = {
  code: 'vi-VN',
  ok: 'Đồng ý',
  cancel: 'Hủy',
  close: 'Đóng',
  clear: 'Xóa',
  remove: 'Bỏ',
  search: 'Tìm kiếm…',
  select: 'Chọn…',
  noData: 'Không có dữ liệu',
  noOptions: 'Không có lựa chọn',
  noResults: 'Không tìm thấy',
  noMatch: 'Không khớp',
  items: (n) => `${n} mục`,
  selectAll: 'Chọn tất cả',
  selectRow: 'Chọn dòng',
  showPassword: 'Hiện mật khẩu',
  hidePassword: 'Ẩn mật khẩu',
  increase: 'Tăng',
  decrease: 'Giảm',
  selectDate: 'Chọn ngày',
  selectTime: 'Chọn giờ',
  startDate: 'Từ ngày',
  endDate: 'Đến ngày',
  today: 'Hôm nay',
  now: 'Bây giờ',
  prevYear: 'Năm trước',
  prevMonth: 'Tháng trước',
  nextMonth: 'Tháng sau',
  nextYear: 'Năm sau',
  months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  weekdays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  breadcrumb: 'Đường dẫn',
  pagination: 'Phân trang',
  prevPage: 'Trang trước',
  nextPage: 'Trang sau',
  prevPages: 'Lùi 5 trang',
  nextPages: 'Tiến 5 trang',
  closeTab: 'Đóng tab',
  uploadHint: 'Bấm hoặc kéo tệp vào đây để tải lên',
  uploadFailed: 'Tải lên thất bại',
  backToTop: 'Lên đầu trang',
  onThisPage: 'Trên trang này',
  prevSlide: 'Ảnh trước',
  nextSlide: 'Ảnh sau',
  imagePreview: 'Xem ảnh',
  prevImage: 'Ảnh trước',
  nextImage: 'Ảnh sau',
  zoomIn: 'Phóng to',
  zoomOut: 'Thu nhỏ',
  rotate: 'Xoay',
  moveToTarget: 'Chuyển sang phải',
  moveToSource: 'Chuyển sang trái',
  saturation: 'Độ bão hòa và độ sáng',
  hue: 'Sắc độ',
  opacity: 'Độ trong suốt',
  hexColor: 'Mã màu hex',
};
