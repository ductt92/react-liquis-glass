# liquidglass-ui

A React + TypeScript component library with an Apple-style **liquid glass** look. It covers the components you'd expect from Material UI or Ant Design and ships with its own icon set.

- About 50 components: buttons, forms, data display, navigation, overlays and feedback
- 139 stroke icons in `liquidglass-ui/icons` (each one tree-shakeable)
- Light and dark themes, plus design tokens through `ConfigProvider` (accent color, radius, blur, font)
- Fully typed, ESM + CJS, `"use client"` ready for the Next.js App Router
- Plain CSS with CSS variables, so there is no CSS-in-JS runtime

## Install

```bash
npm install liquidglass-ui
```

Requires `react` and `react-dom` 18 or newer.

## Setup

Import the stylesheet once, then wrap your app in `ConfigProvider`:

```tsx
import 'liquidglass-ui/styles.css';
import { ConfigProvider, Button, Card, message } from 'liquidglass-ui';
import { SparklesIcon } from 'liquidglass-ui/icons';

export default function App() {
  return (
    <ConfigProvider theme="light" accent="#0a84ff">
      <Card title="Hello glass">
        <Button variant="filled" color="primary" icon={<SparklesIcon />} onClick={() => message.success('Saved!')}>
          Save
        </Button>
      </Card>
    </ConfigProvider>
  );
}
```

> Glass only looks like glass when something sits behind it. Put a gradient, image or colorful content behind your UI.

## Theming

```tsx
<ConfigProvider
  theme="dark"          // 'light' | 'dark'
  accent="#bf5af2"      // primary color
  radius={16}           // base corner radius (px)
  blur={24}             // backdrop blur (px)
  refraction            // optional SVG refraction effect (Chromium only)
>
  …
</ConfigProvider>
```

Every token is a CSS variable (`--lg-accent`, `--lg-radius`, `--lg-blur`, `--lg-glass-bg`, …), so you can also override them in your own CSS. Put the `lg-glass` class on any element to give it the glass surface.

## Components

| Group | Components |
| --- | --- |
| General | `Button`, `IconButton`, `ButtonGroup`, `Typography` (`Title`, `Text`, `Paragraph`) |
| Layout | `Space`, `Flex`, `Row` / `Col` (24-column grid), `Divider`, `Card` |
| Data entry | `Input`, `Password`, `SearchInput`, `TextArea`, `InputNumber`, `Select`, `Checkbox`, `CheckboxGroup`, `Radio`, `RadioGroup`, `Switch`, `Slider`, `Rate`, `Segmented`, `DatePicker`, `Calendar`, `Upload`, `Form` / `FormItem` |
| Data display | `Avatar`, `AvatarGroup`, `Badge`, `Tag`, `Progress`, `Spin`, `Skeleton`, `Empty`, `Statistic`, `Timeline`, `Descriptions`, `Table`, `List`, `ListItem`, `Collapse` |
| Navigation | `Tabs`, `Breadcrumb`, `Pagination`, `Steps`, `Menu`, `Dropdown`, `NavBar`, `TabBar` |
| Overlays | `Tooltip`, `Popover`, `Popconfirm`, `Modal`, `Drawer` |
| Feedback | `Alert`, `Result`, `message`, `notification` |

Imperative toasts work like antd's:

```ts
message.success('Saved');
const close = message.loading('Uploading…');
notification.info({ title: 'New message', description: 'Hi there!', placement: 'bottomRight' });
```

## Icons

```tsx
import { HomeIcon, SearchIcon, allIcons } from 'liquidglass-ui/icons';

<HomeIcon size={24} strokeWidth={1.8} color="var(--lg-accent)" />
<LoadingIcon spin />
```

Icons default to `1em` and `currentColor`, so they follow the surrounding text. To add your own icon, use `createIcon(name, svgInnerMarkup)`.

## Development

```bash
npm install
npm run storybook   # component playground at http://localhost:6006
npm run build       # builds dist/ with tsup
npm run typecheck
```

## License

MIT
