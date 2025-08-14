# Button Design System

## Overview
This document describes the consistent button design system implemented across the portfolio website. All buttons now use the unified `Button` component to ensure visual consistency and proper accessibility.

## Button Component

### Import
```tsx
import Button from "./components/Button";
```

### Props
- `variant`: Button style variant (primary, secondary, ghost, danger, success, outline, icon, toggle)
- `size`: Button size (sm, md, lg, xl)
- `theme`: Theme support (light, dark)
- `isActive`: For toggle buttons
- `fullWidth`: Make button full width
- `leftIcon`/`rightIcon`: Icon components
- `disabled`: Disable the button
- All standard HTML button props

## Variants

### Primary
Used for main call-to-action buttons like "Contact Me", "Visit Website", "Watch Video".
```tsx
<Button variant="primary" size="lg" theme={theme}>
  Contact Me
</Button>
```

### Secondary
Used for secondary actions like "Close", "Cancel".
```tsx
<Button variant="secondary" size="md" theme={theme}>
  Close
</Button>
```

### Ghost
Used for subtle actions without heavy visual weight.
```tsx
<Button variant="ghost" size="sm" theme={theme}>
  Learn More
</Button>
```

### Outline
Used for theme toggle and other outlined styles.
```tsx
<Button variant="outline" size="sm" theme={theme}>
  Settings
</Button>
```

### Icon
Used for icon-only buttons like navigation arrows, close buttons.
```tsx
<Button variant="icon" theme={theme}>
  <svg>...</svg>
</Button>
```

### Toggle
Used for toggle states like sort order reversal.
```tsx
<Button 
  variant="toggle" 
  size="sm" 
  theme={theme}
  isActive={reverse}
  onClick={() => setReverse(!reverse)}
>
  {reverse ? 'Reverse' : 'Normal'}
</Button>
```

### Danger
Used for destructive actions (currently available but not used).
```tsx
<Button variant="danger" size="md" theme={theme}>
  Delete
</Button>
```

### Success
Used for positive actions (currently available but not used).
```tsx
<Button variant="success" size="md" theme={theme}>
  Save
</Button>
```

## Sizes
- `sm`: Small buttons (px-2 py-1)
- `md`: Medium buttons (px-4 py-2) - default
- `lg`: Large buttons (px-6 py-3)
- `xl`: Extra large buttons (px-8 py-4)

## Theme Support
All button variants automatically adapt to light/dark themes:
- Light theme: Uses lighter backgrounds and darker text
- Dark theme: Uses darker backgrounds and lighter text
- Consistent focus rings and hover states

## Accessibility Features
- Proper focus management with visible focus rings
- ARIA labels support
- Keyboard navigation
- Disabled state handling
- Semantic button elements

## Implementation Status

### ✅ Completed Updates
- [x] Contact Me floating button (App.tsx)
- [x] Theme toggle button (ThemeToggle.tsx)
- [x] Sort reverse toggle (Projects.tsx, HonorsAwards.tsx)
- [x] Image navigation arrows (HonorsAwards.tsx)
- [x] Modal close buttons (ContactModal.tsx, HonorsAwards.tsx, Roadmap.tsx)
- [x] Mobile navigation hamburger (MobileNav.tsx)
- [x] Zoom modal controls (HonorsAwards.tsx)

### 📝 Design Principles
1. **Consistency**: All buttons follow the same visual patterns
2. **Accessibility**: Focus states, ARIA labels, and keyboard navigation
3. **Theme Awareness**: Automatic adaptation to light/dark themes
4. **Semantic Clarity**: Different variants for different purposes
5. **Scalability**: Easy to extend with new variants or sizes

## Usage Guidelines

### Do's
- Use `primary` for main actions
- Use `secondary` for supporting actions
- Use `icon` for icon-only buttons
- Use `toggle` for state toggles
- Always pass the current `theme` prop
- Use appropriate `size` for context

### Don'ts
- Don't mix custom button styles with the design system
- Don't forget to pass the theme prop
- Don't use primary variant for every button
- Don't override core styles unless absolutely necessary

## Future Enhancements
- Loading states with spinners
- Button groups for related actions
- Dropdown button variants
- Animation presets for interactions
