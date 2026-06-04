"use client"

import { useState } from "react"
import {
  Crown,
  Calendar,
  Clock,
  Users,
  Gamepad2,
  ChevronDown,
  LogIn,
  MapPin,
  Trophy,
  Mic,
  Crosshair,
  PartyPopper,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

interface GameEvent {
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
}

const upcomingEvents: GameEvent[] = [
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
  },
  {
    id: 2,
    title: "Mic Grab Practice Night",
    game: "Mic Grab",
    date: "June 18, 2024",
    time: "9:00 PM PHT",
    description: "Weekly practice session to sharpen your Mic Grab skills. Open to all members, perfect for newcomers.",
    type: "practice",
    maxPlayers: 15,
    currentPlayers: 8,
    location: "WePlay Room #PUHON-Practice",
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
  },
  {
    id: 4,
    title: "Strategy Workshop: Werewolf Roles",
    game: "Space Werewolf",
    date: "June 25, 2024",
    time: "8:30 PM PHT",
    description: "Deep dive into advanced werewolf role strategies. Led by our veteran strategists.",
    type: "meeting",
    maxPlayers: 25,
    currentPlayers: 10,
    location: "WePlay Room #PUHON-Academy",
  },
]

const pastEvents: GameEvent[] = [
  {
    id: 5,
    title: "May Championship Finals",
    game: "Space Werewolf",
    date: "May 28, 2024",
    time: "8:00 PM PHT",
    description: "ShadowKing took the crown in an epic 5-round finale!",
    type: "tournament",
    maxPlayers: 20,
    currentPlayers: 20,
    location: "WePlay Room #PUHON",
  },
  {
    id: 6,
    title: "Recruit Welcome Party",
    game: "Mixed Games",
    date: "May 20, 2024",
    time: "7:00 PM PHT",
    description: "Welcomed 3 new recruits to the PUHON family with games and introductions.",
    type: "social",
    maxPlayers: 30,
    currentPlayers: 25,
    location: "WePlay Main Lobby",
  },
]

const typeConfig = {
  tournament: { label: "Tournament", icon: Trophy, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  practice: { label: "Practice", icon: Crosshair, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
  social: { label: "Social", icon: PartyPopper, color: "text-pink-400", bg: "bg-pink-400/10 border-pink-400/30" },
  meeting: { label: "Meeting", icon: Mic, color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/30" },
}

function EventCard({ event, isPast = false }: { event: GameEvent; isPast?: boolean }) {
  const config = typeConfig[event.type]
  const TypeIcon = config.icon
  const fillPercent = Math.round((event.currentPlayers / event.maxPlayers) * 100)

  return (
    <Card className={`bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 glass-card ${isPast ? "opacity-70" : ""}`}>
      <CardContent className="p-5">
        {/* Type & Date Row */}
        <div className="flex items-center justify-between mb-3">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${config.bg}`}>
            <TypeIcon className={`w-3 h-3 ${config.color}`} />
            <span className={config.color}>{config.label}</span>
          </div>
          <Badge variant="secondary" className="text-xs bg-secondary/50">
            <Gamepad2 className="w-3 h-3 mr-1" />
            {event.game}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

        {/* Meta */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Player Count Bar */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{event.currentPlayers}/{event.maxPlayers} players</span>
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

        {/* RSVP CTA */}
        {!isPast && (
          <div className="mt-4">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/login?redirect=/dashboard/events">
                <LogIn className="w-4 h-4 mr-2" />
                Login to RSVP
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function EventsPage() {
  const [showPast, setShowPast] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              {upcomingEvents.length} Upcoming Events
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Family <span className="text-gold-gradient">Events</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Tournaments, practice sessions, and social nights — there&apos;s always something happening at PUHON.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <div className="w-2 h-6 rounded-full bg-primary" />
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setShowPast(!showPast)}
            className="flex items-center gap-2 text-lg font-bold text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <div className="w-2 h-6 rounded-full bg-muted-foreground/30" />
            Past Events
            <ChevronDown className={`w-5 h-5 transition-transform ${showPast ? "rotate-180" : ""}`} />
          </button>
          {showPast && (
            <div className="grid md:grid-cols-2 gap-4 animate-fade-in-up">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img 
                src="/Puhon_logo.png" 
                alt="PUHON Logo" 
                className="w-5 h-5 object-contain"
              />
              <span className="font-semibold text-gold-gradient">PUHON</span>
              <span className="text-muted-foreground">WePlay Family</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/members" className="hover:text-primary transition-colors">Members</Link>
              <Link href="/rules" className="hover:text-primary transition-colors">Rules</Link>
              <Link href="/join" className="hover:text-primary transition-colors">Join Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
