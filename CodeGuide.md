# Sisu Math Learning App - Code Guide

## Project Overview
Sisu is a progressive web application designed to help users practice and improve their math skills through interactive challenges. The app currently focuses on multiplication with two distinct challenge modes and features a comprehensive progress tracking system.

## Tech Stack
- React 18.3.1
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (for icons)
- React Router DOM
- Recharts (for data visualization)
- Canvas Confetti (for celebrations)

## Project Structure

### Core Components

#### Layout (`src/components/Layout.tsx`)
- Main layout wrapper component
- Handles responsive navigation
- Implements conditional rendering for challenge pages
- Features both desktop and mobile-friendly navigation

### Pages

#### OnboardingPage (`src/pages/OnboardingPage.tsx`)
- Entry point for new users
- Handles user profile creation
- Stores user data in localStorage
- Implements form validation

#### HomePage (`src/pages/HomePage.tsx`)
- Main dashboard
- Displays available math challenges
- Visual indication of locked/upcoming features
- Personalized greeting with user's name

#### MultiplicationHome (`src/pages/MultiplicationHome.tsx`)
- Hub for multiplication challenges
- Displays high scores for each challenge type
- Two challenge modes:
  1. Countdown Challenge
  2. Flash Challenge

#### Challenge Pages
1. MultiplicationCountDownChallenge (`src/pages/MultiplicationCountDownChallenge.tsx`)
   - 100-second time limit
   - Continuous problem generation
   - Real-time score tracking
   - Custom number pad implementation

2. MultiplicationFlashChallenge (`src/pages/MultiplicationFlashChallenge.tsx`)
   - 10 problems with 5 seconds each
   - Unique problem set generation
   - Progress tracking
   - Same UI components as Countdown Challenge

#### ScorePage (`src/pages/ScorePage.tsx`)
- Displays final score
- Shows high score achievements
- Implements confetti celebration
- Quick restart functionality

#### HistoryPage (`src/pages/HistoryPage.tsx`)
- Visual progress tracking
- Separate graphs for each challenge type
- Uses Recharts for data visualization
- Implements custom tooltips

#### AboutPage & ContactPage
- Static information pages
- Consistent styling with main app
- Responsive design

### Utilities

#### User Management (`src/utils/user.ts`)
```typescript
interface UserProfile {
  displayName: string;
  dateJoined: string;
}
```
- Handles user profile storage
- localStorage implementation
- Type-safe user data management

#### Score Management (`src/utils/scores.ts`)
```typescript
interface Score {
  type: string;
  score: number;
  date: string;
  index?: number;
}
```
- Manages score history
- Implements high score tracking
- Limits stored scores to prevent storage overflow
- Type-safe score handling

## Key Features

### Authentication Flow
1. Initial visit redirects to OnboardingPage
2. User profile creation required for access
3. Persistent session management via localStorage
4. Protected routes implementation

### Challenge Implementation
1. Problem Generation
   - Random number generation between 2-12
   - Unique problem sets for Flash Challenge
   - Continuous generation for Countdown Challenge

2. Score Tracking
   - Real-time score updates
   - High score management
   - Historical data preservation
   - Progress visualization

3. UI/UX Features
   - Custom number pad
   - Visual feedback
   - Progress indicators
   - Responsive design
   - Touch-optimized inputs

### Data Management
1. Local Storage Structure
   - User profiles: 'sisu_user'
   - Scores: 'sisu_scores'
   - Maximum 50 scores per type

2. Score Types
   - multiplication_count_down
   - multiplication_flash
   - (Future: division, addition, subtraction)

## Styling Guidelines

### Color Scheme
- Primary: Purple (600)
- Secondary: Blue (400)
- Accents: Yellow (500) for achievements
- Text: Gray scale for hierarchy

### Component Patterns
1. Buttons
   ```jsx
   className="bg-white text-purple-600 rounded-lg px-6 py-4 font-bold hover:bg-gray-50 transition-colors shadow-lg"
   ```

2. Cards
   ```jsx
   className="bg-white/90 backdrop-blur rounded-xl shadow-xl p-8"
   ```

3. Layouts
   ```jsx
   className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500"
   ```

## Best Practices

### State Management
- Use React hooks appropriately
- Implement useCallback for performance
- Maintain type safety with TypeScript
- Clear separation of concerns

### Performance Considerations
- Lazy loading for routes
- Optimized re-renders
- Efficient localStorage usage
- Touch event optimization

### Code Organization
- Consistent file structure
- Clear component hierarchy
- Typed interfaces
- Modular utility functions

## Future Development

### Planned Features
1. Additional Math Operations
   - Division
   - Addition
   - Subtraction

2. Enhanced Analytics
   - Detailed progress tracking
   - Performance insights
   - Learning patterns

3. Accessibility Improvements
   - Keyboard navigation
   - Screen reader support
   - Color contrast optimization

### Version Control
- Current version: v0.4.0
- Semantic versioning
- Feature-based updates