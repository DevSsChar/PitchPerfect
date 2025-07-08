# Navbar Component Documentation

## Overview

This is a responsive navigation bar (navbar) component for the PitchPerfect application. It's built using React with Next.js and features both desktop and mobile layouts with smooth transitions and modern styling.

## Component Structure

```jsx
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // ...rest of the component
}
```

The navbar is a client-side component (marked with `"use client"`) that maintains state for the mobile menu toggle.

## Key Features

### 1. Responsive Design
- **Desktop View**: Full horizontal navigation with all links visible
- **Mobile View**: Collapsible menu accessed via a hamburger icon
- **Breakpoints**: Uses Tailwind's `md:` prefix to switch between views

### 2. Brand Identity
- Custom logo with gradient background
- Microphone icon representing the audio analysis functionality
- Brand name "PitchPerfect" displayed with consistent typography

### 3. Navigation Links
- **Record/Upload**: Direct link to audio recording functionality
- **Demo**: Example dashboard showcasing the application
- **How It Works**: Explanation of the technology
- **Features**: Detailed feature list
- **Try It Now**: Call-to-action button with gradient styling

### 4. Interactive Elements
- Hover effects on all links (color change)
- CTA button with scale animation and gradient change on hover
- Mobile menu toggle with smooth open/close functionality

## State Management

```jsx
const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
};
```

The component uses React's `useState` hook to track whether the mobile menu is open or closed. The `toggleMenu` function inverts the current state.

## Styling Approach

The navbar uses Tailwind CSS for styling with these key design elements:

- **Color Scheme**: Gradients from blue to purple for branded elements
- **Typography**: Uses the "Inter" font family for consistent text display
- **Shadows**: Light shadow (`shadow-lg`) for subtle depth
- **Positioning**: Sticky positioning (`sticky top-0`) to keep the navbar visible while scrolling
- **Z-Index**: High z-index (`z-50`) to ensure the navbar appears above other page elements

## Layout Structure

### Desktop Layout
```jsx
<div className="hidden md:flex items-center space-x-8">
    {/* Navigation links */}
</div>
```

The desktop navigation is hidden on mobile (`hidden`) but becomes a flex container on medium screens and above (`md:flex`). Links are spaced evenly with `space-x-8`.

### Mobile Layout
```jsx
{isMenuOpen && (
    <div className="md:hidden py-4 border-t border-gray-200">
        <div className="flex flex-col space-y-4">
            {/* Navigation links */}
        </div>
    </div>
)}
```

The mobile menu is conditionally rendered based on the `isMenuOpen` state. It's displayed on small screens but hidden on medium screens and above (`md:hidden`). Links are arranged vertically using `flex-col`.

## Interactive Elements

### Links
```jsx
<Link
    href="/record"
    className="text-gray-600 hover:text-blue-600 transition-colors font-medium font-inter"
>
    Record/Upload
</Link>
```

Each link uses Next.js's `Link` component for client-side navigation. The styling includes a hover effect that changes the text color with a smooth transition.

### CTA Button
```jsx
<button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-md font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-inter cursor-pointer">
    Try It Now
</button>
```

The call-to-action button features:
- Gradient background that shifts on hover
- Scale transformation on hover (grows slightly larger)
- Rounded corners and padding for proper sizing
- Smooth transitions with a 300ms duration

### Mobile Menu Toggle
```jsx
<button
    className="md:hidden p-2 text-gray-600 hover:text-blue-600"
    onClick={toggleMenu}
    aria-label="Toggle menu"
>
    {/* Hamburger icon SVG */}
</button>
```

The mobile menu toggle button:
- Is only visible on small screens (`md:hidden`)
- Includes an aria-label for accessibility
- Has a hover effect for better user feedback
- Contains an inline SVG icon representing a hamburger menu

## Accessibility Considerations

- Uses semantic HTML5 elements (`nav`, `button`)
- Includes `aria-label` on the menu toggle button
- Maintains color contrast ratios for text readability
- Provides visual feedback on interactive elements

## Usage

Import and include this component in your layout file to have consistent navigation across your application:

```jsx
import Navbar from '../components/navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
```

## Customization Options

To customize this navbar:

1. **Colors**: Modify the gradient classes (`from-blue-500 to-purple-600`) to match your brand colors
2. **Logo**: Replace the SVG with your own logo
3. **Links**: Update the href paths and link text to match your application's routes
4. **Breakpoints**: Adjust the responsive behavior by changing `md:` prefixes to different screen sizes
5. **Spacing**: Modify padding and margin values to adjust the sizing and spacing

## Dependencies

- React (with Hooks)
- Next.js (for routing via the `Link` component)
- Tailwind CSS (for styling)
