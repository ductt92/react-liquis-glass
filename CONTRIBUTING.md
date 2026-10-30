# Contributing

Thanks for helping improve **react-liquis-glass**!

## Setup

```bash
git clone https://github.com/ductt92/react-liquis-glass.git
cd react-liquis-glass
npm install
npm run storybook   # http://localhost:6006
```

Node 18 or newer is supported.

## Project layout

```
src/
  index.ts              public exports (components, types, locales)
  locale.ts             Locale type + enUS / viVN
  utils/                cx(), useControlled(), presence/scroll-lock/escape hooks, normalizeText()
  icons/                createIcon() + the icon set (entry: react-liquis-glass/icons)
  components/           one file per component group (Button, Input, Select, Pickers, TreeData, …)
  styles/               plain CSS, one file per group, bundled into dist/styles.css by index.css
stories/                Storybook stories, one file per group
.storybook/             Storybook config (theme / wallpaper / locale toolbar)
scripts/                deploy-storybook.sh
```

## Conventions

- **Class names** use the `lg-` prefix. State classes are `lg-active`, `lg-open`, `lg-disabled`, `lg-selected` and so on.
- **Colors, sizes and radii** come from CSS variables in `styles/tokens.css`. Don't hard-code values a theme might want to change.
- **Glass surfaces** use the `lg-glass` class (add `lg-glass-strong` for more opaque glass) rather than repeating `backdrop-filter` rules.
- **Built-in text** (labels, placeholders, aria-labels) comes from `useLocale()`. Add new strings to the `Locale` type and to both `enUS` and `viVN`.
- **Controlled and uncontrolled props** use `useControlled(value, defaultValue, onChange)`.
- **Overlays** (dropdowns, tooltips, pickers) render through `Popup` / `Portal` so they keep the theme and locale.
- **Accessibility:** give interactive parts a role, keyboard support and an aria-label from the locale.
- Every public component exports its `Props` type from `src/index.ts`.

## Before you open a pull request

```bash
npm run typecheck
npm run build
```

Add or update a story for anything visual, and check it in Storybook in both themes and with the Vietnamese locale. Add a line to `CHANGELOG.md` under an "Unreleased" heading.

## Releasing (maintainers)

1. Bump `version` in `package.json` and move the "Unreleased" notes in `CHANGELOG.md` under that version.
2. `npm run build`, then `npm publish --access public`. npm asks for 2FA in the browser.
3. `npm run deploy-storybook` to refresh the live Storybook.
4. Commit, tag (`git tag vX.Y.Z`) and push with tags.
