# Data Structure and Content Management

## Portfolio Data Array

The application uses a single static data structure called PORTFOLIO_ITEMS containing five objects, each representing one portfolio card/page. This array is the single source of truth for all portfolio content.

---

## Card 1: Identity Card

**Type**: Identity

**Purpose**: Introduces Vijay Joseph and provides an overview of his professional identity.

**Content Fields**:
- **Title**: "Vijay Joseph . R"
- **Subtitle**: "Dev • Digital Marketer • Prompt Engineer"
- **Description**: Describes him as a multidisciplinary tech professional combining code, AI, and digital strategy
- **Tags**: Full Stack, Gen AI, Strategy
- **Highlights**: 
  - 1 Year Experience
  - AI Integration Specialist
  - Strategic Thinker
- **Details**:
  - Based in India, Open to Remote
  - Tech Stack Agnostic
  - Problem Solver First

**Visual Properties**:
- **Color Gradient**: Cyan to Blue (from-cyan-400 to-blue-600)
- **Accent Color**: Cyan
- **Hex Code**: #06b6d4 (for precise color matching)
- **Animation Type**: float-up (exit animation rises the card upward)
- **Image**: Profile photo URL pointing to an external image hosting service

**Back Face Content**: Displays the description and details listed above, emphasizing versatility and problem-solving approach.

---

## Card 2: Development Card

**Type**: Development

**Purpose**: Highlights technical development expertise and capabilities.

**Content Fields**:
- **Title**: "Full Stack Eng."
- **Subtitle**: "Web & App Development"
- **Description**: Emphasizes scalable, high-performance applications with modern JavaScript frameworks
- **Tags**: React, Node.js, Mobile Apps
- **Highlights**:
  - Scalable Architecture
  - Clean Code Practices
  - Performance Optimization
- **Details**:
  - MERN Stack Proficiency
  - Cross-Platform Mobile Dev
  - Cloud Deployment (Firebase/Vercel)

**Visual Properties**:
- **Color Gradient**: Violet to Purple (from-violet-400 to-purple-600)
- **Accent Color**: Purple
- **Hex Code**: #8b5cf6
- **Animation Type**: slide-right (exit animation moves right with rotation)
- **No Profile Image**: This card doesn't display an image

**Back Face Content**: Shows the technical expertise, architecture approach, and deployment knowledge.

---

## Card 3: Innovation Card

**Type**: Innovation

**Purpose**: Showcases artificial intelligence and machine learning capabilities.

**Content Fields**:
- **Title**: "AI & Marketing"
- **Subtitle**: "AI • Prompt Engineering • Growth"
- **Description**: Details expertise in CNN architectures, fine-tuning models (Embedding Gemma, Gemma 3, Qwen2), and merging AI with marketing strategy
- **Tags**: Machine Learning, Fine-tuning, Gen AI
- **Highlights**:
  - CNN Architectures
  - SLM Fine-tuning (Small Language Models)
  - AI-Driven Growth
- **Details**:
  - Custom Model Fine-tuning
  - Automation for AI workflow
  - Automated Content generation

**Visual Properties**:
- **Color Gradient**: Pink to Rose (from-pink-400 to-rose-600)
- **Accent Color**: Pink
- **Hex Code**: #ec4899
- **Animation Type**: warp-zoom (exit animation scales up dramatically with 3D effect)
- **No Profile Image**

**Back Face Content**: Focuses on specific AI models worked with and the practical applications of AI knowledge.

---

## Card 4: Education Card

**Type**: Education

**Purpose**: Presents academic credentials and educational background.

**Content Fields**:
- **Title**: "Academic Base"
- **Subtitle**: "MSc & BCA Graduate"
- **Description**: Explains that advanced Master of Science degree combined with Bachelor of Computer Applications provides strong theoretical foundation
- **Tags**: Computer Science, Research, Algorithms
- **Highlights**:
  - Master of Science
  - Bachelor of Computer Applications
  - Continuous Learner
- **Details**:
  - M.Sc. Computer Science
  - B.C.A. Computer Applications
  - Research on Marketing Analytics

**Visual Properties**:
- **Color Gradient**: Amber to Orange (from-amber-300 to-orange-600)
- **Accent Color**: Amber
- **Hex Code**: #f59e0b
- **Animation Type**: slide-left (exit animation moves left with rotation)
- **No Profile Image**

**Back Face Content**: Emphasizes the combination of theoretical knowledge and practical application.

---

## Card 5: Contact Card

**Type**: Contact

**Purpose**: Provides multiple ways to get in touch with Vijay.

**Content Fields**:
- **Title**: "Let's Connect"
- **Subtitle**: "Open for Collaboration"
- **Description**: Expresses openness to freelance projects, consulting, and full-time roles
- **Tags**: WhatsApp, Email, Instagram
- **Highlights**:
  - Quick Response
  - Professional Service
  - Global Availability
- **Details**:
  - Freelance & Contract
  - Technical Consultation
  - Full-time Opportunities

**Visual Properties**:
- **Color Gradient**: Emerald to Teal (from-emerald-400 to-teal-600)
- **Accent Color**: Emerald
- **Hex Code**: #10b981
- **Animation Type**: drop-down (exit animation falls downward)

**Contact Links Object** (unique to this card):
- **WhatsApp**: https://wa.me/916385129470 - Direct WhatsApp message link using his phone number
- **Email**: mailto:vijayjoseph751@gmail.com - Standard mailto link for email client
- **Instagram**: https://www.instagram.com/vj_movielover - Link to Instagram profile

**Back Face Content**: Shows three clickable buttons linking to communication channels, each with its icon and hover effects.

---

## How Data is Rendered

### Front Face Rendering

For each card, the front face displays:
1. **Type Icon** - Top left corner, showing an icon representing the card type (Code, User, Mail, Graduation Cap, or CPU icon)
2. **Card Counter** - Top right showing "01 // 05" format with current and total count
3. **Center Image** (if present) - Circular image with border effects
4. **Title** - Large, bold text below the image
5. **Subtitle** - Colored gradient text
6. **Highlights Section** - Three bullet points with visual indicators
7. **Tags** - Small badge-like elements at the bottom
8. **Navigation Hint** - Text suggesting interaction method

### Back Face Rendering

For each card, the back face displays:
1. **Header** - "System Data" title with decorative line
2. **Description** - Full description paragraph
3. **Details List** - Bullet points with colored indicators (except Contact card)
4. **Action Section** (Contact card only) - Three clickable buttons for communication methods
5. **Navigation Button** - Large button saying "Next File" or "Reboot System" on last card

---

## Color System

Each card has a dedicated color palette that:
- Defines the gradient background for visual hierarchy
- Sets the accent color for hover effects and indicators
- Provides a hex code for precise matching in canvas-based effects

The hex codes are particularly important for the audio visualizer, which uses them to color the visualization based on the active card's theme.

---

## Animation Types

Each card specifies a unique exit animation that plays when navigating away from it:

- **float-up**: Card rises upward with slight rotation - creates a floating away effect
- **slide-right**: Card moves right with perspective rotation - kinetic exit
- **warp-zoom**: Card scales up dramatically - suggests entering hyperspace
- **slide-left**: Card moves left with perspective rotation - opposite of slide-right
- **drop-down**: Card falls downward - gravity-based exit

These animations provide visual variety and help users maintain spatial awareness as they navigate through the portfolio.

---

## Dynamic Content Rendering

The application renders each card dynamically based on the data structure:
- The component loop maps over PORTFOLIO_ITEMS and creates a Card3D instance for each
- Each card accesses its corresponding data object to populate fields
- Conditional rendering displays image only if the card's image property exists
- Contact links only appear on the Contact card's back face
- Type-specific icons are selected based on the card's type property

This data-driven approach means adding a new portfolio card would only require adding a new object to the PORTFOLIO_ITEMS array with appropriate fields.

