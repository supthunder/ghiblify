"use client"

import type React from "react"

import { useState, useCallback, useEffect, useRef } from "react"
import { Sparkles, ImageIcon, Moon, Sun, X, Plus, ChevronLeft, ChevronRight } from "lucide-react"
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
  const [history, setHistory] = useState<Array<{ id: string; source: string; result: string; prompt: string }>>([])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize dark mode
  useEffect(() => {
    // Always start with dark mode
    document.documentElement.classList.add("dark")
  }, [])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev
      if (newMode) {
        document.documentElement.classList.add("dark")
        document.documentElement.classList.remove("light")
      } else {
        document.documentElement.classList.add("light")
        document.documentElement.classList.remove("dark")
      }
      return newMode
    })
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
    if (!sourceImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      })
      return
    }

    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt for the transformation",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // In a real app, this would call an API endpoint that uses the AI SDK
      const result = await transformImage(sourceImage, prompt)

      // Add to history
      const newHistoryItem = {
        id: Date.now().toString(),
        source: sourceImage,
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

  const navigateHistory = useCallback(
    (direction: "prev" | "next") => {
      if (history.length === 0) return

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
    [history.length],
  )

  const loadHistoryItem = useCallback(
    (index: number) => {
      if (history.length === 0 || index >= history.length) return

      const item = history[index]
      setSourceImage(item.source)
      setPrompt(item.prompt)
    },
    [history],
  )

  // Current displayed image from history
  const currentImage = history.length > 0 ? history[currentHistoryIndex].result : null

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800 sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className={cn("grid gap-8", isMobile ? "grid-cols-1" : "grid-cols-2")}>
          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg">
              <div className="p-6 space-y-5">
                <h2 className="text-xl font-semibold text-white">Transform Your Image</h2>

                <div className="space-y-4">
                  {/* Integrated Input Area with Image Upload */}
                  <div
                    {...getRootProps()}
                    className={cn(
                      "relative rounded-2xl bg-zinc-800 border border-zinc-700 transition-all duration-300 overflow-hidden",
                      isDragActive ? "border-zinc-500" : "hover:border-zinc-600",
                    )}
                  >
                    <input {...getInputProps()} />

                    <div className="flex items-center p-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-10 w-10 flex-shrink-0 bg-transparent hover:bg-zinc-700"
                        onClick={open}
                      >
                        <Plus className="h-5 w-5 text-zinc-400" />
                      </Button>

                      <Textarea
                        placeholder="Enter your transformation prompt..."
                        value={prompt}
                        onChange={handlePromptChange}
                        className="min-h-[50px] max-h-[200px] bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-zinc-400 resize-none py-3 px-2"
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-10 w-10 flex-shrink-0 bg-zinc-700 hover:bg-zinc-600"
                        onClick={handleGenerate}
                        disabled={isGenerating || !sourceImage}
                      >
                        {isGenerating ? (
                          <Sparkles className="h-5 w-5 text-zinc-300 animate-spin" />
                        ) : (
                          <Sparkles className="h-5 w-5 text-zinc-300" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Image Preview */}
                  {sourceImage && (
                    <div className="relative rounded-xl overflow-hidden border border-zinc-700 h-[200px]">
                      <img
                        src={sourceImage || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-3 right-3 rounded-full shadow-lg opacity-90 hover:opacity-100"
                        onClick={handleClearImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-zinc-400">Suggested Tags</h3>
                    <PromptTags onTagClick={handleTagClick} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg">
              <div className="p-6 space-y-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">Generated Image</h2>

                  {history.length > 0 && (
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="text-sm">
                        {currentHistoryIndex + 1} of {history.length}
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative aspect-square rounded-xl border border-dashed border-zinc-700 flex items-center justify-center bg-zinc-800 overflow-hidden transition-all duration-300">
                  {currentImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={currentImage || "/placeholder.svg"}
                        alt="Generated"
                        className="w-full h-full object-contain"
                      />

                      {/* Navigation arrows */}
                      {history.length > 1 && (
                        <>
                          {currentHistoryIndex < history.length - 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80"
                              onClick={() => navigateHistory("prev")}
                            >
                              <ChevronLeft className="h-6 w-6 text-white" />
                            </Button>
                          )}

                          {currentHistoryIndex > 0 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80"
                              onClick={() => navigateHistory("next")}
                            >
                              <ChevronRight className="h-6 w-6 text-white" />
                            </Button>
                          )}
                        </>
                      )}

                      {/* Navigation dots */}
                      {history.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {history.map((_, index) => (
                            <button
                              key={index}
                              className={cn(
                                "w-2 h-2 rounded-full transition-all",
                                index === currentHistoryIndex ? "bg-white w-4" : "bg-zinc-500 hover:bg-zinc-400",
                              )}
                              onClick={() => setCurrentHistoryIndex(index)}
                            />
                          ))}
                        </div>
                      )}

                      {/* Prompt display */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-zinc-900/90 to-transparent p-4 pt-8">
                        <p className="text-sm text-white line-clamp-2">{history[currentHistoryIndex].prompt}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-12 text-zinc-400">
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <div className="absolute inset-0 bg-zinc-700 rounded-full opacity-50 animate-pulse-slow"></div>
                        <ImageIcon className="relative z-10 w-full h-full p-6 text-zinc-300" />
                      </div>
                      <p className="text-lg">Your Ghibli-inspired creation will appear here</p>
                    </div>
                  )}
                </div>

                {/* Thumbnail navigation */}
                {history.length > 1 && (
                  <div className="overflow-x-auto pb-2">
                    <div className="flex gap-2">
                      {history.map((item, index) => (
                        <button
                          key={item.id}
                          className={cn(
                            "flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                            index === currentHistoryIndex ? "border-white" : "border-transparent hover:border-zinc-600",
                          )}
                          onClick={() => setCurrentHistoryIndex(index)}
                        >
                          <img
                            src={item.result || "/placeholder.svg"}
                            alt={`Generation ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

