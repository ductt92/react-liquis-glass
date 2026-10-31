# react-liquis-glass

**Liquid glass UI for React.** More than 80 components with an Apple-style translucent, refractive look, the kind of coverage you'd expect from Material UI or Ant Design, plus 139 icons. Written in TypeScript and ready for server-side rendering.

[![npm](https://img.shields.io/npm/v/react-liquis-glass?color=0a84ff)](https://www.npmjs.com/package/react-liquis-glass)
[![license](https://img.shields.io/npm/l/react-liquis-glass)](./LICENSE)
[![types](https://img.shields.io/npm/types/react-liquis-glass)](https://www.npmjs.com/package/react-liquis-glass)
[![storybook](https://img.shields.io/badge/storybook-live-ff4785)](https://ductt92.github.io/react-liquis-glass/)

**[📖 Live Storybook](https://ductt92.github.io/react-liquis-glass/)**: try every component in light/dark, three wallpapers, English or Vietnamese.

> 🇻🇳 Tài liệu tiếng Việt: [README.vi.md](./README.vi.md)

```tsx
import 'react-liquis-glass/styles.css';
import { ConfigProvider, Card, Button, message } from 'react-liquis-glass';

<ConfigProvider theme="dark" accent="#0a84ff">
  <Card title="Hello, glass">
    <Button variant="filled" color="primary" onClick={() => message.success('Saved!')}>Save</Button>
  </Card>
</ConfigProvider>
```

---

## Contents

- [Features](#features)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Framework setup](#framework-setup) (Vite, Next.js, Remix)
- [Theming](#theming)
- [Localization](#localization)
- [Components](#components)
- [Imperative APIs](#imperative-apis): `message`, `notification`, `confirm`
- [Icons](#icons)
- [TypeScript](#typescript)
- [Accessibility](#accessibility)
- [Browser support](#browser-support)
- [FAQ](#faq)
- [Development](#development)
- [License](#license)

---

## Features

- **Liquid glass surfaces.** Backdrop blur and saturation, specular highlights, inner edge light and soft depth. There is also an optional SVG refraction effect.
- **More than 80 components**: buttons, forms, date, time, color and tree pickers, tables, overlays, feedback and a full app shell.
- **139 stroke icons** in their own entry point, `react-liquis-glass/icons`. Each icon is tree-shakeable.
- **Light and dark themes** with design tokens for accent, status colors, radius, blur and font.
- **Localized labels**: Vietnamese (`viVN`) and English (`enUS`) are built in, and you can pass your own `Locale`.
- **Accent-insensitive search** in Select, AutoComplete, TreeSelect, Cascader and Transfer, so "ha noi" finds "Hà Nội".
- **Plain CSS with CSS variables.** There is no CSS-in-JS runtime, and you can override anything with your own CSS.
- **TypeScript first**: full `.d.ts`, generic `Select<V>` and `Table<T>`.
- **Works everywhere**: ESM + CJS builds, `"use client"` banner for the Next.js App Router, safe to render on the server.
- **Small footprint.** The only dependencies are `react` and `react-dom` (peers).

## Installation

```bash
npm install react-liquis-glass
# or
pnpm add react-liquis-glass
# or
yarn add react-liquis-glass
```

Peer dependencies: `react` and `react-dom` **18 or newer**.

## Quick start

1. **Import the stylesheet once** at your app entry:

   ```ts
   import 'react-liquis-glass/styles.css';
   ```

2. **Wrap your app** in `ConfigProvider`. It sets the theme, tokens and locale for every component, including portals such as modals and dropdowns:

   ```tsx
   import { ConfigProvider, viVN } from 'react-liquis-glass';

   export function App() {
     return (
       <ConfigProvider theme="light" accent="#0a84ff" locale={viVN}>
         <YourRoutes />
       </ConfigProvider>
     );
   }
   ```

3. **Put something colorful behind the glass.** Glass is see-through, so it only looks like glass over a gradient, photo or rich content:

   ```css
   body {
     min-height: 100vh;
     background:
       radial-gradient(60% 50% at 15% 20%, #ffd1e8 0%, transparent 60%),
       radial-gradient(50% 60% at 85% 15%, #c6e2ff 0%, transparent 60%),
       radial-gradient(60% 60% at 70% 90%, #d8ffe9 0%, transparent 60%),
       #eef1f8;
     background-attachment: fixed;
   }
   ```

4. **Use components and icons:**

   ```tsx
   import { Card, Input, Button, Space } from 'react-liquis-glass';
   import { SearchIcon, SparklesIcon } from 'react-liquis-glass/icons';

   <Card title="Search">
     <Space>
       <Input prefix={<SearchIcon />} placeholder="Type to search…" allowClear />
       <Button variant="filled" color="primary" icon={<SparklesIcon />}>Go</Button>
     </Space>
   </Card>
   ```

## Framework setup

### Vite / Create React App

Import the CSS in `main.tsx` and wrap `<App />` in `ConfigProvider`. That's all.

### Next.js (App Router)

All components ship with `"use client"`, so you can import them directly from server components. Put the stylesheet and the provider in the root layout:

```tsx
// app/layout.tsx
import 'react-liquis-glass/styles.css';
import { ConfigProvider, viVN } from 'react-liquis-glass';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <ConfigProvider theme="light" locale={viVN}>{children}</ConfigProvider>
      </body>
    </html>
  );
}
```

`message`, `notification` and `confirm` are browser-only APIs. Call them from event handlers or effects, not during render.

### Next.js (Pages Router) / Remix

Import the CSS in `_app.tsx` (or `root.tsx`) and wrap the page in `ConfigProvider`.

## Theming

### ConfigProvider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` | `'light' \| 'dark'` | `'light'` | Color scheme |
| `accent` | CSS color | `#0a84ff` | Primary color for buttons, focus rings, selections |
| `success` / `warning` / `danger` / `info` | CSS color | system colors | Status colors |
| `radius` | `number` (px) | `14` | Base corner radius. Small and large radii scale from it |
| `blur` | `number` (px) | `22` | Backdrop blur strength of glass surfaces |
| `fontFamily` | `string` | system UI stack | Font for every component |
| `locale` | `Locale` | `enUS` | Built-in labels, placeholders and aria-labels |
| `refraction` | `boolean` | `false` | SVG displacement refraction (Chromium only, see [Browser support](#browser-support)) |
| `getPopupContainer` | `() => HTMLElement` | fullscreen element, else `document.body` | Where Select, Dropdown, Tooltip, Modal and other layers mount |

You can nest providers to theme part of the page differently:

```tsx
<ConfigProvider theme="light">
  <Page />
  <ConfigProvider theme="dark" accent="#bf5af2">
    <Sidebar />
  </ConfigProvider>
</ConfigProvider>
```

### Where popups mount

Select, Dropdown, Tooltip, Popover, DatePicker, Modal and Drawer render in a portal. By default it is `document.body`, or the element in fullscreen while there is one, so a dropdown inside a fullscreen video player stays visible. Change it for the whole app with `ConfigProvider`'s `getPopupContainer`, or for one `Select` with its own `getPopupContainer(trigger)`. Popups are `position: fixed`, so pick a container without `transform`, `filter` or `backdrop-filter` unless it fills the viewport.

### CSS variables

Every token is a CSS variable on `.lg-root`, so you can also theme with plain CSS:

| Variable | Purpose |
| --- | --- |
| `--lg-accent`, `--lg-success`, `--lg-warning`, `--lg-danger`, `--lg-info` | Colors |
| `--lg-text`, `--lg-text-2`, `--lg-text-3` | Primary, secondary and tertiary text |
| `--lg-glass-bg`, `--lg-glass-bg-strong`, `--lg-glass-bg-hover` | Glass fill (normal, more opaque, hover) |
| `--lg-glass-border`, `--lg-glass-edge`, `--lg-glass-edge-low` | Glass rim and edge highlights |
| `--lg-glass-shadow`, `--lg-glass-shadow-lg` | Depth |
| `--lg-blur`, `--lg-saturate` | Backdrop filter strength |
| `--lg-radius-sm`, `--lg-radius`, `--lg-radius-lg`, `--lg-radius-pill` | Corner radii |
| `--lg-h-sm`, `--lg-h-md`, `--lg-h-lg` | Control heights (30 / 38 / 46 px) |
| `--lg-fill`, `--lg-fill-2`, `--lg-line` | Subtle fills and dividers |
| `--lg-font` | Font family |

```css
/* Frostier, rounder glass everywhere */
.lg-root {
  --lg-blur: 32px;
  --lg-radius: 18px;
  --lg-glass-bg: rgba(255, 255, 255, 0.4);
}
```

### The `lg-glass` utility

To turn any element into a glass surface, add these classes:

```tsx
<div className="lg-glass" style={{ borderRadius: 24, padding: 24 }}>Custom glass panel</div>
<div className="lg-glass lg-glass-strong">More opaque glass for dense content</div>
```

## Localization

```tsx
import { ConfigProvider, viVN, enUS, type Locale } from 'react-liquis-glass';

<ConfigProvider locale={viVN}>…</ConfigProvider>   // Đóng, Hủy, Chọn…, Hôm nay, …
<ConfigProvider locale={enUS}>…</ConfigProvider>   // Close, Cancel, Select…, Today, … (default)
```

The locale drives every built-in string: OK/Cancel/Close buttons, show/hide password, Select and Search placeholders, empty states, calendar month and weekday names, Today/Now, pagination and upload labels, Transfer counts, and every aria-label. `message`, `notification` and `confirm()` follow the provider too. Props you pass explicitly, such as `okText` or `placeholder`, always win.

**Another language:** copy `enUS` and translate it:

```ts
import { enUS, type Locale } from 'react-liquis-glass';

export const frFR: Locale = {
  ...enUS,
  code: 'fr-FR',
  ok: 'OK',
  cancel: 'Annuler',
  close: 'Fermer',
  today: "Aujourd'hui",
  months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  weekdays: ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
  items: (n) => `${n} éléments`,
  // …
};
```

## Components

Every component is exported from `react-liquis-glass`. Props are fully typed, and your editor's autocomplete is the full reference. The [live Storybook](https://ductt92.github.io/react-liquis-glass/) shows each one in action.

### General

| Component | Highlights |
| --- | --- |
| `Button` | `variant`: `glass` · `filled` · `tinted` · `outline` · `text` · `link`; `color`: `primary` · `success` · `warning` · `danger` · `info` · `default`; `size`, `shape` (`round` / `circle`), `icon`, `iconPosition`, `loading`, `block`, `href`, `as` (render as another component, e.g. a router `Link`) |
| `IconButton` | Circular icon-only button (`aria-label` required). Also takes `as` |
| `ButtonGroup` | Joins buttons into a segmented row |
| `Typography` (`Title`, `Text`, `Paragraph`) | `level`, `type` (`secondary`, `success`, `danger`…), `strong`, `code`, `mark`, `ellipsis` (`true` or line count), `copyable` |

```tsx
<Button variant="filled" color="primary" icon={<PlusIcon />}>New</Button>
<Button variant="tinted" color="danger" loading>Deleting</Button>
<IconButton aria-label="Settings" icon={<SettingsIcon />} />
<Button as={Link} to="/settings" icon={<SettingsIcon />}>Settings</Button> {/* React Router, Next.js… */}
<Text copyable>npm i react-liquis-glass</Text>
<Paragraph ellipsis={2}>Long text clamped to two lines…</Paragraph>
```

### Layout

| Component | Highlights |
| --- | --- |
| `Layout`, `Header`, `Sider`, `Content`, `Footer` | App shell. `Sider` is a glass sidebar that can collapse (`collapsible`, `collapsed`, `onCollapse`, `width`, `collapsedWidth`). `useSider()` tells children whether it's collapsed |
| `Space` | Inline spacing with `size`, `direction`, `wrap`, `split` |
| `Flex` | Flexbox helper: `vertical`, `gap`, `justify`, `align`, `wrap` |
| `Row` / `Col` | 24-column grid with `gutter`, `span`, `offset` and responsive `xs` `sm` `md` `lg` `xl` |
| `Card` | `title`, `subtitle`, `extra`, `cover`, `actions`, `hoverable`, `loading`, `variant` (`glass` / `strong` / `plain`). `as` sets the root element (`section`, `form`…). `bare` drops the body wrapper and its padding so your own layout (`display: flex`, `gap`) applies to the children |
| `Divider` | Horizontal or vertical, with optional text and `orientation` |

```tsx
<Layout>
  <Sider collapsible>
    <Menu items={menuItems} defaultSelectedKey="dashboard" />
  </Sider>
  <Layout>
    <Header>…</Header>
    <Content>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}><Card title="Revenue">…</Card></Col>
        <Col xs={24} md={12}><Card title="Users">…</Card></Col>
      </Row>
    </Content>
  </Layout>
</Layout>
```

### Data entry

| Component | Highlights |
| --- | --- |
| `Input` | `prefix`, `suffix`, `addonBefore`/`addonAfter`, `allowClear`, `showCount`, `status`, `variant` (`glass` / `filled` / `outline`), `onValueChange` |
| `Password`, `SearchInput`, `TextArea`, `InputNumber` | Password has a show/hide toggle. `SearchInput` takes `onSearch`. `TextArea` has `autoSize`. `InputNumber` has `min`/`max`/`step`/`precision` and steppers |
| `Select` | Single or `multiple`, `showSearch`, option groups, `allowClear`, `maxTagCount`, full keyboard navigation, `getPopupContainer`. Generic over the value type |
| `AutoComplete` | Suggestions while typing, either static `options` or async `onSearch` |
| `Checkbox`, `CheckboxGroup` | `indeterminate`, `options`, `direction` |
| `Radio`, `RadioGroup` | `optionType="button"` for a glass segmented look |
| `Switch` | iOS-style, with `size`, `loading`, `checkedChildren` |
| `Slider` | Single or `range`, `marks`, `step`, tooltip bubble |
| `Rate` | `allowHalf`, custom `character` |
| `Segmented` | Sliding glass thumb with icons and `block`. Labels can be any node; items grow to fit two-line labels. Takes `aria-label` |
| `DatePicker`, `Calendar` | `format`, `disabledDate`, `weekStartsOn` |
| `RangePicker` | Two-month panel with hover preview and `presets` |
| `TimePicker` | Scrolling columns. `format` is `'HH:mm'` or `'HH:mm:ss'`, with `minuteStep` and a Now button |
| `ColorPicker` | Saturation/value square, hue and alpha sliders, hex input, `presets` |
| `Cascader` | Multi-column path picker with `changeOnSelect`, `expandTrigger` and search |
| `TreeSelect` | Tree in a dropdown, with `multiple` / `treeCheckable` and search |
| `Transfer` | Two lists with search and select-all |
| `Upload` | Drag-and-drop zone and file list. `customRequest` lets you report upload progress |
| `Form`, `FormItem` | Layout only (`vertical` / `horizontal` / `inline`), with `label`, `required`, `help` and `status`. Bring your own state library |

```tsx
const [city, setCity] = useState<string | null>(null);

<Form layout="vertical">
  <FormItem label="City" required>
    <Select
      showSearch
      allowClear
      value={city}
      onChange={setCity}
      options={[{ label: 'Hà Nội', value: 'hn' }, { label: 'Hồ Chí Minh', value: 'hcm' }]}
    />
  </FormItem>
  <FormItem label="Trip dates">
    <RangePicker format="DD/MM/YYYY" />
  </FormItem>
  <FormItem label="Departure time">
    <TimePicker format="HH:mm" minuteStep={15} />
  </FormItem>
  <FormItem label="Theme color">
    <ColorPicker defaultValue="#0a84ff" showText />
  </FormItem>
</Form>
```

### Data display

| Component | Highlights |
| --- | --- |
| `Table` | `columns` with `render`, `sorter`, `align`, `ellipsis`; `rowSelection`, client or remote `pagination`, `loading`, `striped`, sticky header. Generic over the row type |
| `List`, `ListItem` | iOS inset-grouped glass list with `prefix`, `title`, `description`, `extra` and a `clickable` chevron |
| `Tree` | Expandable, `checkable` with parent/child cascade, `showLine`, keyboard navigation |
| `Collapse` | Accordion or `separated` cards, with animated height |
| `Avatar`, `AvatarGroup` | Image, initials (auto color) or icon, with `status` dot and `max` overflow |
| `Badge` | Count, dot or `status` with ripple |
| `Tag` | Tinted, filled, outline or glass. `closable`, or checkable via `checked` |
| `Progress` | Line, circle or dashboard; gradient `strokeColor`, `steps`, `aria-label` |
| `Statistic`, `Countdown` | Big numbers with trend arrows. `Countdown` counts down to `value` with `format` and `onFinish` |
| `Timeline`, `Descriptions` | Event lists and key/value grids |
| `Carousel` | Swipe, autoplay, `effect: 'slide' \| 'fade'`, glass dots and arrows |
| `Image`, `ImagePreviewGroup` | Lazy image with a skeleton while loading, and a full-screen glass lightbox (zoom, rotate, prev/next) |
| `Skeleton`, `Spin`, `Empty` | Loading and empty states |
| `Kbd`, `Watermark` | Keyboard keys, and a repeating text or image watermark |

```tsx
type User = { id: number; name: string; role: string };

<Table<User>
  rowKey="id"
  dataSource={users}
  columns={[
    { key: 'name', title: 'Name', sorter: true },
    { key: 'role', title: 'Role', render: (v) => <Tag color="primary">{v}</Tag> },
  ]}
  pagination={{ pageSize: 10 }}
  rowSelection={{ onChange: (keys) => console.log(keys) }}
/>
```

### Navigation

| Component | Highlights |
| --- | --- |
| `Tabs` | `variant`: `line` · `pill` · `card`; sliding indicator, closable tabs, `tabBarExtra`, `aria-label` |
| `Menu` | Vertical or horizontal, groups, dividers, sub-menus, `collapsed` icon rail |
| `Dropdown` | Menu in a glass popover with keyboard navigation and danger items |
| `Breadcrumb`, `Pagination`, `Steps` | The usual, in glass |
| `Anchor` | In-page table of contents that highlights the section you're reading |
| `NavBar` | Sticky or `floating` capsule header |
| `TabBar` | iOS-style bottom tab bar with badges |
| `FloatButton`, `FloatButtonGroup`, `BackTop` | Floating action button, speed dial, back to top |

### Overlays & feedback

| Component | Highlights |
| --- | --- |
| `Modal` | Focus trap, Esc to close, `okLoading`, `okDanger`, custom `footer` |
| `Drawer` | `placement`: `left` · `right` · `top` · `bottom` (sheet with a grabber) |
| `Tooltip`, `Popover`, `Popconfirm` | Placements flip automatically. `Popconfirm` accepts an async `onConfirm` |
| `Alert`, `Result` | Inline status messages and full-page results (`success`, `error`, `404`, …) |

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Edit profile</Button>
<Modal open={open} onClose={() => setOpen(false)} title="Edit profile" onOk={save} okText="Save">
  <Input data-autofocus defaultValue="Liquid" />
</Modal>
```

Add `data-autofocus` to the element that should get focus when a Modal or Drawer opens.

## Imperative APIs

These work like Ant Design's. They render into their own root, follow the active `ConfigProvider` theme and locale, and need no extra setup.

```ts
import { message, notification, confirm } from 'react-liquis-glass';

message.success('Saved');
message.error('Something went wrong');
const close = message.loading('Uploading…');   // returns a function that closes it
close();

notification.info({
  title: 'New message',
  description: 'Anna: love the new glass!',
  placement: 'bottomRight',   // top | topLeft | topRight | bottom | bottomLeft | bottomRight
});

confirm({
  title: 'Delete project?',
  content: 'This cannot be undone.',
  okText: 'Delete',
  okDanger: true,
  onOk: () => api.deleteProject(),   // return a promise to show a loading OK button
});
confirm.success({ title: 'Payment received' });
```

## Icons

```tsx
import { HomeIcon, LoadingIcon, allIcons, createIcon, type IconName } from 'react-liquis-glass/icons';

<HomeIcon />                                      {/* 1em, currentColor */}
<HomeIcon size={24} strokeWidth={1.5} color="var(--lg-accent)" />
<LoadingIcon spin />
<HomeIcon title="Home" />                         {/* labelled for screen readers */}
```

| Prop | Default | Description |
| --- | --- | --- |
| `size` | `1em` | Width and height |
| `color` | `currentColor` | Stroke color |
| `strokeWidth` | `1.8` | Line weight |
| `spin` | `false` | Rotate continuously |
| `title` | none | Accessible label. Without it the icon is `aria-hidden` |

**Custom icons.** `createIcon` takes the markup inside a 24×24 SVG:

```tsx
export const LotusIcon = createIcon('Lotus', '<path d="M12 21c-4-2-7-5-7-9 3 0 5 2 7 5 2-3 4-5 7-5 0 4-3 7-7 9z"/>');
```

**All 139 icons:**

`HomeIcon` · `MenuIcon` · `MoreHorizontalIcon` · `MoreVerticalIcon` · `ChevronDownIcon` · `ChevronUpIcon` · `ChevronLeftIcon` · `ChevronRightIcon` · `ChevronsLeftIcon` · `ChevronsRightIcon` · `ArrowLeftIcon` · `ArrowRightIcon` · `ArrowUpIcon` · `ArrowDownIcon` · `ExternalLinkIcon` · `MaximizeIcon` · `MinimizeIcon` · `UndoIcon` · `RedoIcon` · `RefreshIcon` · `LogInIcon` · `LogOutIcon` · `GripVerticalIcon` · `SearchIcon` · `ZoomInIcon` · `ZoomOutIcon` · `CloseIcon` · `CheckIcon` · `PlusIcon` · `MinusIcon` · `EditIcon` · `TrashIcon` · `CopyIcon` · `SaveIcon` · `DownloadIcon` · `UploadIcon` · `ShareIcon` · `LinkIcon` · `PaperclipIcon` · `FilterIcon` · `SortIcon` · `SlidersIcon` · `SettingsIcon` · `EyeIcon` · `EyeOffIcon` · `LockIcon` · `UnlockIcon` · `KeyIcon` · `SendIcon` · `LoadingIcon` · `PrinterIcon` · `InfoIcon` · `AlertCircleIcon` · `CheckCircleIcon` · `CloseCircleIcon` · `QuestionCircleIcon` · `WarningIcon` · `InfoFilledIcon` · `CheckCircleFilledIcon` · `CloseCircleFilledIcon` · `WarningFilledIcon` · `PlusCircleIcon` · `MinusCircleIcon` · `CheckSquareIcon` · `SquareIcon` · `CircleIcon` · `UserIcon` · `UsersIcon` · `UserPlusIcon` · `MailIcon` · `PhoneIcon` · `MessageCircleIcon` · `MessageSquareIcon` · `BellIcon` · `InboxIcon` · `AtSignIcon` · `HeartIcon` · `HeartFilledIcon` · `StarIcon` · `StarFilledIcon` · `ThumbsUpIcon` · `SmileIcon` · `ImageIcon` · `CameraIcon` · `VideoIcon` · `MusicIcon` · `MicIcon` · `PlayIcon` · `PauseIcon` · `StopIcon` · `VolumeUpIcon` · `VolumeOffIcon` · `FileIcon` · `FileTextIcon` · `FolderIcon` · `BookIcon` · `BookmarkIcon` · `ArchiveIcon` · `CloudIcon` · `CloudUploadIcon` · `ShoppingCartIcon` · `ShoppingBagIcon` · `CreditCardIcon` · `WalletIcon` · `GiftIcon` · `TagIcon` · `FlagIcon` · `BriefcaseIcon` · `BoxIcon` · `LayersIcon` · `CalendarIcon` · `ClockIcon` · `MapPinIcon` · `GlobeIcon` · `CompassIcon` · `GridIcon` · `ListIcon` · `DashboardIcon` · `BarChartIcon` · `PieChartIcon` · `TrendingUpIcon` · `TrendingDownIcon` · `ActivityIcon` · `CodeIcon` · `TerminalIcon` · `DatabaseIcon` · `WifiIcon` · `BatteryIcon` · `ShieldIcon` · `ShieldCheckIcon` · `SunIcon` · `MoonIcon` · `DropletIcon` · `SparklesIcon` · `ZapIcon` · `FireIcon` · `AwardIcon` · `RocketIcon` · `PaletteIcon`

Import icons one by one (`import { HomeIcon } …`) so bundlers can tree-shake them. Import `allIcons` only when you really need every icon, for example for an icon picker.

## TypeScript

Every component exports its props type (`ButtonProps`, `SelectProps`, `TableColumn<T>`, …). Some helpful ones:

```ts
import type { Locale, ThemeMode, TableColumn, SelectOption, TreeNode, CascaderOption, MenuItem } from 'react-liquis-glass';
import type { IconProps, IconName } from 'react-liquis-glass/icons';
```

`Select` and `Table` are generic, so `value`, `onChange`, `render` and `rowKey` are typed from your data.

## Accessibility

- Proper roles and ARIA state on interactive components: `combobox` / `listbox`, `tablist`, `switch`, `slider`, `dialog`, `menu`, `tree`, `radiogroup`.
- Keyboard support: arrow keys in Select, Menu, Dropdown, Tabs, Tree, Slider and InputNumber; Enter / Space to activate; Esc to close overlays.
- Modal and Drawer trap focus and return it to the trigger when they close.
- Visible `:focus-visible` rings in the accent color.
- aria-labels come from the active `locale`. `Progress`, `Tabs` and `Segmented` take your own `aria-label` / `aria-labelledby`.
- `Button` with `as` or `href` and `disabled` can't be clicked or reached with Tab.

## Browser support

The glass effect uses `backdrop-filter`, which works in all current Chrome, Edge, Safari (15.4+) and Firefox (103+). Older browsers fall back to a more opaque solid fill.

The optional `refraction` effect uses an SVG filter inside `backdrop-filter`. Only Chromium-based browsers render it; others show regular glass.

## FAQ

**My components look flat and grey.**
There's nothing colorful behind them. Glass needs a background to blur. See [Quick start, step 3](#quick-start).

**Do I need Tailwind or a CSS-in-JS library?**
No. Import `react-liquis-glass/styles.css` once. It works next to Tailwind, CSS Modules or anything else.

**How do I change one component's look?**
Every element has a stable `lg-*` class (`lg-btn`, `lg-card`, `lg-modal`…) and every component accepts `className` and `style`. Override the class, or set CSS variables on a wrapper.

**Dark mode that follows the OS?**
```tsx
const dark = useMediaQuery('(prefers-color-scheme: dark)');
<ConfigProvider theme={dark ? 'dark' : 'light'}>…</ConfigProvider>
```

**Is it safe to render on the server?**
Yes. Components render to HTML on the server. Browser-only work (measuring popups, toasts, timers) runs in effects or event handlers.

## Development

```bash
git clone https://github.com/ductt92/react-liquis-glass.git
cd react-liquis-glass
npm install
npm run storybook     # playground at http://localhost:6006 (toolbar: theme, wallpaper, locale)
npm run typecheck
npm run build         # dist/ via tsup: ESM, CJS, .d.ts and styles.css
npm run deploy-storybook   # build Storybook and publish it to GitHub Pages (gh-pages branch)
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the project layout and conventions, and [CHANGELOG.md](./CHANGELOG.md) for release notes.

## License

[MIT](./LICENSE)
