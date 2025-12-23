# User Interaction Patterns and Navigation

## Initial User Experience

### First Page Load

When a user first arrives at the application:

**Loading State** (0-500ms):
- All five cards are positioned off-screen below the viewport
- The background particle effects and audio visualizer are ready but hidden

**Card Entry Animation** (500-1000ms):
- Each card sequentially animates upward into the viewport
- Cards are staggered by 100ms, creating a cascading entrance effect
- The first card (Identity) becomes visible first
- Loading state transitions to false after all animations complete

**Ready State**:
- User sees the first card (Identity) prominently displayed
- Card shows Vijay's name, subtitle, profile image, highlights, and tags
- Scroll/swipe hint appears at the bottom suggesting interaction
- Navigation controls are visible in the corners
- Audio visualizer begins animating if music is playing

---

## The Two-Step Interaction Pattern

The application implements an intentional two-action pattern for navigation, creating a discovery-based experience:

### First Action: Reveal Card Details

**How to Trigger**:
- **Desktop**: Scroll down with mouse wheel
- **Mobile**: Swipe left (or right) with finger
- **Keyboard**: Press down arrow (or right arrow)

**What Happens**:
1. The current card flips 180 degrees along the Y-axis
2. The front face fades out while the back face fades in
3. The back face displays:
   - Larger, more detailed description
   - A list of specific expertise or details (3-5 bullet points)
   - For the Contact card: Three clickable buttons (WhatsApp, Instagram, Email)
   - A "Next File" button (or "Reboot System" on the last card)
4. Visual indication changes to suggest swiping/scrolling again to advance
5. The card's flip state is stored, so if the user navigates away and back, the card stays flipped

**User Perspective**:
- Users get a glimpse of the card at first glance
- Interested users flip for more details
- Creates a "progressive disclosure" pattern where information is revealed gradually

### Second Action: Navigate to Next Card

**How to Trigger**:
- **Desktop**: Scroll down again (while card is flipped)
- **Mobile**: Swipe left again (while card is flipped)
- **Keyboard**: Press down arrow again (while card is flipped)

**What Happens**:
1. The surge effect briefly flashes (visual glitch)
2. The current card animates off-screen with a direction-specific exit animation
3. The next card animates into view with an entrance animation
4. The activeIndex increments by one
5. The new card's flip state resets to unflipped (front face shows)
6. Background visualizer color updates to match the new card's theme
7. If the card was the last one, the next action returns to the first card with a transition

**Exit Animation Variations**:
- Identity (float-up): Rises upward and rotates, suggesting floating away
- Development (slide-right): Slides right with 3D rotation
- Innovation (warp-zoom): Scales up dramatically, suggesting hyperspace jump
- Education (slide-left): Slides left with opposite rotation
- Contact (drop-down): Falls downward, suggesting gravity pull

**Visual Progression**:
- Each exit animation feels unique, helping users mentally track their position
- The card counter updates to show progress through the portfolio

---

## Navigation Methods

The application supports multiple input methods for maximum accessibility:

### Desktop: Mouse Wheel Scrolling

**Mechanism**:
- Mouse wheel events are captured and processed through the useWheelScroll hook
- Rapid scrolls are throttled (minimum 300ms between scroll triggers)
- Small accidental scrolls are ignored (minimum 30px delta required)
- Scroll direction determines forward or backward navigation

**User Experience**:
- Natural scrolling feels intuitive on desktop
- Throttling prevents accidental rapid navigation
- Smooth scrolling motion on supported browsers

### Mobile: Touch Swiping

**Mechanism**:
- Touch start captures initial finger position
- Touch move tracks finger motion in real-time, providing visual preview
- Touch end calculates swipe distance and direction
- Horizontal swipes take priority over vertical
- 20-pixel minimum distance required to register as intentional

**User Experience**:
- Card slightly shifts and rotates as user swipes, showing preview
- Swipe feels responsive and immediate
- Ample gesture tolerance for comfortable interaction
- Works well even with slightly inaccurate swipes

### Keyboard Navigation

**Method**:
- Arrow keys (Right, Down): Forward navigation, same as scrolling down
- Arrow keys (Left, Up): Backward navigation, same as scrolling up

**Implementation**:
- Keyboard events follow the same two-step pattern as scroll/swipe
- First keypress flips the card
- Second keypress advances to next/previous card

**User Experience**:
- Power users can navigate without touching mouse/trackpad
- Accessibility feature for keyboard-only users
- Also works for mobile users who prefer keyboard input

### Direct Navigation: Progress Dots

**Method**:
- Click or tap any progress dot at the bottom left
- Dots represent each portfolio card

**Behavior**:
- Clicking a dot jumps directly to that card's index
- Skips the normal sequence of cards
- New card displays with front face unflipped
- Surge effect still plays for transition feedback

**Visual Feedback**:
- Active dot is wider and glowing
- Past dots are semi-transparent and clickable
- Future dots are very faint
- Hovering shows dots scale slightly

---

## Navigation Constraints and Boundaries

### Backward Navigation Limit

- First card (activeIndex 0) cannot navigate backward
- Pressing "previous" or swiping right on the first card does nothing
- The previous button only appears on mobile when not on the first card

### Forward Navigation Loop

- When on the last card (Contact) and navigating forward:
  1. Loading animation plays (cards slide down out of view)
  2. After 1 second, activeIndex resets to 0
  3. Cards slide back up into view in sequence
  4. First card becomes active again
  5. User can begin another complete portfolio tour

### Flip State Persistence

- Each card maintains its flip state independently
- Navigating away and back to a card preserves its flip state
- Only resets when using direct navigation (progress dots)

---

## Visual Feedback Mechanisms

### Touch Ripple Effect (Mobile Only)

When user touches the screen:
- A circular ripple appears at the touch point
- Ripple expands outward while fading out over 600ms
- Uses the active card's theme color for visual cohesion
- Provides tactile feedback that touch was registered

### Card Border Animation

When card is touched:
- A subtle border appears and animates outward (ping effect)
- Lasts 300ms
- Indicates successful button interaction

### Scroll/Swipe Indicator

At the bottom of the screen:
- Text dynamically updates based on card state
- "Swipe to View" (mobile) or "Scroll to View" (desktop) when card is not flipped
- "Swipe for Next" or "Scroll for Next" when card is already flipped
- Animates in a bouncing motion to catch attention

### Progress Indicator

At the bottom left:
- Shows "System Load: XX%" with percentage updating as user progresses
- Visual bar fills from left to right representing progress
- On the first card, displays hints about the interaction pattern

### Card Counter (Mobile Only)

At the top center of mobile screens:
- Shows "X / 5" indicating current card number and total
- Updates instantly when card changes

---

## Hover Effects (Desktop Only)

On desktop, interactive elements respond to hover:

### Card Hover Effects

- Slight scale increase (1.02x)
- Shadow intensifies
- Any glowing elements pulse more intensely
- Smooth 500ms transition

### Button Hover Effects

- Scale increases (1.03-1.1x)
- Background color intensifies
- Shadow grows significantly
- Color transitions to match button theme

### Navigation Controls Hover

- Scale increases to 1.1x
- Background becomes fully visible (transitions from semi-transparent)
- Icons may change color based on context

---

## Performance Considerations During Interaction

The application manages performance through interaction-aware optimizations:

### Mouse Tracking

- On desktop, mouse position is tracked for 3D perspective
- Updates are throttled via requestAnimationFrame
- Only one frame per screen refresh (60 FPS maximum)
- Disabled entirely on mobile to prevent unnecessary computation

### Swipe Offset Calculation

- Real-time calculation as finger moves, but limited to active card only
- Inactive cards don't consume resources for tracking
- Swipe offset values are multiplied by reduction factors to dampen effect

### Canvas Animation

- Audio visualizer canvas only renders if the card is active
- Completely disabled on mobile devices for performance
- Frame rate limited to 30 FPS to conserve battery on mobile
- Stops rendering if tab becomes inactive

---

## Error Handling and Edge Cases

### Rapid Navigation Attempts

**Scroll Throttling**: Multiple rapid scrolls are ignored if less than 300ms apart. User can't accidentally skip multiple cards with fast scrolling.

**Swipe Debouncing**: Only registers distinct, separate swipe gestures. Continuous finger movement is treated as one gesture.

### Device Orientation Changes

- Mobile detection re-runs on window resize
- Application adapts layout and effects based on new orientation
- Maintains user's position in the portfolio

### Window Resize

- Audio visualizer canvas recalculates dimensions
- Responsive layout adjusts immediately
- 3D perspective recalibrates if necessary

### Low Bandwidth Scenarios

- Profile images load from external host; if image fails to load, shows empty circular area
- No breaking of core functionality even if external image doesn't load
- Application remains fully interactive

---

## Accessibility Features

### Keyboard Navigation

- Complete navigation possible without mouse
- Arrow keys are standard and intuitive
- Supports common keyboard shortcuts

### Color and Contrast

- High contrast white on dark background
- Color-coded accents support but don't require color distinction
- Focus indicators visible for keyboard navigation

### Touch Target Sizing

- All interactive elements at least 44x44 pixels on mobile
- Ample spacing prevents accidental taps
- Buttons provide hover/active states for feedback

### Text and Typography

- Readable font sizes at all breakpoints
- Clear hierarchy with consistent sizing
- Enough line height for comfortable reading
