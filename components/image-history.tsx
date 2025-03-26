"use client"

import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ImageHistoryProps {
  history: Array<{
    id: string
    source: string
    result: string
    prompt: string
  }>
  onItemClick: (item: { source: string; result: string; prompt: string }) => void
}

export default function ImageHistory({ history, onItemClick }: ImageHistoryProps) {
  const isMobile = useMobile()

  return (
    <ScrollArea className={cn(isMobile ? "h-[400px]" : "h-[500px]")}>
      <div className="grid gap-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 p-3 rounded-lg hover:bg-zinc-800 cursor-pointer transition-all duration-300 border border-transparent hover:border-zinc-700"
            onClick={() => onItemClick(item)}
          >
            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-zinc-700 shadow-sm">
              <img src={item.source || "/placeholder.svg"} alt="Source" className="w-full h-full object-cover" />
            </div>
            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-zinc-700 shadow-sm">
              <img src={item.result || "/placeholder.svg"} alt="Result" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white line-clamp-2 mb-1">{item.prompt}</p>
              <p className="text-xs text-zinc-400">{new Date().toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

