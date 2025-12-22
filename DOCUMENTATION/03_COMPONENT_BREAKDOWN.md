# Component Breakdown and Functionality

## Core Components

### 1. Mobile Detection Hook (useIsMobile)

**Purpose**: Determines if the application is running on a mobile device to enable responsive behavior.

**How It Works**: 
- On component mount, checks the window's inner width (< 768px indicates mobile)
- Also checks for the presence of 'ontouchstart' event, indicating touch capability
- Adds a resize listener to re-evaluate mobile status if the window is resized
- Returns a boolean state value that persists across renders

**Why It Matters**: The application uses this value to skip expensive animations, disable certain effects, and optimize the user interface for touch interactions.

---

### 2. Swipe Gesture Hook (useSwipeGesture)

**Purpose**: Detects multi-directional swipe gestures on touch devices and provides real-time feedback.

**How It Works**:
- Tracks the starting position of a touch when `onTouchStart` fires
- As the finger moves (`onTouchMove`), calculates the current offset from the starting point
- Multiplies the offset by a reduction factor (0.3 for X, 0.1 for Y) to create subtle preview movement
- On `onTouchEnd`, calculates the total distance traveled in both horizontal and vertical directions
- Compares the distance against a threshold (20 pixels) to determine if it's an intentional gesture
- Determines whether the gesture is primarily horizontal or vertical and calls the appropriate callback
- Returns the touch handlers and current swipe offset for use in component rendering

**Visual Feedback**: As the user swipes, the card slightly rotates and shifts in the direction they're swiping, providing immediate visual confirmation.

---

### 3. Wheel Scroll Hook (useWheelScroll)

**Purpose**: Handles mouse wheel scrolling with intelligent throttling and debouncing.

**How It Works**:
- Tracks the timestamp of the last scroll event
- When a new scroll event occurs, checks if enough time has passed (300ms) since the last event
- If not enough time has passed, ignores the scroll entirely to prevent rapid-fire triggers
- Also checks the scroll delta (the magnitude of the scroll) against a minimum threshold (30 pixels)
- Small, accidental scrolls are ignored to prevent unwanted navigation
- Only if both conditions are met (enough time elapsed AND sufficient scroll magnitude) does it call the navigation callback

**Purpose of Throttling**: Prevents the user from accidentally advancing through multiple cards by scrolling quickly, creating a more intentional interaction pattern.

---

### 4. Touch Ripple Component

**Purpose**: Creates a visual feedback effect at the point where the user touches the screen.

**How It Works**:
- Receives X and Y coordinates where the touch occurred
- Creates a circular div positioned at that location (adjusted by 50px offset for centering)
- Applies a radial gradient style to create a ring-like appearance in the specified color
- Applies a scale animation that expands the ripple outward over 600ms while fading out
- Automatically removes itself from the DOM after the animation completes using a useEffect timeout

**Visual Purpose**: Provides immediate tactile feedback that the system registered the touch, improving user confidence in the interface.

---

### 5. Particle Background Component

**Purpose**: Renders the static background environment that cards appear in front of.

**How It Works**:
- Creates a fixed, full-screen container with overflow hidden
- Applies a base dark slate color (#020617)
- Overlays a radial gradient for depth and atmosphere
- Positions two large blur-filtered circle elements (blue and purple) at opposite corners to create a glowing effect
- On desktop only (not mobile), adds a perspective-transformed grid pattern to create depth illusion

**Why Layered**: Multiple opacity values and blur amounts create a sense of depth, making the background feel three-dimensional.

---

### 6. Audio Visualizer Component

**Purpose**: Creates a canvas-based visualization that responds to the background music beat.

**How It Works**:
- Uses requestAnimationFrame for smooth animation (30 FPS on mobile, higher on desktop)
- Simulates a beat frequency based on elapsed time to create "kicks" in the music
- Uses the beat intensity to move perspective grid lines and scale audio bars vertically
- Draws multiple layers: a horizon line, perspective grid lines (creating a floor effect), and jagged audio bars

**Canvas Rendering Layers** (in order):
1. Horizon line across the middle of the canvas
2. Perspective grid lines converging toward the horizon
3. Moving horizontal lines that animate toward the viewer
4. Audio bar skyline showing simulated beat-responsive height

**Desktop Effects** (disabled on mobile):
- RGB color separation effect when beat is strong (red and cyan channels offset)
- Camera shake effect that increases with beat intensity
- Higher quality rendering with more grid lines and bars

**Performance Optimization**: Limits frame rate and skips rendering frames if the time since last render is too short, preventing performance degradation on older devices.

---

### 7. Card3D Component

**Purpose**: The main interactive card element that displays each portfolio item with 3D perspective effects.

**Key Features**:

**3D Perspective Transforms**:
- On desktop, rotates card based on mouse position (rotateX for vertical mouse movement, rotateY for horizontal)
- On mobile, applies subtle rotation based on swipe offset
- Creates the illusion of the card following the user's attention

**Front and Back Faces**:
- Front face displays portfolio item title, image, highlights, tags, and contact information
- Back face shows detailed system information with a "Next" button
- Both faces maintain separate styling and content
- CSS transform `rotateY(180deg)` flips between faces

**Stacked Card Appearance**:
- Creates multiple shadow layers to simulate depth
- Inactive cards are hidden with opacity 0 but maintain their position in the DOM
- Past cards (already viewed) animate off-screen with direction-specific transforms
- Upcoming cards are positioned behind the active card with reduced scale and blur

**Entrance Animation**:
- When a card becomes active, plays a subtle pop-in animation
- Increases scale and adds glow effects
- Provides visual confirmation that the card has advanced

**Visual Effects**:
- Multi-layer shadow system creates floating effect
- Gradient ambient glow matches the card's theme color
- Shine effect (diagonal gradient) adds perceived depth
- Scanlines on desktop create a CRT monitor aesthetic (optional)

**Touch Feedback**:
- Brief border animation indicates successful interaction
- Ripple effects appear at touch points

**Exit Animations**:
- Each card has a unique exit animation based on its animation type
- Examples: float-up (rises and rotates), slide-right (moves right and rotates), warp-zoom (scales up dramatically)
- These exits create visual variety as users navigate

---

### 8. Header Component

**Purpose**: Displays branding and navigation links at the top of the application.

**Content**:
- Lightning bolt icon in a small box (animated pulse on non-mobile)
- "VIJAY.DEV" text as the brand name
- Navigation links (Work, Skills, Contact) visible only on desktop

**Styling**: Uses mix-blend-difference to remain visible over all backgrounds.

---

### 9. Progress Component

**Purpose**: Shows the user's current position in the portfolio sequence.

**Features**:
- Displays percentage progress (e.g., "System Load: 50%")
- Shows a series of dots representing each card, with styling based on state:
  - Active card: Wide, glowing, fully opaque dot
  - Visited cards: Small, semi-transparent dots
  - Unvisited cards: Very small, faint dots
- Dot clicking allows direct jumping to any card
- Navigation hints on the first card explain the two-step interaction pattern

---

### 10. Main App Component

**Purpose**: The root component that orchestrates all other components and manages application state.

**State Variables**:
- `activeIndex`: Current visible card (0-4)
- `cardFlipped`: Object tracking which cards are flipped
- `loading`: Boolean for page load animation state
- `surge`: Triggers glitch effect on card transitions
- `mousePos`: Current mouse coordinates on desktop
- `isMusicPlaying`: Whether background music is audible
- `ripples`: Array of currently animating ripple effects
- `isMobile`: Whether device is mobile

**Event Handlers**:
- Mouse move listener updates perspective transforms in real-time
- Wheel scroll listener triggers navigation with proper throttling
- Touch handlers detect swipe gestures and create ripple effects
- Keyboard handlers provide arrow key navigation
- Window resize listener re-evaluates mobile status

**Navigation Logic**:
- Implements the two-step pattern: first action flips, second action advances
- Handles loop-back to first card when reaching the end
- Prevents navigation beyond the portfolio bounds

---

## Rendering Flow

When App renders:
1. ParticleBackground renders fixed background elements
2. Header renders at fixed position
3. Multiple Card3D components render stacked on top of each other
4. Each card's visibility is controlled by activeIndex and opacity
5. Progress component renders navigation controls
6. Scroll indicator animates at bottom showing current state

The layering creates an effect where only the active card is visible in front, with past cards animated away and future cards hidden behind the active card.

