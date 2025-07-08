# LoginPage Component Documentation

## Overview
This component provides a modern, user-friendly login interface for PitchPerfect. It offers sign-in options with GitHub and Google, simulates authentication flows, and includes clear navigation and privacy messaging.

---

## Features
- **Provider Buttons**: Sign in with GitHub or Google
- **Loading State**: Shows a spinner and disables buttons during login
- **Demo Mode**: Simulates login with a timeout and alert (replace with real auth in production)
- **Return to Homepage**: Quick link back to the main page
- **Privacy Note**: Terms of Service and Privacy Policy reminder
- **Responsive Design**: Centered card layout, works on all devices

---

## State Management
- `isLoading`: Object tracking loading state for each provider (`github`, `google`)

---

## Login Flow
1. User clicks a provider button
2. Button shows a spinner and disables both buttons
3. After 1.5 seconds, an alert simulates a login (replace with real OAuth in production)
4. Loading state resets

---

## UI/UX Details
- **Gradient backgrounds** and rounded corners for a modern look
- **Animated spinner** during loading
- **Accessible**: All buttons have clear labels and icons
- **Divider**: Visually separates login options
- **Privacy Note**: Always visible at the bottom

---

## Customization
- Replace the `handleLogin` logic with real authentication (e.g., NextAuth.js, Firebase, Auth0)
- Add more providers as needed
- Update branding and privacy text

---

## Dependencies
- React (with hooks)
- Next.js (for routing and Image/Link components)
- Tailwind CSS

---

This documentation will help you understand, maintain, and extend the login experience for PitchPerfect.
