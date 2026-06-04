"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Lock,
  Unlock,
  ChevronRight,
  Gamepad2,
  Mic,
  Search,
} from "lucide-react"

type GameType = "Space Werewolf" | "Mic Grab" | "General"

interface GuideSection {
  id: string
  title: string
  content: string
  memberOnly: boolean
}

interface Guide {
  id: string
  title: string
  description: string
  game: GameType
  sections: GuideSection[]
  updatedAt: string
}

const initialGuides: Guide[] = [
  {
    id: "1",
    title: "Space Werewolf Strategy Guide",
    description: "Comprehensive strategies for playing Space Werewolf effectively",
    game: "Space Werewolf",
    sections: [
      {
        id: "1a",
        title: "Task Faking Strategies",
        content:
          "Learn how to effectively fake tasks as an impostor. Always walk to a task, stand near it for the appropriate time, and walk away naturally. Common tasks are best to fake as they appear for everyone.",
        memberOnly: false,
      },
      {
        id: "1b",
        title: "Common Callouts",
        content:
          "Standard callouts used by PUHON members: 'Clear' - confirmed innocent, 'Sus' - suspicious behavior, 'Hard sus' - very suspicious, 'Self-report' - accusing someone of reporting their own kill.",
        memberOnly: false,
      },
      {
        id: "1c",
        title: "Advanced Impostor Tactics",
        content:
          "Stack kills during comms sabotage, double kills in electrical, light sabotage for isolated kills. Always have an alibi ready.",
        memberOnly: true,
      },
    ],
    updatedAt: "2024-03-10",
  },
  {
    id: "2",
    title: "Mic Grab Guide",
    description: "Tips and song lists for Mic Grab sessions",
    game: "Mic Grab",
    sections: [
      {
        id: "2a",
        title: "Song Selection Tips",
        content:
          "Choose songs that match your vocal range. Start with familiar songs before trying new ones. Keep a playlist of your go-to songs ready.",
        memberOnly: false,
      },
      {
        id: "2b",
        title: "Curated Song Lists",
        content:
          "Pop hits: Shape of You, Perfect, Thinking Out Loud. Ballads: All of Me, Say Something, Someone Like You. Upbeat: Uptown Funk, Happy, Shake It Off.",
        memberOnly: false,
      },
      {
        id: "2c",
        title: "PUHON Favorites",
        content:
          "Songs that always get the room going: Bohemian Rhapsody, Sweet Caroline, Don't Stop Believin', Mr. Brightside.",
        memberOnly: true,
      },
    ],
    updatedAt: "2024-03-08",
  },
  {
    id: "3",
    title: "Family Rules & Guidelines",
    description: "Official rules and expectations for PUHON members",
    game: "General",
    sections: [
      {
        id: "3a",
        title: "Code of Conduct",
        content:
          "Treat all members with respect. No harassment, bullying, or toxic behavior. Keep conversations friendly and inclusive.",
        memberOnly: false,
      },
      {
        id: "3b",
        title: "Activity Requirements",
        content:
          "Members are expected to participate in at least 2 events per month. Extended absences should be reported to leaders.",
        memberOnly: false,
      },
    ],
    updatedAt: "2024-03-01",
  },
]

const gameConfig: Record<GameType, { icon: typeof Gamepad2; color: string; bgColor: string }> = {
  "Space Werewolf": { icon: Gamepad2, color: "text-purple-400", bgColor: "bg-purple-400/10" },
  "Mic Grab": { icon: Mic, color: "text-pink-400", bgColor: "bg-pink-400/10" },
  General: { icon: FileText, color: "text-blue-400", bgColor: "bg-blue-400/10" },
}

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>(initialGuides)
  const [searchQuery, setSearchQuery] = useState("")
  const [gameFilter, setGameFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newGuide, setNewGuide] = useState({
    title: "",
    description: "",
    game: "General" as GameType,
  })

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGame = gameFilter === "all" || guide.game === gameFilter
    return matchesSearch && matchesGame
  })

  const handleAddGuide = () => {
    const guide: Guide = {
      id: Date.now().toString(),
      title: newGuide.title,
      description: newGuide.description,
      game: newGuide.game,
      sections: [],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    setGuides([guide, ...guides])
    setNewGuide({ title: "", description: "", game: "General" })
    setIsAddDialogOpen(false)
  }

  const handleDeleteGuide = (guideId: string) => {
    setGuides(guides.filter((g) => g.id !== guideId))
  }

  const handleToggleMemberOnly = (guideId: string, sectionId: string) => {
    setGuides(
      guides.map((g) =>
        g.id === guideId
          ? {
              ...g,
              sections: g.sections.map((s) =>
                s.id === sectionId ? { ...s, memberOnly: !s.memberOnly } : s
              ),
            }
          : g
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Strategy Guides</h1>
          <p className="text-muted-foreground">
            Manage game guides and family resources
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Guide
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Create New Guide</DialogTitle>
              <DialogDescription>
                Add a new strategy guide or resource document.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newGuide.title}
                  onChange={(e) => setNewGuide({ ...newGuide, title: e.target.value })}
                  placeholder="e.g., Advanced Werewolf Tactics"
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newGuide.description}
                  onChange={(e) => setNewGuide({ ...newGuide, description: e.target.value })}
                  placeholder="Brief description of the guide..."
                  className="bg-secondary border-border"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="game">Category</Label>
                <Select
                  value={newGuide.game}
                  onValueChange={(value: GameType) => setNewGuide({ ...newGuide, game: value })}
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Space Werewolf">Space Werewolf</SelectItem>
                    <SelectItem value="Mic Grab">Mic Grab</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-border">
                Cancel
              </Button>
              <Button
                onClick={handleAddGuide}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!newGuide.title}
              >
                Create Guide
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{guides.length}</p>
                <p className="text-xs text-muted-foreground">Total Guides</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {(Object.entries(gameConfig) as [GameType, typeof gameConfig[GameType]][]).map(
          ([game, config]) => {
            const count = guides.filter((g) => g.game === game).length
            return (
              <Card key={game} className="bg-card border-border">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 ${config.bgColor}`}>
                      <config.icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{count}</p>
                      <p className="text-xs text-muted-foreground">{game}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          }
        )}
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border"
              />
            </div>
            <Select value={gameFilter} onValueChange={setGameFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-secondary border-border">
                <SelectValue placeholder="Filter by game" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Space Werewolf">Space Werewolf</SelectItem>
                <SelectItem value="Mic Grab">Mic Grab</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Guides List */}
      <div className="space-y-4">
        {filteredGuides.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="py-8 text-center text-muted-foreground">
              No guides found
            </CardContent>
          </Card>
        ) : (
          filteredGuides.map((guide) => {
            const config = gameConfig[guide.game]
            const memberOnlyCount = guide.sections.filter((s) => s.memberOnly).length

            return (
              <Card key={guide.id} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`rounded-lg ${config.bgColor} p-2.5`}>
                        <config.icon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-foreground">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge className={`${config.bgColor} ${config.color} border-none`}>
                            {guide.game}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {guide.sections.length} sections
                          </span>
                          {memberOnlyCount > 0 && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Lock className="h-3 w-3" />
                              {memberOnlyCount} member-only
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            Updated {new Date(guide.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteGuide(guide.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    {guide.sections.map((section) => (
                      <AccordionItem
                        key={section.id}
                        value={section.id}
                        className="border-border"
                      >
                        <AccordionTrigger className="hover:no-underline py-3">
                          <div className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">{section.title}</span>
                            {section.memberOnly && (
                              <Badge
                                variant="outline"
                                className="ml-2 text-xs border-primary/50 text-primary"
                              >
                                <Lock className="mr-1 h-3 w-3" />
                                Members Only
                              </Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <div className="pl-6 space-y-3">
                            <p className="text-sm text-muted-foreground">{section.content}</p>
                            <div className="flex items-center justify-between pt-2 border-t border-border">
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={section.memberOnly}
                                  onCheckedChange={() =>
                                    handleToggleMemberOnly(guide.id, section.id)
                                  }
                                />
                                <Label className="text-xs text-muted-foreground cursor-pointer">
                                  {section.memberOnly ? (
                                    <span className="flex items-center gap-1">
                                      <Lock className="h-3 w-3" /> Members Only
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1">
                                      <Unlock className="h-3 w-3" /> Public
                                    </span>
                                  )}
                                </Label>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="h-7 text-xs">
                                  <Edit className="mr-1 h-3 w-3" />
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <Button variant="ghost" size="sm" className="mt-3 text-primary hover:text-primary/80">
                    <Plus className="mr-1 h-4 w-4" />
                    Add Section
                  </Button>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
