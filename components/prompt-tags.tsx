"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface PromptTagsProps {
  onTagClick: (tag: string) => void
  className?: string
}

export default function PromptTags({ onTagClick, className }: PromptTagsProps) {
  const tags = [
    "studio ghibli style",
    "photorealistic",
    "iphone selfie",
    "cartoon line drawing",
    "naruto style",
    "film photo",
    "90s film",
    "michelangelo painting",
    "watercolor",
    "pixel art",
    "cyberpunk",
    "vaporwave",
    "oil painting",
    "pencil sketch",
    "ukiyo-e",
    "pop art",
    "impressionist",
    "low poly",
    "isometric",
    "retro game",
  ]

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="cursor-pointer bg-transparent border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-300 rounded-full px-2.5 py-0.5 text-xs transition-colors"
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}

