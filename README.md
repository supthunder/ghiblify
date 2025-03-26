# Ghiblify

Transform your images with Studio Ghibli-inspired styles using Ghiblify - a modern, responsive web application built with Next.js and Tailwind CSS.

## 🌟 Features

- **Image Transformation**: Upload any image and transform it with Studio Ghibli-inspired styles
- **Custom Prompts**: Edit the transformation prompt to customize the results
- **Suggested Tags**: Quick-add popular style tags to your prompts
- **History Tracking**: View your previous transformations in a scrollable gallery
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark Theme**: Beautiful zinc dark theme for a modern UI experience

## 🏗️ Project Structure

### Main Directories

- `/app` - Next.js app router components and pages
- `/components` - Reusable UI components
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and shared logic
- `/public` - Static assets
- `/styles` - Global styles and CSS utilities

### Key Files

- `app/page.tsx` - Main application page with the image upload and transformation UI
- `app/layout.tsx` - Root layout component that defines the app structure
- `app/globals.css` - Global CSS styles and theme configuration
- `components/ui/` - shadcn UI components for consistent design
- `tailwind.config.ts` - Tailwind CSS configuration with theme settings
- `next.config.mjs` - Next.js configuration

## 🖥️ Component Breakdown

### Image Upload

The app features a drag-and-drop image upload area that:
- Allows users to select images from their device
- Previews the uploaded image
- Validates image types and sizes

### Prompt Customization

Users can customize the transformation prompt through:
- A text area with the default "convert this image into studio ghibli style anime" prompt
- Quick-add tag buttons for popular styles like "photorealistic", "film photo", etc.
- Clear visual feedback when editing

### Image Generation

The image generation process:
- Validates that an image has been uploaded
- Shows a loading spinner during processing
- Displays the transformed image when complete
- Adds the new image to the transformation history

### History Gallery

The transformation history:
- Shows thumbnails of previous transformations
- Displays timestamps on hover
- Allows users to clear their history
- Scrolls horizontally to view multiple entries

## 🎨 Theme and Styling

The app uses a custom zinc dark theme with:
- Dark backgrounds for reduced eye strain
- High contrast text for readability
- Subtle hover effects for interactive elements
- Custom scrollbars for a polished look
- Responsive layouts that adapt to any screen size

## 🔍 Responsive Design

- **Desktop**: Side-by-side layout with the upload area and results displayed horizontally
- **Mobile**: Vertical stack layout for easy scrolling with optimized component sizes

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Technologies Used

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **TypeScript**: Statically typed JavaScript

## 📱 Mobile Support

The app is fully responsive and optimized for mobile devices with:
- Touch-friendly interface
- Vertical layout for smaller screens
- Appropriately sized buttons and inputs
- Smooth animations and transitions

## 🎯 Future Enhancements

- User authentication for saving transformations
- More style presets and advanced options
- Batch processing multiple images
- Sharing options for social media
- Additional image editing tools

---

Built with ✨ by [Your Name] 