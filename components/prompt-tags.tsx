"use client"

import { Badge } from "@/components/ui/badge"

interface PromptTagsProps {
  onTagClick: (tag: string) => void
}

export default function PromptTags({ onTagClick }: PromptTagsProps) {
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
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="cursor-pointer bg-transparent border-zinc-600 hover:bg-zinc-800 text-white rounded-full px-4 py-1.5"
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}

