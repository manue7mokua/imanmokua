import { MapPin } from "lucide-react"

export function LocationDisplay() {
  return (
    <div className="flex items-center space-x-2">
      <span className="font-mono text-sm md:text-base">S.F</span>
      <span className="font-mono text-sm md:text-base text-muted-foreground">/</span>
      <span className="font-mono text-sm md:text-base">D.C</span>
      <MapPin className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}
