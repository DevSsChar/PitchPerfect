# Footer Component Documentation

## Overview
This is a responsive, modern footer component for the PitchPerfect application. It provides brand information, navigation, legal links, and social media icons, styled with Tailwind CSS for a clean and professional look.

---

## Structure
- **Brand Section**: App name, description, and social media icons (Twitter, LinkedIn, GitHub)
- **Navigation Section**: Quick links to main pages (Record/Upload, Dashboard, How It Works)
- **Legal Section**: Links to Privacy Policy and Terms of Service
- **Bottom Section**: Copyright notice

---

## Key Features
- **Responsive Grid**: Uses Tailwind's grid system for layout, adapting to different screen sizes
- **Branding**: Prominent app name and description
- **Social Icons**: SVG icons for Twitter, LinkedIn, and GitHub with hover color transitions
- **Navigation**: Easy access to important pages
- **Legal**: Clearly separated legal links
- **Consistent Styling**: Uses Tailwind for color, spacing, and typography

---

## Styling Details
- **Background**: White (`bg-white`)
- **Borders**: Top border for separation (`border-t border-gray-200`)
- **Typography**: Uses bold and semibold for headings, gray for secondary text
- **Spacing**: Generous padding and margin for clarity
- **Hover Effects**: All links and icons have color transitions on hover
- **Grid Layout**: `grid-cols-1 md:grid-cols-4` for mobile and desktop responsiveness

---

## Accessibility
- **ARIA Labels**: Social links include `aria-label` for screen readers
- **Semantic HTML**: Uses `<footer>`, `<h3>`, `<h4>`, `<ul>`, and `<li>` for structure

---

## Usage Example
Import and use in your layout or page:

```jsx
import Footer from '../components/footer';

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

---

## Customization
- **Brand Info**: Change the app name and description as needed
- **Social Links**: Replace `href="#"` with your actual social URLs
- **Navigation**: Add or remove links to match your app's routes
- **Legal**: Update or add legal links as required
- **Colors**: Adjust Tailwind classes for different color schemes

---

## Dependencies
- React
- Next.js (for `Link` component)
- Tailwind CSS

---

## Example Output
A clean footer with:
- Brand and description on the left
- Social icons
- Navigation and legal links in columns
- Copyright at the bottom

---

This component ensures your app has a professional, accessible, and visually appealing footer across all devices.
