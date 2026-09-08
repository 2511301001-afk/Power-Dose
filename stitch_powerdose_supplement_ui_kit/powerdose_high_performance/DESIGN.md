---
name: PowerDose High-Performance
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d0c6ab'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#999077'
  outline-variant: '#4d4632'
  surface-tint: '#ebc300'
  primary: '#fff3d6'
  on-primary: '#3b2f00'
  primary-container: '#ffd400'
  on-primary-container: '#705c00'
  inverse-primary: '#715d00'
  secondary: '#c9c6c5'
  on-secondary: '#313030'
  secondary-container: '#4a4949'
  on-secondary-container: '#bab8b7'
  tertiary: '#f7f3f3'
  on-tertiary: '#303030'
  tertiary-container: '#dad7d7'
  on-tertiary-container: '#5e5d5d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe177'
  primary-fixed-dim: '#ebc300'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#554500'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c9c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1b1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-xl:
    fontFamily: Anton
    fontSize: 96px
    fontWeight: '400'
    lineHeight: 90px
  headline-lg:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 32px
  headline-md:
    fontFamily: Anton
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1280px
---

## Brand & Style
The design system is built for an aggressive, high-energy e-commerce experience. It targets athletes and high-performers who value intensity and premium quality. The style is **High-Contrast / Bold** with a focus on raw power and athletic precision. 

The UI utilizes a dark, immersive environment to make the vibrant yellow accents feel like concentrated energy. Layouts should feel massive and uncompromising, using heavy typography and sharp, intentional spacing to evoke a sense of strength and urgency.

## Colors
This design system operates exclusively in a dark mode environment to maximize the impact of its high-visibility accents.

- **Primary (Electric Yellow):** Used for all primary actions, critical highlights, and brand emphasis. It represents energy and performance.
- **Secondary (Obsidian):** The deep base layer. Provides a high-contrast foundation for the yellow elements.
- **Tertiary (Charcoal/Zinc):** Used for structural elements like cards, input fields, and panels to create depth without sacrificing the dark aesthetic.
- **Surface Accents:** Use `#2A2A2A` for hover states on dark surfaces and subtle borders.

## Typography
Typography is the primary driver of the brand's "aggressive" personality. 

**Headlines** must always be set in all-caps. Use `display-xl` for hero sections and product launches to create an unavoidable visual impact. Tight line-heights are essential to maintain the "condensed" and powerful look.

**Body Text** uses a systematic sans-serif to ensure legibility against dark backgrounds. Use a slightly higher line-height for body text to prevent fatigue in an otherwise high-intensity UI. 

**Emphasis:** Use the Primary Yellow color for keywords within headlines or for specific labels to draw the eye immediately.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a heavy industrial rhythm. 

- **Desktop:** 12-column grid with wide 24px gutters. Use large vertical padding (80px+) between sections to allow the bold typography "room to breathe."
- **Mobile:** 4-column grid. Margins are kept tight (20px) to maximize content width for high-impact imagery and large text.
- **Alignment:** Content should feel structured and rigid. Avoid staggered or "soft" layouts; favor blocks and strong horizontal/vertical lines.

## Elevation & Depth
This design system rejects traditional shadows in favor of **Tonal Layers** and **High-Contrast Outlines**.

- **Level 0 (Background):** `#0A0A0A` - The infinite base.
- **Level 1 (Cards/Panels):** `#121212` - Subtle elevation for product grids and content containers.
- **Level 2 (Interactions):** `#1E1E1E` - Highest surface elevation, used for popovers or active card states.
- **Borders:** Use 1px solid borders in `#2A2A2A` to define shapes. For active states, switch the border to the Primary Yellow.
- **Gradients:** Use "Energy Gradients" (Yellow to Transparent or Black to Dark Grey) to create directional flow without using realistic shadows.

## Shapes
The shape language is **Sharp**. Rounded corners are avoided to maintain an aggressive, athletic, and technical aesthetic. Every element—from buttons to input fields to product cards—should feature 90-degree angles to reinforce the "Power" narrative.

## Components

### Buttons
- **Primary:** Solid Primary Yellow (`#FFD400`) background with black (`#0A0A0A`) text. All-caps, bold. No border.
- **Secondary:** Transparent background with a 2px Primary Yellow border and Primary Yellow text.
- **States:** On hover, primary buttons should slightly shift to a lighter yellow or implement a subtle "glitch" or scale-up effect (1.02x).

### Product Cards
- Background: `#121212`. 
- Border: 1px solid `#1E1E1E`. 
- Content: The product name should use the `headline-md` style. Prices should be highlighted in Primary Yellow.
- Placeholders: Use dark-grey-to-black diagonal stripe patterns or yellow-to-black radial gradients for product images.

### Input Fields
- Background: `#1E1E1E`.
- Border: 1px solid `#2A2A2A`.
- Active State: Border changes to Primary Yellow with a 0.5px "glow" (stroke only, no soft shadow).

### Chips & Badges
- Used for "High Protein," "In Stock," or "New."
- Style: Black background, Primary Yellow border, Primary Yellow text, `label-bold` typography.

### Progress Bars / Gauges
- Crucial for "Supplement Facts" or "Dose Intensity."
- Track: `#1E1E1E`.
- Indicator: Solid Primary Yellow. Use segmented blocks (e.g., 10 small rectangles) instead of a smooth continuous bar to look more technical.