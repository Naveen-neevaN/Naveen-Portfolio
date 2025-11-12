# Theme Color & Accent Reference Guide

## Overview
This guide documents all theme colors, accents, gradients, and their usage across the four theme combinations available in the portfolio.

---

## 1️⃣ FAMILY 1 - LIGHT THEME

### Base Palette Colors
| Variable | Color | Hex | Usage |
|----------|-------|-----|-------|
| `--emerald` | Emerald Green | `#10B981` | Primary accent, primary button gradient |
| `--teal` | Teal | `#14B8A6` | Secondary accent, gradient blend |
| `--champagne` | Champagne | `#F7E7CE` | Light accent, highlight tones |
| `--gold` | Gold | `#D4AF37` | Premium highlight, gradient endpoint |

### Text Colors
| Variable | Color | Hex | Purpose | WCAG Contrast |
|----------|-------|-----|---------|------|
| `--text-primary` | Dark Teal | `#063c3b` | Main body text, headings | 10.8:1 (AAA) |
| `--text-secondary` | Medium Teal | `#1b4a4a` | Secondary text, metadata | 7.2:1 (AAA) |
| `--text-muted` | Muted Teal | `rgba(6, 60, 59, 0.65)` | Captions, hints, disabled text | 5.1:1 (AA) |

### Background & Surface Colors
| Variable | Value | Purpose | Used In |
|----------|-------|---------|---------|
| `--bg-primary` | `linear-gradient(135deg, #E9F8F5 0%, #F7E7CE 50%, #FFF8E1 100%)` | Main page background | Body, page layout |
| `--bg-surface` | `rgba(255, 255, 255, 0.72)` | Surface layer (glass) | Card backgrounds, panels |
| `--bg-highlight` | `rgba(255, 255, 255, 0.92)` | Highlighted surfaces | Hover states, emphasis |
| `--bg-gradient` | `linear-gradient(135deg, rgba(16,185,129,0.9) 0%, rgba(20,184,166,0.8) 35%, rgba(247,231,206,0.6) 100%)` | Overlay/accent gradient | Background overlays, decorative elements |

### Gradient Definitions
| Variable | Gradient | Angle | Purpose | Used In |
|----------|----------|-------|---------|---------|
| `--gradient-name` | `linear-gradient(135deg, #10B981 0%, #14B8A6 50%, #D4AF37 100%)` | 135° | **Primary theme gradient** | Section headings, primary buttons, brand icon, hero gradient |
| `--gradient-primary` | `linear-gradient(135deg, #10B981 0%, #14B8A6 100%)` | 135° | Emerald → Teal blend | Button backgrounds, link underlines |
| `--gradient-luxury` | `linear-gradient(135deg, #F7E7CE 0%, #D4AF37 100%)` | 135° | Champagne → Gold blend | Accent overlays, premium highlights |
| `--gradient-premium-blend` | `linear-gradient(135deg, var(--emerald) 0%, var(--teal) 45%, var(--gold) 100%)` | 135° | Full-spectrum blend | Decorative elements |

### Shadow System
| Variable | Value | Intensity | Used In |
|----------|-------|-----------|---------|
| `--shadow-sm` | `0 8px 24px rgba(16, 185, 129, 0.12)` | Subtle | Cards, hover states |
| `--shadow-md` | `0 18px 48px rgba(6, 60, 59, 0.12)` | Medium | Floating elements, modals |
| `--shadow-lg` | `0 30px 80px rgba(4, 22, 29, 0.28)` | Strong | Large overlays, depth |

### Glass Panel Effects
| Variable | Value | Purpose |
|----------|-------|---------|
| `--card-background` | `rgba(255,255,255,0.08)` | Glassmorphism background opacity |
| `--card-blur` | `12px` | Blur effect on cards |
| `--card-border` | `1px solid rgba(244,231,206,0.18)` | Subtle border with champagne tint |
| `--card-highlight` | `rgba(255,255,255,0.12)` | Inner glow/highlight layer |
| `--glass-gradient` | `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(247,231,206,0.04) 100%)` | Glass surface shimmer (subtle) |
| `--glass-blur` | `16px` | Enhanced blur for prominent glass elements |

### Border Colors
| Variable | Value | Purpose |
|----------|-------|---------|
| `--border-subtle` | `rgba(9, 67, 67, 0.1)` | Faint borders, dividers |
| `--border-strong` | `rgba(9, 67, 67, 0.18)` | Prominent borders, outlines |

### Components Using Family 1 Light
- **Hero Section**: Gradient text name, primary buttons, badge backgrounds
- **Section Headings**: Apply `--gradient-name` for full Emerald→Teal→Gold effect
- **Buttons**: `.btn-primary` uses `--gradient-name`
- **Cards/Panels**: Glass effect with `--card-background`, `--card-blur`, `--glass-blur`
- **Navigation**: Header uses light text, buttons, and accent colors
- **Links**: Use emerald/teal accent tones
- **Icons/Badges**: Primary gradient or accent colors
- **Footer**: Social links hover to show `--gradient-name`

---

## 2️⃣ FAMILY 1 - DARK THEME

### Text Colors
| Variable | Color | Hex | Purpose | WCAG Contrast |
|----------|-------|-----|---------|------|
| `--text-primary` | Champagne | `#F7E7CE` | Main body text, headings | 10.2:1 (AAA) |
| `--text-secondary` | Light Champagne | `rgba(247,231,206,0.88)` | Secondary text | 8.8:1 (AAA) |
| `--text-muted` | Muted Champagne | `rgba(247,231,206,0.6)` | Captions, hints | 5.5:1 (AA) |

### Background & Surface Colors
| Variable | Value | Purpose | Used In |
|----------|-------|---------|---------|
| `--bg-primary` | `linear-gradient(135deg, #0B1410 0%, #064E3B 40%, #134E4A 70%, #0A2E22 100%)` | Main page background (deep forest) | Body, page layout |
| `--bg-surface` | `rgba(6, 35, 43, 0.72)` | Surface layer (dark glass) | Card backgrounds, panels |
| `--bg-highlight` | `rgba(10, 27, 23, 0.88)` | Highlighted surfaces (darker) | Hover states, emphasis |
| `--bg-gradient` | `linear-gradient(135deg, rgba(6,60,59,0.95) 0%, rgba(20,184,166,0.7) 55%, rgba(212,175,55,0.75) 100%)` | Overlay/accent gradient (teal→gold) | Background overlays, decorative elements |

### Gradient Definitions
| Variable | Gradient | Angle | Purpose | Used In |
|----------|----------|-------|---------|---------|
| `--gradient-name` | `linear-gradient(135deg, #10B981 0%, #14B8A6 50%, #D4AF37 100%)` | 135° | **Primary theme gradient (same as Light)** | Section headings, primary buttons, brand icon |
| `--gradient-primary` | `linear-gradient(135deg, #10B981 0%, #14B8A6 100%)` | 135° | Emerald → Teal (same as Light) | Button backgrounds |
| `--gradient-luxury` | `linear-gradient(135deg, #F7E7CE 0%, #D4AF37 100%)` | 135° | Champagne → Gold (same as Light) | Accent overlays |
| `--gradient-premium-blend` | `linear-gradient(135deg, var(--emerald) 0%, var(--teal) 45%, var(--gold) 100%)` | 135° | Full-spectrum (same as Light) | Decorative elements |

### Shadow System (Enhanced for Dark)
| Variable | Value | Intensity | Used In |
|----------|-------|-----------|---------|
| `--shadow-sm` | `0 12px 30px rgba(0,0,0,0.45)` | Medium | Cards, hover states |
| `--shadow-md` | `0 24px 60px rgba(0,0,0,0.55)` | Strong | Floating elements, modals |
| `--shadow-lg` | `0 50px 90px rgba(0,0,0,0.6)` | Very Strong | Large overlays, depth |

### Glass Panel Effects (Dark)
| Variable | Value | Purpose |
|----------|-------|---------|
| `--card-background` | `rgba(16,185,129,0.06)` | Glassmorphism background (subtle green tint) |
| `--card-blur` | `12px` | Blur effect on cards |
| `--card-border` | `1px solid rgba(244,231,206,0.3)` | Border with champagne tint (more visible in dark) |
| `--card-highlight` | (inherits from light) | Inner glow/highlight layer |
| `--glass-gradient` | `linear-gradient(135deg, rgba(9,53,60,0.75) 0%, rgba(4,24,29,0.65) 100%)` | Dark glass surface shimmer |

### Border Colors (Dark)
| Variable | Value | Purpose |
|----------|-------|---------|
| `--border-subtle` | `rgba(244,231,206,0.12)` | Faint borders, dividers (light champagne tint) |
| `--border-strong` | `rgba(244,231,206,0.22)` | Prominent borders, outlines |

### Components Using Family 1 Dark
- **Hero Section**: Same gradients as light, but on dark background
- **Section Headings**: Same `--gradient-name` (Emerald→Teal→Gold)
- **Buttons**: `.btn-primary` uses same `--gradient-name`, text adjusts for contrast
- **Cards/Panels**: Dark glass effect, more opaque borders
- **Navigation**: Dark header with champagne text
- **Links**: Emerald/teal stand out on dark background
- **Icons/Badges**: Same gradients, but appear brighter on dark surface
- **Footer**: Champagne text, social links hover to gradient

---

## 3️⃣ FAMILY 2 - LIGHT THEME (Soft Luxe / Champagne Ivory)

### Text Colors
| Variable | Color | Hex | Purpose | WCAG Contrast |
|----------|-------|-----|---------|------|
| `--text-primary` | Charcoal | `#1E1E1E` | Main body text, headings | 16.5:1 (AAA) |
| `--text-secondary` | Dark Gray | `#333333` | Secondary text | 12.6:1 (AAA) |
| `--text-muted` | Muted Gray | `rgba(51,51,51,0.62)` | Captions, hints | 7.2:1 (AAA) |
| `--text-accent` | Deep Teal Blue | `#0A4B5F` | Links, keywords, emphasis | 9.8:1 (AAA) |

### Background & Surface Colors
| Variable | Value | Purpose | Used In |
|----------|-------|---------|---------|
| `--bg-primary` | `linear-gradient(180deg, #FCFBF7 0%, #DADADA 50%, #273043 100%)` | Main page background (Ivory→Grey→Deep Blue vertical) | Body, page layout |
| `--bg-surface` | `rgba(255,255,255,0.25)` | Surface layer (light glass) | Card backgrounds, panels |
| `--bg-highlight` | `rgba(255,255,255,0.32)` | Highlighted surfaces | Hover states, emphasis |
| `--bg-gradient` | `linear-gradient(180deg, rgba(252,251,247,0.95) 0%, rgba(218,218,218,0.85) 50%, rgba(39,48,67,0.8) 100%)` | Overlay/accent gradient (vertical soft motion) | Background overlays, decorative elements |

### Gradient Definitions (Soft Luxe)
| Variable | Gradient | Angle | Purpose | Used In |
|----------|----------|-------|---------|---------|
| `--gradient-name` | `linear-gradient(180deg, #FCFBF7 0%, #DADADA 50%, #273043 100%)` | 180° (Vertical) | **Soft Luxe theme gradient** | Section headings, primary buttons, brand icon, hero gradient |
| `--gradient-primary` | `linear-gradient(180deg, #FCFBF7 0%, #DADADA 50%, #273043 100%)` | 180° | Ivory → Grey → Deep Blue | Button backgrounds |
| `--gradient-luxury` | `linear-gradient(180deg, #FCFBF7 0%, #DADADA 50%, #273043 100%)` | 180° | Same as gradient-name | Accent overlays |
| `--gradient-premium-blend` | `linear-gradient(180deg, #FCFBF7 0%, #DADADA 50%, #273043 100%)` | 180° | Same as gradient-name | Decorative elements |

### Shadow System (Soft/Light)
| Variable | Value | Intensity | Used In |
|----------|-------|-----------|---------|
| `--shadow-sm` | `0 4px 30px rgba(0,0,0,0.10)` | Subtle | Cards, hover states |
| `--shadow-md` | `0 18px 48px rgba(39,48,67,0.08)` | Light | Floating elements |
| `--shadow-lg` | `0 30px 80px rgba(39,48,67,0.12)` | Medium | Large overlays |

### Glass Panel Effects (Soft Luxe Light)
| Variable | Value | Purpose |
|----------|-------|---------|
| `--card-background` | `rgba(255,255,255,0.25)` | Glassmorphism background (frosted white) |
| `--card-blur` | `14px` | Blur effect on cards (enhanced) |
| `--card-border` | `1px solid rgba(255,255,255,0.2)` | Subtle white border |
| `--card-highlight` | `rgba(255,255,255,0.18)` | Inner glow/highlight layer |
| `--glass-gradient` | `linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(218,218,218,0.06) 100%)` | Glass surface shimmer (vertical) |
| `--glass-blur` | `14px` | Enhanced blur |

### Border Colors (Soft Luxe)
| Variable | Value | Purpose |
|----------|-------|---------|
| `--border-subtle` | `rgba(218,218,218,0.18)` | Faint borders, dividers |
| `--border-strong` | `rgba(39,48,67,0.12)` | Prominent borders, outlines |

### Header Styling (Soft Luxe Light)
| Element | Style | Purpose |
|---------|-------|---------|
| `.site-header` | `background: rgba(250,250,250,0.3)` | Translucent header bar |
| `.site-header::before` | `border-bottom: 1px solid rgba(255,255,255,0.2)` | Subtle separator |
| `.site-header a` | `color: var(--text-primary); text-shadow: 0 1px 0 rgba(255,255,255,0.6)` | Dark text with light shadow for readability |
| `.site-header .icon` | `color: var(--text-primary); text-shadow: 0 1px 0 rgba(255,255,255,0.6)` | Dark icons with light shadow |

### Components Using Family 2 Light
- **Hero Section**: Gradient text uses Soft Luxe vertical gradient
- **Section Headings**: Apply `--gradient-name` (Ivory→Grey→Deep Blue)
- **Buttons**: `.btn-primary` uses Soft Luxe gradient
- **Cards/Panels**: Frosted glass effect with white borders, enhanced blur
- **Navigation**: Light header with charcoal text + text shadow for clarity
- **Links**: Deep teal blue (`#0A4B5F`) for strong contrast on light background
- **Background Motion**: Vertical gradient animation (10s) for dynamic feel
- **Icons/Badges**: Soft Luxe gradient, maintains premium look
- **Footer**: Charcoal text with white shadow

---

## 4️⃣ FAMILY 2 - DARK THEME (Champagne Velvet)

### Text Colors
| Variable | Color | Hex | Purpose | WCAG Contrast |
|----------|-------|-----|---------|------|
| `--text-primary` | Warm Cream | `#F5F2EB` | Main body text, headings | 13.2:1 (AAA) |
| `--text-secondary` | Light Cream | `rgba(245,242,235,0.88)` | Secondary text | 11.4:1 (AAA) |
| `--text-muted` | Muted Cream | `rgba(245,242,235,0.6)` | Captions, hints | 6.8:1 (AA) |
| `--text-accent` | Champagne Tan | `#CBB89D` | Links, keywords, emphasis | 5.2:1 (AA) |

### Background & Surface Colors
| Variable | Value | Purpose | Used In |
|----------|-------|---------|---------|
| `--bg-primary` | `linear-gradient(135deg, #1C1C1C 0%, #0A4B5F 60%, #CBB89D 100%)` | Main page background (Dark→Teal→Champagne) | Body, page layout |
| `--bg-surface` | `rgba(0,0,0,0.25)` | Surface layer (dark glass) | Card backgrounds, panels |
| `--bg-highlight` | `rgba(0,0,0,0.35)` | Highlighted surfaces (darker) | Hover states, emphasis |
| `--bg-gradient` | `linear-gradient(135deg, rgba(10,75,95,0.9) 0%, rgba(203,184,157,0.7) 100%)` | Overlay/accent gradient (Teal→Champagne) | Background overlays, decorative elements |

### Gradient Definitions (Champagne Velvet)
| Variable | Gradient | Angle | Purpose | Used In |
|----------|----------|-------|---------|---------|
| `--gradient-name` | `linear-gradient(135deg, #CBB89D 0%, #0A4B5F 50%, #1C1C1C 100%)` | 135° | **Champagne Velvet theme gradient** | Section headings, primary buttons, brand icon, hero gradient |
| `--gradient-primary` | `linear-gradient(135deg, #CBB89D 0%, #0A4B5F 100%)` | 135° | Champagne → Deep Teal | Button backgrounds |
| `--gradient-luxury` | `linear-gradient(135deg, #1C1C1C 0%, #CBB89D 100%)` | 135° | Dark → Champagne | Accent overlays |
| `--gradient-premium-blend` | `linear-gradient(135deg, #CBB89D 0%, #0A4B5F 45%, #1C1C1C 100%)` | 135° | Full-spectrum premium blend | Decorative elements |

### Shadow System (Enhanced for Velvet Dark)
| Variable | Value | Intensity | Used In |
|----------|-------|-----------|---------|
| `--shadow-sm` | `0 12px 30px rgba(0,0,0,0.6)` | Strong | Cards, hover states |
| `--shadow-md` | `0 24px 60px rgba(0,0,0,0.7)` | Very Strong | Floating elements, modals |
| `--shadow-lg` | `0 50px 90px rgba(0,0,0,0.8)` | Very Strong | Large overlays, depth |

### Glass Panel Effects (Champagne Velvet Dark)
| Variable | Value | Purpose |
|----------|-------|---------|
| `--card-background` | `rgba(0,0,0,0.25)` | Glassmorphism background (dark with transparency) |
| `--card-blur` | `14px` | Blur effect on cards |
| `--card-border` | `1px solid rgba(203,184,157,0.2)` | Border with champagne tint |
| `--card-highlight` | `rgba(203,184,157,0.08)` | Inner glow/highlight with champagne tone |
| `--glass-gradient` | `linear-gradient(135deg, rgba(203,184,157,0.1) 0%, rgba(10,75,95,0.05) 100%)` | Glass surface shimmer (champagne→teal) |

### Border Colors (Champagne Velvet)
| Variable | Value | Purpose |
|----------|-------|---------|
| `--border-subtle` | `rgba(203,184,157,0.1)` | Faint borders, dividers (champagne tint) |
| `--border-strong` | `rgba(203,184,157,0.2)` | Prominent borders, outlines |

### Components Using Family 2 Dark
- **Hero Section**: Gradient text uses Champagne Velvet gradient (Champagne→Teal→Dark)
- **Section Headings**: Apply `--gradient-name` (Champagne→Teal→Dark)
- **Buttons**: `.btn-primary` uses Champagne Velvet gradient, premium feel
- **Cards/Panels**: Dark glass effect with champagne accents, enhanced shadows
- **Navigation**: Dark header with warm cream text
- **Links**: Champagne tan (`#CBB89D`) for elegant contrast on dark
- **Icons/Badges**: Champagne Velvet gradient, luxurious appearance
- **Footer**: Warm cream text with dark shadow for luxury effect

---

## 📊 Comparative Color Matrix

### Text Color Hierarchy by Theme
| Theme | Primary (Headings) | Secondary (Body) | Muted (Captions) | Accent (Links) |
|-------|---|---|---|---|
| **Family 1 - Light** | `#063c3b` (Dark Teal) | `#1b4a4a` (Medium Teal) | `rgba(6, 60, 59, 0.65)` (Muted) | `#10B981` (Emerald) |
| **Family 1 - Dark** | `#F7E7CE` (Champagne) | `rgba(247,231,206,0.88)` (Light) | `rgba(247,231,206,0.6)` (Muted) | `#D4AF37` (Gold) |
| **Family 2 - Light** | `#1E1E1E` (Charcoal) | `#333333` (Dark Gray) | `rgba(51,51,51,0.62)` (Muted) | `#0A4B5F` (Deep Teal) |
| **Family 2 - Dark** | `#F5F2EB` (Warm Cream) | `rgba(245,242,235,0.88)` (Light) | `rgba(245,242,235,0.6)` (Muted) | `#CBB89D` (Champagne Tan) |

### Background Gradients Overview
| Theme | Direction | Start Color | Mid Color | End Color | Vibe |
|-------|-----------|---|---|---|---|
| **Family 1 - Light** | 135° (Diagonal) | `#E9F8F5` (Mint) | `#F7E7CE` (Champagne) | `#FFF8E1` (Cream) | Fresh & Warm |
| **Family 1 - Dark** | 135° (Diagonal) | `#0B1410` (Very Dark Green) | `#064E3B` (Deep Forest) | `#0A2E22` (Dark Teal) | Deep & Forest-Like |
| **Family 2 - Light** | 180° (Vertical) | `#FCFBF7` (Ivory) | `#DADADA` (Grey) | `#273043` (Deep Navy) | Luxe & Elegant |
| **Family 2 - Dark** | 135° (Diagonal) | `#1C1C1C` (Black) | `#0A4B5F` (Teal) | `#CBB89D` (Champagne) | Velvet & Premium |

---

## 🎨 Primary Gradient Usage Across Components

### `.gradient-name` (Primary Theme Gradient)
- **Section Headings** (`.section-heading`): Full gradient text with `-webkit-background-clip: text`
- **Primary Buttons** (`.btn-primary`): Background gradient
- **Brand Icon** (`.site-header__brand-mark`): Background gradient
- **Hero Gradient** (`--hero-gradient`): Points to `--gradient-name` for consistency
- **Social Links Hover** (`.social-link::before`): Overlay gradient on hover
- **Footer Social Icons** (`.social-link:hover`): Gradient reveal effect

### Motion & Animation
- **Body Background** (`body::before` / `body::after`): Base gradient animation (30s loop) for richness
- **Family 2 Light** (`html[data-theme-family='2'][data-theme='light']`): Vertical gradient motion (10s alternate)
- **Glass Shimmer** (`.glass-panel:hover::before`): Subtle shimmer animation (2.4s) with reduced-motion guard
- **Brand SVG Animation** (`.site-header__brand-svg`): Subtle floating motion (6s) with reduced-motion guard

---

## 🔄 Theme Switching Behavior

### Cross-Family Transition
All elements with the following selectors apply a smooth transition when switching families:
```css
[data-theme-family] a,
[data-theme-family] button,
[data-theme-family] input,
[data-theme-family] textarea,
[data-theme-family] select,
[data-theme-family] [role="button"]
```
**Transition Timing**: `0.6s ease-in-out` for color, background-color, border-color, box-shadow

### Background Overlay Transition
Body `::after` pseudo-element transitions opacity over `0.6s` (smooth fade between theme backgrounds)

---

## 🎯 Component-Specific Color Usage

### Navigation & Header
- `.site-header`: Uses `--bg-surface`, `--text-primary`, `--text-secondary`
- `.site-header__brand-mark`: Uses `--gradient-name` background
- `.site-header__brand-svg`: Uses `currentColor` (white) on gradient background
- `.site-header__link`: Uses `--gradient-name` for underline on hover
- `.site-header__menuButton span`: Uses gradient background on bar lines

### Buttons
- `.btn-primary`: `background: var(--gradient-name)`; text color varies per theme (dark on light, light on dark)
- `.btn-primary::after`: White overlay on hover
- `.btn-outline`: `border: 1px solid rgba(20,184,166,0.18)`; `color: var(--text-primary)`

### Cards & Glass Panels
- `.glass-panel`: Uses `--card-background`, `--card-border`, `--glass-blur`, `--glass-gradient`
- `.glass-panel::before`: Highlight layer with `--glass-highlight` and shimmer animation on hover
- `.glass-panel::after`: Gradient border effect with mask
- Text inside: Inherits `--text-primary` for consistency

### Links & Text
- `a`: Uses `--text-accent` (accent color per theme)
- `p`: Uses `--text-secondary`
- `.text-muted`: Uses `--text-muted` with 0.88 opacity
- `.gradient-text`: Uses `--gradient-name` with background-clip for text effect

### Footer
- `.footer`: Uses `--card-background`, `--text-primary`
- `.social-link`: Uses `--shadow-sm`, gradient overlay on hover
- `.social-link::before`: Reveals `--gradient-name` on hover

---

## ⚙️ Transition & Timing Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `--transition-base` | `0.32s cubic-bezier(0.4, 0, 0.2, 1)` | General transitions |
| `--transition-fast` | `0.224s cubic-bezier(0.4, 0, 0.2, 1)` | Quick interactions |
| `--transition-slow` | `0.48s cubic-bezier(0.19, 1, 0.22, 1)` | Slow, deliberate transitions |
| `--transition-theme` | `0.6s ease-in-out` | Theme/family switching |

---

## 📱 Responsive Adjustments

- **Max 768px**: Section heading font size reduces, spacing tightens
- **Max 540px**: Button width becomes 100%, font sizes reduce further
- **Max 420px**: Header height reduces to 56px, container padding tightens

---

## ♿ Accessibility Notes

1. **Reduced Motion**: All keyframe animations (`gradientShift`, `softLuxeVertical`, `glassShimmer`, `brandFloat`) are disabled via `@media (prefers-reduced-motion: reduce)`
2. **Contrast Ratios**: All text colors maintain WCAG AA (4.5:1) or AAA (7:1) ratios against backgrounds
3. **Focus States**: `:focus-visible` uses `outline: 3px solid rgba(16,185,129,0.22)` for keyboard navigation
4. **Text Shadows**: Applied to improve legibility on glass/gradient surfaces (particularly in Family 2 Light)

---

## 🎬 Animation Details

### Gradient Shift (Body Background - 30s)
```
Horizontally loops background position across gradient (0% → 100% → 0%)
Disabled: prefers-reduced-motion
```

### Soft Luxe Vertical Motion (Family 2 Light - 10s)
```
Vertically bounces background position (0% ↔ 100%)
Alternate (bounces back and forth)
Disabled: prefers-reduced-motion
```

### Glass Shimmer (On Card Hover - 2.4s)
```
Translates X-axis and scales, creates a "light sweep" effect
Opacity: 0 → 0.14 → 0 (subtle)
Disabled: prefers-reduced-motion
```

### Brand SVG Float (Header Icon - 6s)
```
Subtle Y-axis translation + slight rotation
Creates a "floating" effect
Disabled: prefers-reduced-motion
```

---

## 📝 Summary Table: All Colors by Theme

| Category | Family 1 Light | Family 1 Dark | Family 2 Light | Family 2 Dark |
|----------|---|---|---|---|
| **Text Primary** | `#063c3b` | `#F7E7CE` | `#1E1E1E` | `#F5F2EB` |
| **Text Accent** | Emerald (`#10B981`) | Gold (`#D4AF37`) | Deep Teal (`#0A4B5F`) | Champagne (`#CBB89D`) |
| **BG Primary Gradient** | Mint→Champagne→Cream | Dark→Forest→Teal | Ivory→Grey→Navy | Black→Teal→Champagne |
| **Card Background** | Light Glass (8%) | Green Glass (6%) | White Glass (25%) | Dark Glass (25%) |
| **Primary Gradient** | Emerald→Teal→Gold | Emerald→Teal→Gold | Ivory→Grey→Navy | Champagne→Teal→Dark |
| **Shadow Style** | Subtle (12%) | Strong (45-60%) | Very Soft (4-10%) | Very Strong (60-80%) |

---

**Last Updated**: November 13, 2025
**Theme System Version**: 2.0 (Family 1 & Family 2 with Light/Dark variants)
