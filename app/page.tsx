"use client"

import type React from "react"

import { useState, useCallback, useEffect, useRef } from "react"
import { Sparkles, ImageIcon, X, Plus, ChevronLeft, ChevronRight, Download, Share2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import PromptTags from "@/components/prompt-tags"
import Logo from "@/components/logo"
import { transformImage } from "@/lib/transform-image"
import { useDropzone } from "react-dropzone"

export default function Home() {
  const { toast } = useToast()
  const isMobile = useMobile()
  const [sourceImage, setSourceImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<string>("convert this image into studio ghibli style anime")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [history, setHistory] = useState<Array<{ id: string; source: string; result: string; prompt: string }>>([])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Touch swipe handling
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  
  // Current displayed image from history (moved up to fix reference in handleEdit)
  const currentImage = history.length > 0 ? history[currentHistoryIndex].result : null
  
  // Handle swipe transition animation
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setSwipeDirection(null)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  // Initialize dark mode - always use dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = reader.result as string
        setSourceImage(dataUrl)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
  })

  const handlePromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }, [])

  const handleTagClick = useCallback((tag: string) => {
    setPrompt((prev) => {
      if (prev.endsWith(" ") || prev === "") {
        return prev + tag
      } else {
        return prev + " " + tag
      }
    })
  }, [])

  const handleClearImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setSourceImage(null)
  }, [])

  const handleGenerate = useCallback(async () => {
    if (!sourceImage && !prompt.trim()) {
      toast({
        title: "Missing input",
        description: "Please enter a prompt or upload an image",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // In a real app, this would call an API endpoint that uses the AI SDK
      const result = await transformImage(sourceImage || '', prompt)

      // Add to history
      const newHistoryItem = {
        id: Date.now().toString(),
        source: sourceImage || "",
        result: result,
        prompt: prompt,
      }

      setHistory((prev) => [newHistoryItem, ...prev])
      setCurrentHistoryIndex(0) // Set to the newest item
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your image",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }, [sourceImage, prompt, toast])
  
  const handleEdit = useCallback(async () => {
    // Get the current image from the history at the current index
    const imageToEdit = history.length > 0 ? history[currentHistoryIndex].result : null
    
    if (!imageToEdit) {
      toast({
        title: "No image to edit",
        description: "Please generate an image first",
        variant: "destructive",
      })
      return
    }
    
    if (!prompt.trim()) {
      toast({
        title: "Missing edit instructions",
        description: "Please enter instructions for editing",
        variant: "destructive",
      })
      return
    }

    setIsEditing(true)

    try {
      // Use the current result as the source image for editing
      // In a real app, this would call an API endpoint that uses the AI SDK
      const result = await transformImage(imageToEdit, prompt)

      // Add to history
      const newHistoryItem = {
        id: Date.now().toString(),
        source: imageToEdit,
        result: result,
        prompt: prompt,
      }

      setHistory((prev) => [newHistoryItem, ...prev])
      setCurrentHistoryIndex(0) // Set to the newest item
    } catch (error) {
      toast({
        title: "Edit failed",
        description: "There was an error editing your image",
        variant: "destructive",
      })
    } finally {
      setIsEditing(false)
    }
  }, [history, currentHistoryIndex, prompt, toast])

  const navigateHistory = useCallback(
    (direction: "prev" | "next") => {
      if (history.length <= 1) return

      setIsTransitioning(true)
      setSwipeDirection(direction === "prev" ? "left" : "right")

      setCurrentHistoryIndex((prevIndex) => {
        if (direction === "prev") {
          // Go to previous (older) image
          return Math.min(prevIndex + 1, history.length - 1)
        } else {
          // Go to next (newer) image
          return Math.max(prevIndex - 1, 0)
        }
      })
    },
    [history.length]
  )
  
  // Touch event handlers for swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (history.length <= 1) return
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = null
  }, [history.length])
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartX.current) return
    touchEndX.current = e.touches[0].clientX
  }, [])
  
  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) {
      touchStartX.current = null
      touchEndX.current = null
      return
    }
    
    const diffX = touchEndX.current - touchStartX.current
    
    // Check if the swipe was significant enough (at least 50px)
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swiped right - go to previous (older) image
        if (currentHistoryIndex < history.length - 1) {
          navigateHistory("prev")
        }
      } else {
        // Swiped left - go to next (newer) image
        if (currentHistoryIndex > 0) {
          navigateHistory("next")
        }
      }
    }
    
    touchStartX.current = null
    touchEndX.current = null
  }, [currentHistoryIndex, history.length, navigateHistory])

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-1 pt-8 max-w-6xl">
        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8 shadow-xl">
          <h1 className="text-xl font-medium mb-5">
            Ghiblify - 4o Image Generation
          </h1>
          
          <div className={cn("grid gap-6", isMobile ? "grid-cols-1" : "grid-cols-5")}>
            {/* Left Column - Input */}
            <div className="space-y-6 col-span-2">
              {/* Prompt Input with integrated image upload */}
              <div 
                {...getRootProps()}
                className={cn(
                  "relative rounded-xl border border-zinc-800/70 bg-zinc-900 overflow-hidden transition-all",
                  isDragActive ? "border-zinc-500 shadow-lg shadow-zinc-800/20" : "hover:border-zinc-700"
                )}
              >
                <input {...getInputProps()} />
                
                <div className="relative">
                  <Textarea
                    placeholder="Enter your prompt here..."
                    value={prompt}
                    onChange={handlePromptChange}
                    className="min-h-[100px] bg-transparent border-0 rounded-none text-white placeholder:text-zinc-500 resize-none p-4 pr-12 focus-visible:ring-0"
                  />
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-3 rounded-full h-8 w-8 bg-zinc-900/90 hover:bg-zinc-800/80"
                    onClick={(e) => {
                      e.stopPropagation()
                      open()
                    }}
                  >
                    <Plus className="h-4 w-4 text-zinc-400" />
                  </Button>
                </div>
                
                {/* Image Preview */}
                {sourceImage && (
                  <div className="relative border-t border-zinc-800/50 h-48">
                    <img
                      src={sourceImage}
                      alt="Source image"
                      className="w-full h-full object-contain p-2"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 rounded-full h-6 w-6 bg-zinc-800/80 hover:bg-zinc-700 border-none"
                      onClick={handleClearImage}
                    >
                      <X className="h-3 w-3 text-zinc-300" />
                    </Button>
                  </div>
                )}
                
                <div className="border-t border-zinc-800/50 p-2 flex justify-between items-center">
                  <p className="text-xs text-zinc-500 ml-2">
                    {isDragActive ? "Drop image here" : "Drag & drop or click + to upload an image"}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="rounded-full bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-1.5 h-auto text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleGenerate()
                      }}
                      disabled={isGenerating || isEditing}
                    >
                      {isGenerating ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                          <span>Generating...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          <span>Generate</span>
                        </div>
                      )}
                    </Button>
                    
                    <Button 
                      className="rounded-full bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-1.5 h-auto text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEdit()
                      }}
                      disabled={isGenerating || isEditing || !currentImage}
                    >
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                          <span>Editing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Pencil className="h-4 w-4" />
                          <span>Edit</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Suggested tags */}
              <div className="space-y-3">
                <h2 className="text-sm font-medium text-zinc-400">Suggested Tags</h2>
                <PromptTags onTagClick={handleTagClick} className="opacity-80" />
              </div>
            </div>
            
            {/* Right Column - Result Image */}
            <div className="col-span-3 space-y-4">
              {/* Swipeable image container */}
              <div 
                className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800/70 touch-manipulation cursor-grab"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {currentImage ? (
                  <div className="relative w-full h-full">
                    <div 
                      className={cn(
                        "absolute inset-0 transition-transform duration-300 ease-in-out",
                        isTransitioning && swipeDirection === "left" && "translate-x-[-100%]",
                        isTransitioning && swipeDirection === "right" && "translate-x-[100%]"
                      )}
                    >
                      <img
                        src={currentImage}
                        alt="Generated result"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Navigation indicators */}
                    {history.length > 1 && (
                      <>
                        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-zinc-900/60 to-transparent pointer-events-none flex items-center justify-between px-4">
                          <div className="text-xs text-white/80 backdrop-blur-sm bg-zinc-900/40 py-1 px-3 rounded-full">
                            {currentHistoryIndex + 1} / {history.length}
                          </div>
                          
                          <div className="text-xs text-white/80 backdrop-blur-sm bg-zinc-900/40 py-1 px-3 rounded-full">
                            Swipe to navigate
                          </div>
                        </div>
                        
                        <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          {currentHistoryIndex < history.length - 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full bg-zinc-900/40 backdrop-blur-sm"
                              onClick={() => navigateHistory("prev")}
                            >
                              <ChevronLeft className="h-5 w-5 text-white" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          {currentHistoryIndex > 0 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full bg-zinc-900/40 backdrop-blur-sm"
                              onClick={() => navigateHistory("next")}
                            >
                              <ChevronRight className="h-5 w-5 text-white" />
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center">
                    <Sparkles className="h-10 w-10 text-zinc-600 mb-4" />
                    <p className="text-zinc-400">Your Ghibli-inspired creation will appear here</p>
                  </div>
                )}
              </div>
              
              {/* Image Actions */}
              {currentImage && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800"
                  >
                    <Download className="h-4 w-4 text-zinc-300" />
                  </Button>
                  
                  <Button className="flex-1 rounded-full bg-zinc-800 hover:bg-zinc-700">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              )}
              
              {/* History */}
              {history.length > 0 && (
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-sm font-medium text-zinc-400">History</h2>
                    
                    {history.length > 1 && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full h-7 w-7 bg-zinc-900/50"
                          onClick={() => navigateHistory("prev")}
                          disabled={currentHistoryIndex >= history.length - 1}
                        >
                          <ChevronLeft className="h-4 w-4 text-zinc-400" />
                        </Button>
                        <span className="text-xs text-zinc-500">{currentHistoryIndex + 1}/{history.length}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full h-7 w-7 bg-zinc-900/50"
                          onClick={() => navigateHistory("next")}
                          disabled={currentHistoryIndex <= 0}
                        >
                          <ChevronRight className="h-4 w-4 text-zinc-400" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                    {history.map((item, index) => (
                      <button
                        key={item.id}
                        className={cn(
                          "h-24 w-24 rounded-lg flex-shrink-0 overflow-hidden border-2 transition-all",
                          index === currentHistoryIndex ? "border-zinc-400" : "border-transparent"
                        )}
                        onClick={() => setCurrentHistoryIndex(index)}
                      >
                        <img
                          src={item.result}
                          alt={`History ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

