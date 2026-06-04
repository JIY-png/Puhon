"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import {
  FileText,
  Gamepad2,
  Mic,
  Search,
  ChevronRight,
  Lock,
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
  const [guides] = useState<Guide[]>(initialGuides)
  const [searchQuery, setSearchQuery] = useState("")
  const [gameFilter, setGameFilter] = useState<string>("all")

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGame = gameFilter === "all" || guide.game === gameFilter
    return matchesSearch && matchesGame
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Strategy Guides</h1>
          <p className="text-muted-foreground">
            Game guides and family resources for PUHON members
          </p>
        </div>
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
                          <span className="text-xs text-muted-foreground">
                            Updated {new Date(guide.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    {guide.sections.map((section) => {
                      if (section.memberOnly) {
                        // For member-only, always show since this is member dashboard
                      }
                      return (
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
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
