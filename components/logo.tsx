import { Sparkles } from "lucide-react"

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-zinc-800 p-2.5 rounded-lg shadow-md">
        <Sparkles className="h-6 w-6 text-zinc-100" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-2xl text-zinc-100">Ghiblify</span>
        <span className="text-xs text-muted-foreground">Transform your images with Ghibli magic</span>
      </div>
    </div>
  )
}

