# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A gamified personal portfolio CV website built with vanilla HTML5, CSS3, and JavaScript. Single-page application with no build process, frameworks, or dependencies (except Font Awesome CDN for icons).

## Development Commands

**Run locally:** Open `index.html` directly in a browser - no build process required.

**No package manager, bundler, or test framework** is used in this project.

## Architecture & Technical Patterns

### File Structure
- `index.html` - Complete single-page application with all sections
- `style.css` - Full styling with CSS variables for theming
- `script.js` - All interactive features using vanilla JavaScript
- `PROMPTS.md` - Prompt documentation (gitignored per user preference)

### CSS Architecture

**Theming System:**
- CSS variables defined in `:root` for light mode
- `body.dark-mode` class overrides variables for dark theme
- Theme persisted in localStorage as `'theme'`
- All colors, shadows, spacing use CSS variables for consistency

**Responsive Breakpoints:**
- Tablet: `@media (max-width: 768px)`
- Mobile: `@media (max-width: 480px)`

**Key CSS Patterns:**
- Navigation becomes fixed sidebar on mobile with slide-in animation
- Skill bars animate width from 0% to `data-progress` value using CSS transitions
- IntersectionObserver triggers add `.visible` class for fade-in animations

### JavaScript Architecture

**Initialization Pattern:**
All features use `init*()` functions called once in the `DOMContentLoaded` listener:
```javascript
initVisitCounter()
initThemeToggle()
initMobileMenu()
initScrollAnimations()
initCounters()
initSkillBars()
initCarousel()
initProjectFilters()
initFormValidation()
initCTAButton()
initSmoothScroll()
loadUserProgress()
```

**IntersectionObserver Usage:**
Used extensively for performance instead of scroll events:
- Scroll animations (`.fade-in` elements and `.section` elements)
- Animated counters in hero stats (triggers once when visible)
- Skill bar animations (50% visibility threshold)

**localStorage Keys:**
- `'visitCount'` - Number of page visits
- `'theme'` - `'dark'` or `'light'`
- `'userXP'` - Current XP (default: 7500)
- `'userLevel'` - Current level (default: 25)
- `'secretBadgeUnlocked'` - `'true'` when Konami code unlocked

### Gamification System

**XP & Leveling:**
- 10000 XP per level
- `addXP(amount)` function handles XP addition, level-up detection, and localStorage persistence
- XP rewards: +50 for form submission, +100 for secret badge
- Level-up shows animated notification with gradient background

**Carousel Implementation:**
- Shows one project at a time using `display: none` toggling
- `window.filterProjects(category)` exposed globally for filter buttons
- Filter categories: `'all'`, `'web'`, `'mobile'`, `'design'` (matches `data-category` on `.project-card`)
- Indicators dynamically show/hide based on filtered project count

**Form Validation:**
- Real-time validation on `input` and `blur` events
- Validators defined as functions in `validators` object (name, email, subject, message)
- Visual states: `.error` and `.success` classes on `.form-group`
- Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Name regex: `/^[a-zA-ZÀ-ÿ\s-]+$/` (letters only)

**Easter Egg:**
- Konami code sequence: `['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight']`
- Document-level keydown listener tracks sequence progress
- Unlocks secret badge (`.badge.locked`) and awards 100 XP
- State persisted in localStorage and checked on page load

## Customization Points

**Content Updates:**
- Personal info: Text in `index.html`
- Skills: `data-progress` attributes (0-100) and Font Awesome icons
- Projects: `.project-card` elements with `data-category` matching filter buttons
- Images: Replace `https://via.placeholder.com/*` URLs

**Theme Colors:**
Modify CSS variables in `style.css`:
- Primary/secondary colors for gradients and accents
- Gamification: `--xp-color`, `--level-color`, `--badge-gold`

**Adding New Features:**
1. Create `init*()` function in `script.js`
2. Add call in `DOMContentLoaded` listener
3. Use IntersectionObserver for scroll-triggered animations
4. Use localStorage for persistence when needed
