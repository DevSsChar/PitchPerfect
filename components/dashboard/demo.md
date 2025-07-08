# Demo Dashboard Component Documentation

## Overview
This dashboard provides a sample analysis view for PitchPerfect users. It visually demonstrates the kind of feedback and insights users receive after submitting a presentation for AI analysis. The dashboard is designed to be modern, responsive, and easy to interpret.

---

## Structure
- **Header**: Title, subtitle, and quick action buttons (New Recording, New Upload)
- **Metrics Cards**: Four cards showing Overall Score, Speaking Pace, Filler Words, and Vocal Confidence
- **Speaking Pace Chart**: Custom SVG line chart showing speaking pace over time
- **Filler Word Heatmap**: Visual heatmap of filler word intensity throughout the presentation
- **Personalized Coaching**: Before/After cards with actionable tips
- **Transcript with Highlights**: Example transcript with key phrases and filler words highlighted

---

## Styling
- Uses Tailwind CSS for layout, color, and spacing
- Custom CSS module (`dashboard.module.css`) for scrollable containers and white backgrounds
- Responsive grid layouts for cards and coaching sections
- Subtle shadows and rounded corners for a modern look
- Custom scrollbar for mobile usability

---

## Key Features
### 1. Metrics Cards
- **Overall Score**: Visual summary of performance (e.g., 78%)
- **Speaking Pace**: Words per minute (WPM) with qualitative feedback
- **Filler Words**: Count and density percentage
- **Vocal Confidence**: Percentage score with improvement suggestions

### 2. Speaking Pace Chart
- Custom SVG line chart (not a library) for fast rendering and full control
- Y-axis: WPM, X-axis: Time
- Ideal range bands and grid lines for context
- Responsive and horizontally scrollable on mobile

### 3. Filler Word Heatmap
- Colored segments represent filler word intensity over time
- Legend explains color coding (None, Low, Medium, High)
- Time markers for context

### 4. Personalized Coaching
- Before/After cards for actionable improvement tips
- Color-coded for clarity (red for issues, green for improvements)

### 5. Transcript with Highlights
- Example transcript with key phrases and filler words highlighted using background colors
- Legend for highlight meanings

---

## Customization
- Update metric values and coaching tips to match real analysis results
- Integrate with backend to display live user data
- Adjust color schemes and icons to fit your brand
- Add more charts or sections as needed

---

## How Demo Analysis Generation Works
- This dashboard uses hardcoded sample data for demonstration
- In production, after a user submits audio, the backend returns a JSON analysis
- The frontend would then render these metrics, charts, and highlights dynamically
- The current dashboard is a visual template for what users will see after analysis

---

## Styling Details (dashboard.module.css)
- `.scrollContainer`: Enables horizontal scrolling for charts on mobile, with custom scrollbar styling
- `.dashboardContainer`: Ensures a white background for the dashboard
- Responsive adjustments for chart minimum widths

---

## Dependencies
- React
- Next.js (for routing and Link component)
- Tailwind CSS
- CSS Modules (for custom styles)

---

## Usage Example
Import and use the Dashboard component in your app's routing or as a demo page:

```jsx
import Dashboard from '@/components/dashboard/page';

export default function DemoPage() {
  return <Dashboard />;
}
```

---

This documentation will help you understand, maintain, and extend the demo dashboard for PitchPerfect.
