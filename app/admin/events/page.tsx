"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar, Plus, Edit, Trash2, Clock, Users, MapPin, Mic, Gamepad2 } from "lucide-react"

type EventType = "Voice Room" | "Tournament" | "Competition" | "Meeting" | "Social"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  type: EventType
  attendees: number
  maxAttendees?: number
}

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Family Night",
    description: "Weekly voice room hangout for all members",
    date: "2024-03-15",
    time: "20:00",
    type: "Voice Room",
    attendees: 25,
    maxAttendees: 50,
  },
  {
    id: "2",
    title: "CP Push Week",
    description: "Family-wide CP contribution event",
    date: "2024-03-16",
    time: "00:00",
    type: "Competition",
    attendees: 40,
  },
  {
    id: "3",
    title: "Space Werewolf Tournament",
    description: "Internal tournament with prizes",
    date: "2024-03-20",
    time: "19:00",
    type: "Tournament",
    attendees: 32,
    maxAttendees: 32,
  },
  {
    id: "4",
    title: "Mic Grab Night",
    description: "Karaoke and music session",
    date: "2024-03-22",
    time: "21:00",
    type: "Social",
    attendees: 18,
    maxAttendees: 30,
  },
  {
    id: "5",
    title: "Leader Meeting",
    description: "Monthly planning and strategy discussion",
    date: "2024-03-25",
    time: "18:00",
    type: "Meeting",
    attendees: 5,
    maxAttendees: 10,
  },
]

const eventTypeConfig: Record<EventType, { icon: typeof Calendar; color: string; bgColor: string }> = {
  "Voice Room": { icon: Mic, color: "text-blue-400", bgColor: "bg-blue-400/10" },
  Tournament: { icon: Gamepad2, color: "text-primary", bgColor: "bg-primary/10" },
  Competition: { icon: Users, color: "text-green-400", bgColor: "bg-green-400/10" },
  Meeting: { icon: MapPin, color: "text-purple-400", bgColor: "bg-purple-400/10" },
  Social: { icon: Users, color: "text-pink-400", bgColor: "bg-pink-400/10" },
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("march")
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "Voice Room" as EventType,
    maxAttendees: "",
  })

  const handleAddEvent = () => {
    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      time: newEvent.time,
      type: newEvent.type,
      attendees: 0,
      maxAttendees: newEvent.maxAttendees ? parseInt(newEvent.maxAttendees) : undefined,
    }
    setEvents([...events, event])
    setNewEvent({ title: "", description: "", date: "", time: "", type: "Voice Room", maxAttendees: "" })
    setIsAddDialogOpen(false)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((e) => e.id !== eventId))
  }

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`)
    const dateB = new Date(`${b.date} ${b.time}`)
    return dateA.getTime() - dateB.getTime()
  })

  const upcomingEvents = sortedEvents.filter((e) => new Date(`${e.date} ${e.time}`) >= new Date())
  const pastEvents = sortedEvents.filter((e) => new Date(`${e.date} ${e.time}`) < new Date())

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground">
            Manage family events, tournaments, and gatherings
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Create New Event</DialogTitle>
              <DialogDescription>
                Schedule a new event for the PUHON family.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g., Family Night"
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Event details..."
                  className="bg-secondary border-border"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value: EventType) => setNewEvent({ ...newEvent, type: value })}
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Voice Room">Voice Room</SelectItem>
                      <SelectItem value="Tournament">Tournament</SelectItem>
                      <SelectItem value="Competition">Competition</SelectItem>
                      <SelectItem value="Meeting">Meeting</SelectItem>
                      <SelectItem value="Social">Social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAttendees">Max Attendees</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    value={newEvent.maxAttendees}
                    onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: e.target.value })}
                    placeholder="Optional"
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-border">
                Cancel
              </Button>
              <Button
                onClick={handleAddEvent}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!newEvent.title || !newEvent.date || !newEvent.time}
              >
                Create Event
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
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{upcomingEvents.length}</p>
                <p className="text-xs text-muted-foreground">Upcoming Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-400/10 p-2">
                <Mic className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {events.filter((e) => e.type === "Voice Room").length}
                </p>
                <p className="text-xs text-muted-foreground">Voice Rooms</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-400/10 p-2">
                <Gamepad2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {events.filter((e) => e.type === "Tournament").length}
                </p>
                <p className="text-xs text-muted-foreground">Tournaments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-400/10 p-2">
                <Users className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {events.reduce((acc, e) => acc + e.attendees, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total RSVPs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Upcoming Events</CardTitle>
          <CardDescription>Events scheduled for the future</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No upcoming events scheduled
              </div>
            ) : (
              upcomingEvents.map((event) => {
                const config = eventTypeConfig[event.type]
                const eventDate = new Date(`${event.date} ${event.time}`)
                const isToday = new Date().toDateString() === eventDate.toDateString()
                const isTomorrow =
                  new Date(Date.now() + 86400000).toDateString() === eventDate.toDateString()

                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`rounded-xl ${config.bgColor} p-3`}>
                        <config.icon className={`h-6 w-6 ${config.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{event.title}</h3>
                          {isToday && (
                            <Badge className="bg-primary text-primary-foreground">Today</Badge>
                          )}
                          {isTomorrow && (
                            <Badge variant="secondary">Tomorrow</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {eventDate.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {eventDate.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.attendees}
                            {event.maxAttendees && `/${event.maxAttendees}`} attendees
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${config.bgColor} ${config.color} border-none`}>
                        {event.type}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-muted-foreground">Past Events</CardTitle>
            <CardDescription>Completed events history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 opacity-60">
              {pastEvents.map((event) => {
                const config = eventTypeConfig[event.type]
                const eventDate = new Date(`${event.date} ${event.time}`)

                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`rounded-lg ${config.bgColor} p-2`}>
                        <config.icon className={`h-4 w-4 ${config.color}`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{event.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {eventDate.toLocaleDateString()} - {event.attendees} attended
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-border">
                      Completed
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
