"use client"

import { useState } from "react"
import {
  Image as ImageIcon,
  Copy,
  Search,
  Plus,
  Download,
  Eye,
  Grid,
  List,
  Filter,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"

type PFPStyle = "Uniform" | "Event" | "Chibi" | "Others"

interface PFPTemplate {
  id: string
  name: string
  style: PFPStyle
  previewUrl: string
  downloads: number
  createdAt: string
  prompt?: string
}

const initialTemplates: PFPTemplate[] = [
  {
    id: "1",
    name: "PUHON Sun Uniform",
    style: "Uniform",
    previewUrl: "/placeholder.svg?height=200&width=200",
    downloads: 156,
    createdAt: "2024-03-01",
    prompt: "A clean golden sun design with PUHON text on a dark background"
  },
  {
    id: "2",
    name: "PUHON Chibi Sun",
    style: "Chibi",
    previewUrl: "/placeholder.svg?height=200&width=200",
    downloads: 89,
    createdAt: "2024-03-01",
    prompt: "A cute chibi-style golden sun with big eyes"
  },
  {
    id: "3",
    name: "PUHON Night Viper Uniform",
    style: "Uniform",
    previewUrl: "/placeholder.svg?height=200&width=200",
    downloads: 12,
    createdAt: "2024-03-01",
    prompt: "Stylized viper design with dark theme"
  },
  {
    id: "4",
    name: "Family Night Event",
    style: "Event",
    previewUrl: "/placeholder.svg?height=200&width=200",
    downloads: 45,
    createdAt: "2024-02-15",
    prompt: "Festive family night themed design with cozy colors"
  },
  {
    id: "5",
    name: "Tournament Winner Special",
    style: "Others",
    previewUrl: "/placeholder.svg?height=200&width=200",
    downloads: 23,
    createdAt: "2024-02-20",
    prompt: "Champion trophy design for tournament winners"
  },
  {
    id: "6",
    name: "Anniversary Special",
    style: "Others",
    previewUrl: "/placeholder.svg?height=200&width=200",
    downloads: 78,
    createdAt: "2024-01-15",
    prompt: "Anniversary special design with confetti and celebration elements"
  },
  {
    id: "7",
    name: "Gold Frame Uniform",
    style: "Uniform",
    previewUrl: "/placeholder.svg?height=200&width=200",
    downloads: 134,
    createdAt: "2024-02-01",
    prompt: "A simple golden frame for profile pictures"
  },
  {
    id: "8",
    name: "Chibi Dark Mode",
    style: "Chibi",
    previewUrl: "/placeholder.svg?height=200&width=200",
    downloads: 67,
    createdAt: "2024-02-10",
    prompt: "Cute chibi-style dark mode avatar"
  },
]

const styleConfig: Record<PFPStyle, { color: string; bgColor: string }> = {
  Uniform: { color: "text-blue-400", bgColor: "bg-blue-400/10" },
  Chibi: { color: "text-purple-400", bgColor: "bg-purple-400/10" },
  Event: { color: "text-green-400", bgColor: "bg-green-400/10" },
  Others: { color: "text-pink-400", bgColor: "bg-pink-400/10" },
}

export default function DashboardGalleryPage() {
  const [templates, setTemplates] = useState<PFPTemplate[]>(initialTemplates)
  const [searchQuery, setSearchQuery] = useState("")
  const [styleFilter, setStyleFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [previewTemplate, setPreviewTemplate] = useState<PFPTemplate | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStyle = styleFilter === "all" || template.style === styleFilter
    return matchesSearch && matchesStyle
  })

  const totalDownloads = templates.reduce((acc, t) => acc + t.downloads, 0)

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-primary" />
            PFP Gallery
          </h1>
          <p className="text-muted-foreground">
            Browse and download profile picture templates
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        <Card className="bg-card/50 border-border/50 glass-card">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <ImageIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gold-gradient">{templates.filter(t => t.style === "Uniform").length}</p>
                <p className="text-xs text-muted-foreground">Uniform</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50 glass-card">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-400/10 p-2">
                <ImageIcon className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{templates.filter(t => t.style === "Event").length}</p>
                <p className="text-xs text-muted-foreground">Event</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50 glass-card">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-400/10 p-2">
                <ImageIcon className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{templates.filter(t => t.style === "Chibi").length}</p>
                <p className="text-xs text-muted-foreground">Chibi</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50 glass-card">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-pink-400/10 p-2">
                <ImageIcon className="h-5 w-5 text-pink-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{templates.filter(t => t.style === "Others").length}</p>
                <p className="text-xs text-muted-foreground">Others</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 border-border/50 glass-card">
        <CardContent className="py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background/50 border-border/50"
              />
            </div>
            <Select value={styleFilter} onValueChange={setStyleFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-background/50 border-border/50">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Styles</SelectItem>
                <SelectItem value="Uniform">Uniform</SelectItem>
                <SelectItem value="Chibi">Chibi</SelectItem>
                <SelectItem value="Event">Event</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1 border border-border/50 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gallery */}
      {filteredTemplates.length === 0 ? (
        <Card className="bg-card/50 border-border/50 glass-card">
          <CardContent className="py-12 text-center text-muted-foreground">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No templates found</p>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredTemplates.map((template) => {
            const config = styleConfig[template.style]
            return (
              <Card
                key={template.id}
                className="bg-card/50 border-border/50 overflow-hidden group hover:border-primary/50 transition-colors glass-card"
              >
                <div className="aspect-square relative bg-secondary/50">
                  <Image
                    src={template.previewUrl}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10"
                      onClick={() => setPreviewTemplate(template)}
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className={`${config.bgColor} ${config.color} border-none text-xs`}>
                      {template.style}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm truncate">{template.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {template.downloads}
                    </span>
                  </div>
                  {template.prompt && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 text-xs h-8"
                      onClick={() => copyPrompt(template.prompt!, template.id)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      {copiedId === template.id ? "Copied!" : "Copy Prompt"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="bg-card/50 border-border/50 glass-card">
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {filteredTemplates.map((template) => {
                const config = styleConfig[template.style]
                return (
                  <div
                    key={template.id}
                    className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="h-16 w-16 relative rounded-lg overflow-hidden bg-secondary shrink-0">
                      <Image
                        src={template.previewUrl}
                        alt={template.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium">{template.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge className={`${config.bgColor} ${config.color} border-none text-xs`}>
                          {template.style}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Added {new Date(template.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {template.downloads}
                        </span>
                      </div>
                    </div>
                    {template.prompt && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyPrompt(template.prompt!, template.id)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        {copiedId === template.id ? "Copied!" : "Copy Prompt"}
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          {previewTemplate && (
            <>
              <DialogHeader>
                <DialogTitle>{previewTemplate.name}</DialogTitle>
                <DialogDescription>
                  <Badge
                    className={`${styleConfig[previewTemplate.style].bgColor} ${
                      styleConfig[previewTemplate.style].color
                    } border-none`}
                  >
                    {previewTemplate.style}
                  </Badge>
                </DialogDescription>
              </DialogHeader>
              <div className="aspect-square relative rounded-lg overflow-hidden bg-secondary">
                <Image
                  src={previewTemplate.previewUrl}
                  alt={previewTemplate.name}
                  fill
                  className="object-cover"
                />
              </div>
              {previewTemplate.prompt && (
                <div className="p-3 bg-background/50 rounded-lg border border-border/50 text-xs text-muted-foreground">
                  <strong>Prompt:</strong> {previewTemplate.prompt}
                </div>
              )}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Downloaded {previewTemplate.downloads} times</span>
                <span>Added {new Date(previewTemplate.createdAt).toLocaleDateString()}</span>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {previewTemplate.prompt && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => copyPrompt(previewTemplate.prompt!, previewTemplate.id)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {copiedId === previewTemplate.id ? "Copied!" : "Copy Prompt"}
                  </Button>
                )}
                <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
