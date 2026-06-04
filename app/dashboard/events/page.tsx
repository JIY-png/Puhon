"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  Users,
  Gamepad2,
  MapPin,
  Trophy,
  Mic,
  Crosshair,
  PartyPopper,
  CheckCircle2,
  XCircle,
  Swords,
  ScrollText,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DashboardEvent {
  id: number
  title: string
  game: string
  date: string
  time: string
  description: string
  type: "tournament" | "practice" | "social" | "meeting"
  maxPlayers: number
  currentPlayers: number
  location: string
  strategyNotes: string
  attendees: string[]
}

const events: DashboardEvent[] = [
  {
    id: 1,
    title: "Space Werewolf Championship",
    game: "Space Werewolf",
    date: "June 15, 2024",
    time: "8:00 PM PHT",
    description: "Monthly championship tournament. Top 3 players earn exclusive family badges and bragging rights!",
    type: "tournament",
    maxPlayers: 20,
    currentPlayers: 14,
    location: "WePlay Room #PUHON",
    strategyNotes: "Focus on role-claim meta. Expect aggressive wolf play. Review the Seer guide before joining.",
    attendees: ["ShadowKing", "LunarStrike", "BlazeHunter", "NightViper", "CrystalFang", "IronWolf"],
  },
  {
    id: 2,
    title: "Mic Grab Practice Night",
    game: "Mic Grab",
    date: "June 18, 2024",
    time: "9:00 PM PHT",
    description: "Weekly practice session to sharpen your Mic Grab skills. Open to all members.",
    type: "practice",
    maxPlayers: 15,
    currentPlayers: 8,
    location: "WePlay Room #PUHON-Practice",
    strategyNotes: "We'll focus on zone control and relay passing this week. Bring your A-game!",
    attendees: ["LunarStrike", "StormBreaker", "PhantomAce", "FrostBlade"],
  },
  {
    id: 3,
    title: "Family Game Night",
    game: "Mixed Games",
    date: "June 22, 2024",
    time: "7:30 PM PHT",
    description: "A relaxed evening of fun games, laughs, and bonding. No pressure, just vibes!",
    type: "social",
    maxPlayers: 30,
    currentPlayers: 22,
    location: "WePlay Main Lobby",
    strategyNotes: "No strategy needed — just come have fun! We'll vote on which games to play.",
    attendees: ["ShadowKing", "BlazeHunter", "CrystalFang", "ThunderBolt", "EmberKnight"],
  },
  {
    id: 4,
    title: "Strategy Workshop: Werewolf Roles",
    game: "Space Werewolf",
    date: "June 25, 2024",
    time: "8:30 PM PHT",
    description: "Deep dive into advanced werewolf role strategies led by our veteran strategists.",
    type: "meeting",
    maxPlayers: 25,
    currentPlayers: 10,
    location: "WePlay Room #PUHON-Academy",
    strategyNotes: "Prepare questions about specific roles. We'll cover Doctor, Sheriff, and Hunter in depth.",
    attendees: ["ShadowKing", "NightViper", "BlazeHunter"],
  },
]

const typeConfig = {
  tournament: { label: "Tournament", icon: Trophy, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  practice: { label: "Practice", icon: Crosshair, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
  social: { label: "Social", icon: PartyPopper, color: "text-pink-400", bg: "bg-pink-400/10 border-pink-400/30" },
  meeting: { label: "Meeting", icon: Mic, color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/30" },
}

export default function DashboardEventsPage() {
  const [rsvps, setRsvps] = useState<Record<number, boolean>>({})

  const toggleRsvp = (eventId: number) => {
    setRsvps((prev) => ({ ...prev, [eventId]: !prev[eventId] }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Events & RSVP
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Full event details, strategy notes, and RSVP management. Members only.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card/50 border-border/50 glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xl font-bold">{events.length}</p>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50 glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold">{Object.values(rsvps).filter(Boolean).length}</p>
              <p className="text-xs text-muted-foreground">Your RSVPs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50 glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-xl font-bold">{events.filter((e) => e.type === "tournament").length}</p>
              <p className="text-xs text-muted-foreground">Tournaments</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events */}
      <div className="space-y-4">
        {events.map((event) => {
          const config = typeConfig[event.type]
          const TypeIcon = config.icon
          const isRsvpd = rsvps[event.id] || false
          const fillPercent = Math.round(
            ((event.currentPlayers + (isRsvpd ? 1 : 0)) / event.maxPlayers) * 100
          )

          return (
            <Card key={event.id} className="bg-card/50 border-border/50 glass-card">
              <CardContent className="p-5">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Main Info */}
                  <div className="md:col-span-2 space-y-3">
                    {/* Type & Game */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${config.bg}`}>
                        <TypeIcon className={`w-3 h-3 ${config.color}`} />
                        <span className={config.color}>{config.label}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-secondary/50">
                        <Gamepad2 className="w-3 h-3 mr-1" />
                        {event.game}
                      </Badge>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>

                    {/* Meta */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Strategy Notes */}
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-2 mb-1">
                        <ScrollText className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-primary">Strategy Notes</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.strategyNotes}</p>
                    </div>
                  </div>

                  {/* Right Side - RSVP & Attendees */}
                  <div className="space-y-4">
                    {/* RSVP Button */}
                    <Button
                      onClick={() => toggleRsvp(event.id)}
                      className={`w-full ${
                        isRsvpd
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : ""
                      }`}
                      variant={isRsvpd ? "default" : "outline"}
                    >
                      {isRsvpd ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          RSVP&apos;d ✓
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Swords className="w-4 h-4" />
                          RSVP Now
                        </span>
                      )}
                    </Button>

                    {/* Player Count */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>
                            {event.currentPlayers + (isRsvpd ? 1 : 0)}/{event.maxPlayers}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{fillPercent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-secondary/50 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500"
                          style={{ width: `${fillPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Attendee List */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Confirmed Attendees</p>
                      <div className="space-y-1.5">
                        {event.attendees.map((name) => (
                          <div key={name} className="flex items-center gap-2 text-sm">
                            <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                              {name[0]}
                            </div>
                            <span className="text-muted-foreground">{name}</span>
                          </div>
                        ))}
                        {isRsvpd && (
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
                              Y
                            </div>
                            <span className="text-emerald-400">You</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
