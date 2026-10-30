# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [0.1.2] - 2026-10-30

### Added
- Full documentation: an English README with setup for Vite and Next.js, theming, localization, every component group, imperative APIs, the icon list, TypeScript notes, accessibility and FAQ. Also a Vietnamese README (`README.vi.md`), this changelog and `CONTRIBUTING.md`.
- A live Storybook on GitHub Pages: https://ductt92.github.io/react-liquis-glass/
- `npm run deploy-storybook` script.

## [0.1.1] - 2026-10-30

First release on npm, as `react-liquis-glass`. The name `liquidglass-ui` was rejected by npm as too similar to an existing package.

### Added
- `ConfigProvider` takes a `locale`. Ships with `viVN` (Vietnamese) and `enUS` (default). Every built-in label, placeholder and aria-label reads from it, including `message`, `notification` and `confirm()`.
- `useLocale()` hook and the `Locale` type, for custom translations.
- Locale switcher in the Storybook toolbar.

### Fixed
- Modal and Drawer focus trap now works on the first open: `[data-autofocus]` gets focus and Tab stays inside the dialog.

## [0.1.0] - 2026-10-30

Initial version, distributed as a local tarball.

### Added
- Liquid glass design tokens and the `lg-glass` surface, light and dark themes, an optional SVG refraction effect.
- More than 80 components:
  - General and layout: Button, Typography, Layout/Sider, Space, Flex, Row/Col, Card, Divider
  - Data entry: Input family, Select, AutoComplete, Checkbox, Radio, Switch, Slider, Rate, Segmented, DatePicker, RangePicker, TimePicker, Calendar, ColorPicker, Cascader, TreeSelect, Transfer, Upload, Form
  - Data display: Table, List, Tree, Collapse, Avatar, Badge, Tag, Progress, Statistic, Countdown, Timeline, Descriptions, Carousel, Image preview, Skeleton, Spin, Empty, Kbd, Watermark
  - Navigation: Tabs, Menu, Dropdown, Breadcrumb, Pagination, Steps, Anchor, NavBar, TabBar, FloatButton, BackTop
  - Overlays and feedback: Modal, Drawer, Tooltip, Popover, Popconfirm, Alert, Result, `message`, `notification`, `confirm`
- 139 stroke icons in `react-liquis-glass/icons`, plus `createIcon`.
- Accent-insensitive search ("ha noi" matches "Hà Nội").
- ESM and CJS builds, TypeScript declarations, a `"use client"` banner, and a Storybook with 47 stories.

[0.1.2]: https://github.com/ductt92/react-liquis-glass/compare/2b7c4b9...v0.1.2
[0.1.1]: https://www.npmjs.com/package/react-liquis-glass/v/0.1.1
[0.1.0]: https://github.com/ductt92/react-liquis-glass/commit/771b4e3
