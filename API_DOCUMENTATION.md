# Ghiblify API Documentation

> **Ghiblify** - Transform your images with Ghibli magic

A Next.js application that provides image transformation capabilities with various artistic styles, built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Table of Contents

- [Components](#components)
  - [Main Components](#main-components)
  - [UI Components](#ui-components)
- [Hooks](#hooks)
- [Utilities](#utilities)
- [Types & Interfaces](#types--interfaces)

---

## Components

### Main Components

#### Logo

A branded logo component displaying the Ghiblify branding with sparkles icon.

**File:** `components/logo.tsx`

```tsx
import Logo from '@/components/logo'

function App() {
  return <Logo />
}
```

**Props:** None

**Description:** 
- Displays the "Ghiblify" brand name with tagline
- Includes a Sparkles icon in a styled container
- Fully styled with dark theme colors

---

#### ImageHistory

A scrollable history component that displays past image transformations.

**File:** `components/image-history.tsx`

```tsx
import ImageHistory from '@/components/image-history'

interface HistoryItem {
  id: string
  source: string
  result: string
  prompt: string
}

function App() {
  const history: HistoryItem[] = [
    {
      id: '1',
      source: '/source-image.jpg',
      result: '/result-image.jpg',
      prompt: 'studio ghibli style'
    }
  ]

  const handleItemClick = (item: { source: string; result: string; prompt: string }) => {
    console.log('Selected item:', item)
  }

  return (
    <ImageHistory 
      history={history} 
      onItemClick={handleItemClick} 
    />
  )
}
```

**Props:**
- `history` (Array): Array of transformation history items
  - `id` (string): Unique identifier
  - `source` (string): Source image URL
  - `result` (string): Result image URL  
  - `prompt` (string): Transformation prompt used
- `onItemClick` (Function): Callback when history item is clicked

**Features:**
- Responsive design (different heights for mobile/desktop)
- Hover effects with smooth transitions
- Displays side-by-side source and result images
- Shows transformation prompt and timestamp

---

#### PromptTags

A collection of predefined prompt tags for quick image transformation selection.

**File:** `components/prompt-tags.tsx`

```tsx
import PromptTags from '@/components/prompt-tags'

function App() {
  const handleTagClick = (tag: string) => {
    console.log('Selected tag:', tag)
    // Use the tag for image transformation
  }

  return (
    <PromptTags 
      onTagClick={handleTagClick}
      className="my-4" 
    />
  )
}
```

**Props:**
- `onTagClick` (Function): Callback when a tag is clicked, receives the tag string
- `className` (string, optional): Additional CSS classes

**Available Tags:**
- "studio ghibli style", "photorealistic", "iphone selfie"
- "cartoon line drawing", "naruto style", "film photo"
- "90s film", "michelangelo painting", "watercolor"
- "pixel art", "cyberpunk", "vaporwave", "oil painting"
- "pencil sketch", "ukiyo-e", "pop art", "impressionist"
- "low poly", "isometric", "retro game"

**Features:**
- Responsive flex layout
- Hover effects on tags
- Styled as outlined badges with rounded corners

---

#### ThemeProvider

A wrapper component for Next.js themes functionality.

**File:** `components/theme-provider.tsx`

```tsx
import { ThemeProvider } from '@/components/theme-provider'

function App({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
```

**Props:** 
- Inherits all props from `next-themes` ThemeProviderProps
- `children` (ReactNode): Child components
- `attribute` (string): HTML attribute for theme
- `defaultTheme` (string): Default theme name
- `enableSystem` (boolean): Enable system theme detection
- `disableTransitionOnChange` (boolean): Disable transitions when theme changes

---

### UI Components

The application uses shadcn/ui components. Here are the key components:

#### Button

A versatile button component with multiple variants and sizes.

**File:** `components/ui/button.tsx`

```tsx
import { Button } from '@/components/ui/button'

function App() {
  return (
    <>
      {/* Default button */}
      <Button>Click me</Button>
      
      {/* Different variants */}
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      
      {/* Different sizes */}
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🚀</Button>
      
      {/* As child component */}
      <Button asChild>
        <a href="/link">Link Button</a>
      </Button>
    </>
  )
}
```

**Props:**
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `size`: "default" | "sm" | "lg" | "icon"
- `asChild` (boolean): Render as child component using Radix Slot
- All standard HTML button attributes

---

#### Input

A styled input component with consistent design.

**File:** `components/ui/input.tsx`

```tsx
import { Input } from '@/components/ui/input'

function App() {
  return (
    <>
      <Input placeholder="Enter text..." />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input disabled placeholder="Disabled input" />
    </>
  )
}
```

**Props:**
- All standard HTML input attributes
- `className` (string): Additional CSS classes
- `type` (string): Input type (text, email, password, etc.)

---

#### Toast Components

Toast notification system with multiple components.

**Files:** 
- `components/ui/toast.tsx` - Main toast component
- `components/ui/toaster.tsx` - Toast container

```tsx
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

function App() {
  const { toast } = useToast()

  const showToast = () => {
    toast({
      title: "Success!",
      description: "Your image has been transformed.",
      variant: "default"
    })
  }

  return (
    <>
      <button onClick={showToast}>Show Toast</button>
      <Toaster />
    </>
  )
}
```

**Toast Props:**
- `title` (ReactNode): Toast title
- `description` (ReactNode): Toast description  
- `variant`: "default" | "destructive"
- `action` (ToastActionElement): Action button

---

## Hooks

### useMobile

A custom hook for responsive design that detects mobile devices.

**File:** `hooks/use-mobile.tsx`

```tsx
import { useMobile } from '@/hooks/use-mobile'

function ResponsiveComponent() {
  const isMobile = useMobile() // Default breakpoint: 768px
  const isTablet = useMobile(1024) // Custom breakpoint
  
  return (
    <div>
      {isMobile ? (
        <div>Mobile Layout</div>
      ) : (
        <div>Desktop Layout</div>
      )}
    </div>
  )
}
```

**Parameters:**
- `breakpoint` (number, optional): Custom breakpoint in pixels (default: 768)

**Returns:**
- `boolean`: True if screen width is below breakpoint

**Features:**
- Automatically updates on window resize
- SSR-safe with proper hydration
- Customizable breakpoint
- Cleanup of event listeners

---

### useToast

A comprehensive hook for managing toast notifications.

**File:** `hooks/use-toast.ts`

```tsx
import { useToast } from '@/hooks/use-toast'

function NotificationExample() {
  const { toast, dismiss } = useToast()

  const showSuccess = () => {
    const { id } = toast({
      title: "Success!",
      description: "Operation completed successfully.",
      variant: "default"
    })
    
    // Auto dismiss after 3 seconds
    setTimeout(() => dismiss(id), 3000)
  }

  const showError = () => {
    toast({
      title: "Error!",
      description: "Something went wrong.",
      variant: "destructive"
    })
  }

  return (
    <>
      <button onClick={showSuccess}>Success Toast</button>
      <button onClick={showError}>Error Toast</button>
    </>
  )
}
```

**Returns:**
- `toast` (Function): Function to show a toast
- `dismiss` (Function): Function to dismiss specific toast by ID
- `toasts` (Array): Current toast state

**Toast Function Parameters:**
- `title` (ReactNode, optional): Toast title
- `description` (ReactNode, optional): Toast description
- `variant`: "default" | "destructive"
- `action` (ToastActionElement, optional): Action button

**Features:**
- Global state management for toasts
- Automatic cleanup with configurable delay
- Support for multiple toasts with limit
- Update and dismiss functionality
- Action buttons support

---

## Utilities

### cn (className utility)

A utility function for merging and deduplicating CSS classes.

**File:** `lib/utils.ts`

```tsx
import { cn } from '@/lib/utils'

function StyledComponent({ className }: { className?: string }) {
  return (
    <div 
      className={cn(
        "base-class",
        "default-styles",
        className, // User-provided classes override defaults
        {
          "conditional-class": someCondition
        }
      )}
    >
      Content
    </div>
  )
}
```

**Parameters:**
- `...inputs` (ClassValue[]): CSS classes, objects, or conditional classes

**Returns:**
- `string`: Merged and deduplicated class string

**Features:**
- Built on `clsx` and `tailwind-merge`
- Handles conditional classes
- Prevents Tailwind CSS conflicts
- TypeScript support

---

### transformImage

Image transformation function (currently mock implementation).

**File:** `lib/transform-image.ts`

```tsx
import { transformImage } from '@/lib/transform-image'

async function handleImageTransform() {
  const sourceImageUrl = '/path/to/source.jpg'
  const prompt = 'studio ghibli style'
  
  try {
    const transformedImage = await transformImage(sourceImageUrl, prompt)
    console.log('Transformed image:', transformedImage)
  } catch (error) {
    console.error('Transformation failed:', error)
  }
}
```

**Parameters:**
- `sourceImage` (string): URL or base64 of source image
- `prompt` (string): Transformation prompt/style

**Returns:**
- `Promise<string>`: URL or base64 of transformed image

**Note:** 
- Currently returns source image after 2-second delay (mock)
- In production, would integrate with AI SDK for actual transformations
- Includes commented example of real implementation with OpenAI

---

## Types & Interfaces

### Component Props

```tsx
// ImageHistory component
interface ImageHistoryProps {
  history: Array<{
    id: string
    source: string
    result: string
    prompt: string
  }>
  onItemClick: (item: { source: string; result: string; prompt: string }) => void
}

// PromptTags component
interface PromptTagsProps {
  onTagClick: (tag: string) => void
  className?: string
}

// Button component
interface ButtonProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
```

### Toast Types

```tsx
// Toast-related types
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

interface ToastProps {
  variant?: "default" | "destructive"
  // ... other toast properties
}
```

---

## Getting Started

### Installation

```bash
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
pnpm dev
```

### Building

```bash
npm run build
# or  
pnpm build
```

### Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── logo.tsx          # Branding component
│   ├── image-history.tsx # History component
│   ├── prompt-tags.tsx   # Tag selection component
│   └── theme-provider.tsx # Theme wrapper
├── hooks/                # Custom React hooks
│   ├── use-mobile.tsx   # Mobile detection hook
│   └── use-toast.ts     # Toast management hook
├── lib/                  # Utility functions
│   ├── utils.ts         # Class name utilities
│   └── transform-image.ts # Image transformation
└── styles/              # Global styles
```

### Dependencies

**Core:**
- Next.js 15.1.0
- React 19
- TypeScript 5

**UI:**
- Tailwind CSS
- Radix UI components
- shadcn/ui
- Lucide icons

**State Management:**
- React hooks for local state
- Context for global state (themes, toasts)

**Utilities:**
- class-variance-authority (component variants)
- clsx + tailwind-merge (class management)
- zod (validation)

---

This documentation covers all public APIs, components, hooks, and utilities in the Ghiblify project. Each section includes practical examples and usage instructions to help developers integrate these components effectively.