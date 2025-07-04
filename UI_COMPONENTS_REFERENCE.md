# UI Components Reference

> Complete reference for all shadcn/ui components used in the Ghiblify project

## Overview

This project uses the shadcn/ui component library, which provides beautifully designed, accessible, and customizable React components built on Radix UI primitives and styled with Tailwind CSS.

## Components Index

### Layout & Structure
- [Accordion](#accordion)
- [Card](#card)
- [Separator](#separator)
- [Tabs](#tabs)
- [Collapsible](#collapsible)
- [Resizable](#resizable)

### Navigation
- [Breadcrumb](#breadcrumb)
- [Navigation Menu](#navigation-menu)
- [Menubar](#menubar)
- [Pagination](#pagination)

### Data Display
- [Avatar](#avatar)
- [Badge](#badge)
- [Calendar](#calendar)
- [Chart](#chart)
- [Progress](#progress)
- [Skeleton](#skeleton)
- [Table](#table)

### Forms & Input
- [Checkbox](#checkbox)
- [Form](#form)
- [Input OTP](#input-otp)
- [Label](#label)
- [Radio Group](#radio-group)
- [Select](#select)
- [Slider](#slider)
- [Switch](#switch)
- [Textarea](#textarea)

### Feedback & Overlays
- [Alert](#alert)
- [Alert Dialog](#alert-dialog)
- [Dialog](#dialog)
- [Drawer](#drawer)
- [Hover Card](#hover-card)
- [Popover](#popover)
- [Sheet](#sheet)
- [Tooltip](#tooltip)

### Interactive
- [Command](#command)
- [Context Menu](#context-menu)
- [Dropdown Menu](#dropdown-menu)
- [Toggle](#toggle)
- [Toggle Group](#toggle-group)

### Media & Carousel
- [Aspect Ratio](#aspect-ratio)
- [Carousel](#carousel)

### Scrolling & Areas
- [Scroll Area](#scroll-area)

---

## Component Documentation

### Accordion

Collapsible content sections.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function AccordionExample() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other components.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

**Props:**
- `type`: "single" | "multiple" - Whether multiple items can be open
- `collapsible`: boolean - Whether items can be collapsed
- `defaultValue`: string | string[] - Default open items

---

### Alert

Display important messages to users.

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

function AlertExample() {
  return (
    <>
      {/* Default alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>

      {/* Destructive alert */}
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </>
  )
}
```

**Variants:**
- `default`: Standard alert styling
- `destructive`: Error/warning styling

---

### Avatar

Display user profile pictures or initials.

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

function AvatarExample() {
  return (
    <>
      {/* With image */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* Fallback only */}
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </>
  )
}
```

---

### Badge

Display tags, labels, or status indicators.

```tsx
import { Badge } from "@/components/ui/badge"

function BadgeExample() {
  return (
    <>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </>
  )
}
```

**Variants:**
- `default`: Primary badge style
- `secondary`: Muted badge style
- `outline`: Outlined badge
- `destructive`: Error/warning badge

---

### Calendar

Date picker component.

```tsx
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

function CalendarExample() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}
```

**Props:**
- `mode`: "single" | "multiple" | "range"
- `selected`: Selected date(s)
- `onSelect`: Callback when date is selected
- `disabled`: Disable specific dates

---

### Card

Container for related content.

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function CardExample() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            {/* Form content */}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
```

---

### Checkbox

Binary choice input.

```tsx
import { Checkbox } from "@/components/ui/checkbox"

function CheckboxExample() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label htmlFor="terms" className="text-sm font-medium">
        Accept terms and conditions
      </label>
    </div>
  )
}
```

**Props:**
- `checked`: boolean | "indeterminate"
- `onCheckedChange`: Callback when state changes
- `disabled`: boolean

---

### Command

Command palette for search and navigation.

```tsx
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

function CommandExample() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
```

---

### Dialog

Modal dialog for important content.

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Dialog content */}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

---

### Dropdown Menu

Context menu with actions.

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function DropdownMenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

### Form

Form with validation and error handling.

```tsx
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"

function FormExample() {
  const form = useForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

---

### Select

Dropdown selection component.

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function SelectExample() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

---

### Tabs

Organize content into multiple sections.

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function TabsExample() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p>Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p>Change your password here.</p>
      </TabsContent>
    </Tabs>
  )
}
```

---

### Textarea

Multi-line text input.

```tsx
import { Textarea } from "@/components/ui/textarea"

function TextareaExample() {
  return (
    <Textarea 
      placeholder="Type your message here." 
      className="resize-none"
    />
  )
}
```

**Props:**
- All standard HTML textarea attributes
- `className`: Additional CSS classes
- `resize`: Control resize behavior

---

### Tooltip

Contextual information on hover.

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function TooltipExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

---

## Theme Integration

All components support dark/light themes through CSS variables. The theme is managed by the `ThemeProvider` component:

```tsx
// In your layout or root component
import { ThemeProvider } from "@/components/theme-provider"

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Accessibility

All components are built with accessibility in mind:

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA attributes
- **Focus Management**: Logical focus order
- **Color Contrast**: WCAG compliant colors

## Customization

Components can be customized through:

1. **CSS Variables**: Modify theme colors and spacing
2. **Tailwind Classes**: Override default styles
3. **Variants**: Use built-in component variants
4. **Custom Variants**: Create new variants using CVA

```tsx
// Example: Custom button variant
const buttonVariants = cva(
  "base-styles",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        custom: "bg-purple-500 text-white hover:bg-purple-600"
      }
    }
  }
)
```

## Best Practices

1. **Consistent Spacing**: Use the design system's spacing scale
2. **Proper Nesting**: Follow component composition patterns
3. **Accessibility**: Always include proper labels and ARIA attributes
4. **Performance**: Use `asChild` prop when wrapping components
5. **Type Safety**: Leverage TypeScript for better development experience

---

This reference covers all the major UI components available in the Ghiblify project. Each component is designed to work seamlessly together while maintaining accessibility and design consistency.