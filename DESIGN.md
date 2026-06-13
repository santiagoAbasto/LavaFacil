# Design — LavaFácil

## Brand

- **Personality**: Confiable · Profesional · Limpio
- **Register**: Product (app UI with brand landing surface)
- **Tone**: Directo, claro, español, sin jerga técnica

## Palette

```css
/* Light mode */
--color-bg: oklch(1 0 0);                 /* pure white */
--color-surface: oklch(0.97 0.008 260);   /* barely-cool card bg */
--color-surface-hover: oklch(0.94 0.012 260);
--color-ink: oklch(0.12 0.015 260);       /* near-black with cool tint */
--color-muted: oklch(0.45 0.02 260);      /* secondary text, ~5:1 contrast */
--color-border: oklch(0.88 0.01 260);     /* subtle borders */
--color-primary: oklch(0.55 0.19 248);    /* confident blue — trustworthy, clean */
--color-primary-hover: oklch(0.50 0.20 248);
--color-primary-text: oklch(1 0 0);       /* white on primary fills */
--color-accent: oklch(0.55 0.18 185);     /* teal accent — freshness, cleanliness */
--color-accent-hover: oklch(0.50 0.19 185);
--color-danger: oklch(0.55 0.21 30);      /* warm red for destructive actions */
--color-success: oklch(0.55 0.17 150);    /* green for completion states */
--color-warning: oklch(0.65 0.16 85);     /* amber for attention */
```

## Typography

- **Family**: `'Figtree', system-ui, sans-serif` (single family, all weights)
- **Scale**: 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 / 60
- **Leading**: `1.15` headings · `1.6` body
- **Body max-width**: 65ch
- **Headings**: `text-wrap: balance`

## Space

4px grid. Multiples of 4 for all spacing/padding/gaps. Key tokens: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80

## Corners

- `--radius-sm: 6px` — inputs, buttons, small elements
- `--radius-md: 10px` — cards, dialogs, panels
- `--radius-lg: 16px` — large containers, modals
- `--radius-full: 9999px` — pills, badges, tags

## Shadow

- `--shadow-sm: 0 1px 2px oklch(0 0 0 / 0.06)` — subtle
- `--shadow-md: 0 2px 8px oklch(0 0 0 / 0.08)` — cards
- `--shadow-lg: 0 4px 24px oklch(0 0 0 / 0.10)` — modals, dropdowns

## Motion

- **Ease**: `cubic-bezier(0.16, 1, 0.3, 1)` — custom ease-out for all entrances
- **Duration scale**: 150 / 200 / 300 / 400 / 500 / 800ms
- **Page transitions**: fade + translateY(12px) → 0, 300ms
- **Hover**: translateY(-2px), 200ms
- **Tap**: scale(0.97), 150ms
- **Stagger**: 60-80ms between children

## Component Specs

### Buttons
- Padding: `12px 20px` (default), `8px 14px` (sm), `16px 28px` (lg)
- Radius: `--radius-sm`
- Font: 500 weight, 15px
- Transitions: background 200ms, transform 150ms, shadow 200ms
- States: hover (slight lift), active (scale 0.97), disabled (opacity 0.5)

### Inputs
- Padding: `10px 14px`  
- Radius: `--radius-sm`
- Border: `1.5px solid var(--color-border)`, focus: `2px solid var(--color-primary)`
- Label: 14px, 500 weight, 8px gap below
- Error: border + message in danger color
- Transition: border-color 200ms, box-shadow 200ms

### Cards
- Bg: `var(--color-surface)`
- Radius: `--radius-md`
- Shadow: `--shadow-md`
- Padding: 24px
- Hover: shadow-lg + translateY(-2px) — only on interactive cards

### Sidebar (DashboardLayout)
- Width: 260px
- Bg: white
- Nav items: 14px, 500 weight, `--radius-sm` on active/hover
- Active: bg-primary + white text
- Hover: bg-surface-hover

## Dark Mode

- `--color-bg: oklch(0.08 0.008 260)`
- `--color-surface: oklch(0.12 0.012 260)`
- `--color-ink: oklch(0.92 0.01 260)`
- `--color-muted: oklch(0.60 0.015 260)`
- `--color-border: oklch(0.20 0.01 260)`
- Primary and accent maintain same hue, adjusted L for dark bg readability
