# Developer Guide

> Quick start guide for developers working with the Ghiblify project

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm package manager
- Basic knowledge of React, Next.js, and TypeScript

### Installation & Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd ghiblify
   pnpm install  # or npm install
   ```

2. **Run Development Server**
   ```bash
   pnpm dev  # or npm run dev
   ```

3. **Project Structure Overview**
   ```
   ghiblify/
   ├── app/                    # Next.js app directory (pages, layouts)
   ├── components/            # React components
   │   ├── ui/               # shadcn/ui components (50+ components)
   │   ├── logo.tsx          # App branding
   │   ├── image-history.tsx # Transformation history
   │   ├── prompt-tags.tsx   # Style selection tags
   │   └── theme-provider.tsx # Theme management
   ├── hooks/                # Custom React hooks
   │   ├── use-mobile.tsx   # Responsive detection
   │   └── use-toast.ts     # Toast notifications
   ├── lib/                  # Utility functions
   │   ├── utils.ts         # Class name utilities
   │   └── transform-image.ts # Image transformation
   └── styles/              # Global CSS styles
   ```

---

## Core Concepts

### 1. Image Transformation Workflow

The app follows this basic flow:

1. **Upload/Select Image** → User provides source image
2. **Choose Style** → Select from predefined tags or custom prompt
3. **Transform** → Process image with AI (currently mocked)
4. **Display Results** → Show before/after comparison
5. **Save to History** → Store transformation for future reference

### 2. Component Architecture

Components are organized in three layers:

- **UI Layer**: shadcn/ui components (buttons, inputs, dialogs)
- **Feature Layer**: App-specific components (Logo, ImageHistory, PromptTags)  
- **Layout Layer**: Next.js pages and layouts

### 3. State Management

- **Local State**: React useState for component-specific data
- **Global State**: Custom hooks (useToast) and Context (ThemeProvider)
- **Server State**: Next.js for data fetching and API routes

---

## Quick Start Examples

### Basic Component Usage

```tsx
// app/page.tsx - Main application page
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { transformImage } from '@/lib/transform-image'
import Logo from '@/components/logo'
import PromptTags from '@/components/prompt-tags'
import ImageHistory from '@/components/image-history'

export default function MainPage() {
  const [sourceImage, setSourceImage] = useState<string>('')
  const [prompt, setPrompt] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState([])
  const { toast } = useToast()

  const handleTransform = async () => {
    if (!sourceImage || !prompt) return
    
    setIsLoading(true)
    try {
      const result = await transformImage(sourceImage, prompt)
      
      // Add to history
      const newItem = {
        id: Date.now().toString(),
        source: sourceImage,
        result,
        prompt
      }
      setHistory(prev => [newItem, ...prev])
      
      toast({
        title: "Success!",
        description: "Image transformed successfully."
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to transform image.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTagClick = (tag: string) => {
    setPrompt(tag)
  }

  const handleHistoryClick = (item) => {
    setSourceImage(item.source)
    setPrompt(item.prompt)
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <Logo />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Controls */}
        <div className="space-y-6">
          <div>
            <label className="block mb-2">Image Source</label>
            <Input 
              placeholder="Enter image URL..."
              value={sourceImage}
              onChange={(e) => setSourceImage(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">Transformation Prompt</label>
            <Input 
              placeholder="Enter style prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">Quick Styles</label>
            <PromptTags onTagClick={handleTagClick} />
          </div>

          <Button 
            onClick={handleTransform}
            disabled={!sourceImage || !prompt || isLoading}
            className="w-full"
          >
            {isLoading ? "Transforming..." : "Transform Image"}
          </Button>
        </div>

        {/* Right Panel - History */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Transformation History</h2>
          <ImageHistory 
            history={history}
            onItemClick={handleHistoryClick}
          />
        </div>
      </div>
    </div>
  )
}
```

### Responsive Design with useMobile

```tsx
import { useMobile } from '@/hooks/use-mobile'

function ResponsiveLayout() {
  const isMobile = useMobile()
  
  return (
    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
      <div>Content 1</div>
      <div>Content 2</div>
    </div>
  )
}
```

### Toast Notifications

```tsx
import { useToast } from '@/hooks/use-toast'

function NotificationExample() {
  const { toast } = useToast()

  const showSuccess = () => {
    toast({
      title: "Success!",
      description: "Operation completed successfully."
    })
  }

  const showError = () => {
    toast({
      title: "Error!",
      description: "Something went wrong.",
      variant: "destructive"
    })
  }

  return (
    <div className="space-x-4">
      <Button onClick={showSuccess}>Success</Button>
      <Button onClick={showError}>Error</Button>
    </div>
  )
}
```

### Styling with cn Utility

```tsx
import { cn } from '@/lib/utils'

function StyledComponent({ isActive, className }: { 
  isActive: boolean
  className?: string 
}) {
  return (
    <div className={cn(
      // Base styles
      "px-4 py-2 rounded-md transition-colors",
      // Conditional styles
      isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700",
      // Override styles
      className
    )}>
      Content
    </div>
  )
}
```

---

## Advanced Patterns

### Custom Hooks

Create reusable logic with custom hooks:

```tsx
// hooks/use-image-upload.ts
import { useState } from 'react'

export function useImageUpload() {
  const [image, setImage] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

  const uploadImage = async (file: File) => {
    setIsUploading(true)
    try {
      // Upload logic here
      const url = await uploadToServer(file)
      setImage(url)
      return url
    } finally {
      setIsUploading(false)
    }
  }

  return { image, isUploading, uploadImage }
}
```

### Component Composition

Build complex UIs by composing simpler components:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function TransformationCard({ 
  title, 
  description, 
  onTransform, 
  children 
}: {
  title: string
  description: string
  onTransform: () => void
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        <Button onClick={onTransform} className="w-full">
          Transform
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Error Boundaries

Handle errors gracefully:

```tsx
// components/error-boundary.tsx
import { Component, ReactNode } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            Please refresh the page and try again.
          </AlertDescription>
        </Alert>
      )
    }

    return this.props.children
  }
}
```

---

## Development Workflow

### 1. Adding New Components

1. Create component in appropriate directory
2. Export from index file if needed
3. Add to documentation
4. Write tests if applicable

### 2. Styling Guidelines

- Use Tailwind CSS classes for styling
- Leverage design tokens from the theme
- Use `cn()` utility for conditional classes
- Follow shadcn/ui patterns for consistency

### 3. TypeScript Best Practices

- Define interfaces for component props
- Use proper event handler types
- Leverage type inference when possible
- Export types that might be reused

### 4. Performance Considerations

- Use React.memo for expensive components
- Implement proper loading states
- Optimize images and assets
- Use Next.js image optimization

---

## Testing

### Component Testing

```tsx
// __tests__/components/logo.test.tsx
import { render, screen } from '@testing-library/react'
import Logo from '@/components/logo'

describe('Logo', () => {
  it('renders the logo with correct text', () => {
    render(<Logo />)
    expect(screen.getByText('Ghiblify')).toBeInTheDocument()
    expect(screen.getByText('Transform your images with Ghibli magic')).toBeInTheDocument()
  })
})
```

### Hook Testing

```tsx
// __tests__/hooks/use-mobile.test.tsx
import { renderHook } from '@testing-library/react'
import { useMobile } from '@/hooks/use-mobile'

describe('useMobile', () => {
  it('returns true for mobile viewport', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    const { result } = renderHook(() => useMobile())
    expect(result.current).toBe(true)
  })
})
```

---

## Deployment

### Build Process

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

### Environment Variables

Create `.env.local` for local development:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
OPENAI_API_KEY=your_openai_key_here

# Image Upload
NEXT_PUBLIC_UPLOAD_URL=your_upload_service_url
```

### Vercel Deployment

The project is optimized for Vercel deployment:

1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically on push

---

## Troubleshooting

### Common Issues

1. **Hydration Errors**
   - Ensure SSR compatibility
   - Use `useEffect` for client-only code
   - Check theme provider setup

2. **Styling Issues**
   - Verify Tailwind CSS configuration
   - Check CSS variable definitions
   - Ensure proper class merging with `cn()`

3. **Type Errors**
   - Update TypeScript definitions
   - Check component prop interfaces
   - Verify import paths

### Performance Optimization

1. **Image Optimization**
   - Use Next.js Image component
   - Implement proper lazy loading
   - Optimize file sizes

2. **Bundle Size**
   - Use dynamic imports for large dependencies
   - Implement code splitting
   - Analyze bundle with Next.js analyzer

---

## Contributing

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add proper JSDoc comments for public APIs
- Ensure responsive design for all components

### Pull Request Process

1. Create feature branch
2. Implement changes with tests
3. Update documentation
4. Submit PR with clear description

---

This developer guide provides everything needed to work effectively with the Ghiblify codebase. For detailed API documentation, see `API_DOCUMENTATION.md`. For UI component details, see `UI_COMPONENTS_REFERENCE.md`.