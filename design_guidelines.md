# Design Guidelines: One-Stop Personalized Career & Education Advisor

## Design Approach: Reference-Based (Productivity Tools)
Drawing inspiration from modern productivity platforms like Notion and Linear, with educational elements from platforms like Coursera and Khan Academy.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Brand Blue: 220 85% 45% (professional trust)
- Deep Navy: 220 90% 15% (headers, primary text)

**Supporting Colors:**
- Success Green: 142 76% 36% (progress indicators)
- Warning Orange: 25 95% 53% (alerts, highlights)
- Neutral Gray: 220 9% 46% (secondary text)
- Light Background: 220 13% 97% (page backgrounds)

**Dark Mode:**
- Background: 220 15% 8%
- Card Background: 220 13% 12%
- Text Primary: 220 9% 95%

### Typography
**Fonts:** Inter (primary), JetBrains Mono (code/data)
- Headings: 600-700 weight, 1.2 line height
- Body: 400-500 weight, 1.6 line height
- Small text: 400 weight, 1.4 line height

### Layout System
**Spacing Units:** Tailwind 4, 6, 8, 12, 16
- Component padding: p-6
- Section spacing: space-y-8
- Container max-width: max-w-6xl
- Card spacing: p-6, space-y-4

### Component Library

**Navigation:**
- Clean horizontal navbar with logo left, navigation center, user profile right
- Mobile: Hamburger menu with slide-out drawer
- Breadcrumbs for deep navigation

**Cards & Containers:**
- Rounded corners: rounded-lg
- Subtle shadows: shadow-sm with hover:shadow-md
- White/dark backgrounds with border accents

**Forms:**
- Clean input fields with floating labels
- Primary CTA buttons with rounded-md
- Form validation with inline error states

**Data Display:**
- Progress bars for skill development
- Badge components for categories/tags
- Clean tables for course listings
- Timeline components for career paths

**Interactive Elements:**
- Quiz components with multiple choice styling
- Recommendation cards with hover effects
- Skill assessment sliders
- Course catalog with filtering

### Key Design Principles

1. **Professional Yet Approachable:** Balance authority with accessibility
2. **Progress-Focused:** Visual indicators for user advancement
3. **Scannable Content:** Clear hierarchy and digestible information chunks
4. **Consistent Interactions:** Predictable navigation and feedback patterns

### Images
**Hero Section:** Large inspirational image of diverse professionals in modern workspace (1200x600px)
**Career Path Cards:** Icon illustrations representing different career fields
**Course Thumbnails:** Professional stock photos related to course topics
**Assessment Graphics:** Simple illustrations for quiz questions and results
**Background Elements:** Subtle geometric patterns for section dividers

### Animations
Minimal and purposeful:
- Smooth page transitions (300ms)
- Hover states on interactive elements
- Progress bar animations for assessments
- Gentle fade-ins for content loading

This design creates a trustworthy, professional platform that guides users through their career development journey with clarity and confidence.