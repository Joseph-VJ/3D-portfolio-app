# Architecture and Application Flow

## Application Architecture Overview

The application follows a component-based architecture with React at its core, divided into distinct functional layers:

### Layer 1: Hooks and Utilities

Custom React hooks handle specific interaction patterns and device detection:

**Mobile Detection Hook** identifies whether the user is on a mobile device by checking screen width (less than 768px) or detecting touch support. This detection runs on mount and on window resize, allowing the app to adapt its behavior dynamically.

**Swipe Gesture Hook** captures touch events and calculates swipe distance and direction. It tracks starting position on touch start, updates position during touch move, and calculates the final direction on touch end. The hook also provides visual feedback through swipe offset values that represent partial gesture completion.

**Wheel Scroll Hook** throttles mouse wheel events to prevent rapid-fire navigation. It implements a cooldown period (300ms between scrolls) and requires a minimum scroll delta (30 pixels) before triggering navigation, creating a more intentional interaction experience.

### Layer 2: Visual Effects Components

Specialized components handle visual feedback and effects:

**Touch Ripple Effect** creates a temporary ripple animation at the point of user touch contact. It displays briefly (600ms) and then removes itself from the DOM automatically, maintaining performance.

**Particle Background** renders the static background with gradient layers, blurred orbs, and an optional perspective grid on desktop. The background is fixed to the viewport, creating a depth effect while the cards move over it.

**Audio Visualizer** is a canvas-based component that simulates an audio spectrum display synchronized with the background music. It draws perspective grid lines, horizon lines, and audio bars that respond to the beat, creating a phonk-aesthetic visual effect.

### Layer 3: Card Component

The **Card3D Component** is the central interactive element that displays each portfolio item. It manages:
- Active/inactive card states and transitions
- 3D perspective transforms based on mouse position or touch input
- Front and back face rendering with CSS transforms
- Entrance animations and exit transitions
- Shadow effects and depth layers
- Touch feedback mechanisms

### Layer 4: UI Components

Supporting components provide structure and navigation:

**Header Component** displays the app branding and navigation links (on desktop only), remaining fixed at the top.

**Progress Component** shows the current position in the portfolio sequence with an animated progress bar at the bottom left and percentage indicator.

**Main App Component** orchestrates all other components and manages global state.

## Data Flow

### Portfolio Data Structure

The application uses a static array called PORTFOLIO_ITEMS containing five portfolio cards, each with:
- Unique ID and type classification
- Title and subtitle for display
- Full description and detailed information points
- Visual styling (gradient colors, hex codes, accent colors)
- Animation type for exit transitions
- Contact links (for the Contact card)
- Associated image URLs (for the Identity card)

### State Management

The main App component maintains several state variables:

**activeIndex** tracks which card is currently displayed (0-4).

**cardFlipped** is an object tracking the flipped state of each card individually, allowing multiple cards to maintain their flip state independent of the active card.

**loading** manages the initial page load animation and page transition animations.

**surge** triggers visual glitch effects when cards transition.

**mousePos** stores the current mouse position on desktop for 3D perspective calculations.

**isMusicPlaying** controls whether background music is audible.

**ripples** maintains an array of currently active touch ripple effects.

**isMobile** boolean determined by the mobile detection hook.

## User Interaction Flow

### Step 1: Initial Load

When the user first visits the application:
1. The page loads with all cards positioned below the viewport (translate-y-[100vh])
2. After 500ms, the loading state transitions to false
3. Each card staggered by 100ms animates upward into view
4. The first card (Identity) becomes active and visible

### Step 2: First Interaction (Flip Card)

When the user scrolls down, swipes left, or presses down arrow:
1. The system checks if the current card is already flipped
2. If not flipped, the card rotates 180 degrees to show the back face
3. The back face contains a detailed description and contact links
4. A visual indicator at the bottom changes to suggest swiping to advance

### Step 3: Second Interaction (Navigate Forward)

When the user scrolls/swipes again on an already-flipped card:
1. The surge animation triggers (visual glitch effect)
2. The current card animates out of view with direction-specific exit animations
3. The next card animates into view from the opposite direction
4. The activeIndex increments by one
5. The new card's flip state resets to unflipped

### Step 4: Navigation Variations

**Backward Navigation**: Using scroll up, swipe right, or up arrow performs similar transitions but moves to the previous card (activeIndex decrements).

**Direct Jump**: Clicking on a progress dot at the bottom left jumps directly to that card.

**Loop**: When reaching the last card and pressing next, the app triggers a page reload animation before returning to the first card.

## Desktop vs Mobile Experience

### Desktop Experience

- Smooth mouse tracking causes 3D perspective transforms to follow cursor position
- High-quality audio visualizer with RGB split effects and camera shake
- Grid background with perspective effect
- Detailed shadow rendering and visual effects
- Keyboard navigation with arrow keys
- Desktop-optimized animations with 3D rotation and scaling

### Mobile Experience

- Touch-based swipe gestures replace mouse scrolling
- Simplified audio visualizer or completely disabled for performance
- No grid background or reduced visual effects
- Larger touch targets and more forgiving gesture thresholds
- Horizontal swipe takes priority over vertical
- Optimized animations with reduced 3D complexity
- Card counter indicator visible at top
- Previous button displayed for easier backward navigation

## Event Handling Architecture

The application sets up multiple event listeners organized by type:

**Mouse Events**: Mouse move on the container element updates position for 3D perspective, throttled via requestAnimationFrame for performance.

**Wheel Events**: Captured and throttled through the useWheelScroll hook to prevent accidental rapid scrolling.

**Touch Events**: Three separate handlers on the container - touch start, touch move, and touch end - work together to detect swipe gestures.

**Keyboard Events**: Arrow keys trigger the same navigation logic as scroll/swipe, providing multiple input methods for the same action.

**Resize Events**: Window resize triggers mobile detection check, allowing the app to adapt if screen is resized or device orientation changes.

## Animation Timeline

When navigating between cards, multiple animations occur simultaneously:

1. **Card Transition** (700ms): Active card fades out while new card fades in
2. **Exit Transform** (0-700ms): Exiting card applies direction-specific transform (slide, rotate, scale)
3. **Entrance Pop** (0-500ms): New card entrance animation plays if just became active
4. **Shadow Adjustment**: Shadows animate from previous card to new card
5. **Background Visualizer**: Audio bars reset when new card becomes active
