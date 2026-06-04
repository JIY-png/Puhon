"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Calendar,
  Trophy,
  UserPlus,
  TrendingUp,
  Activity,
  Star,
  Clock,
  ArrowUpRight,
  Sun,
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    name: "Total Members",
    value: "47",
    change: "+3 this week",
    trend: "up",
    icon: Users,
  },
  {
    name: "Pending Applications",
    value: "5",
    change: "2 new today",
    trend: "up",
    icon: UserPlus,
  },
  {
    name: "Upcoming Events",
    value: "8",
    change: "Next: Tonight",
    trend: "neutral",
    icon: Calendar,
  },
  {
    name: "Family Level",
    value: "7",
    change: "82% to Level 8",
    trend: "up",
    icon: Trophy,
  },
]

const recentActivity = [
  {
    type: "member",
    title: "New member joined",
    description: "Player456 has been accepted into the family",
    time: "2 hours ago",
    icon: Users,
  },
  {
    type: "event",
    title: "Event completed",
    description: "Space Werewolf Tournament - 1st Place",
    time: "5 hours ago",
    icon: Trophy,
  },
  {
    type: "application",
    title: "New application",
    description: "GamerPro99 submitted a join request",
    time: "1 day ago",
    icon: UserPlus,
  },
  {
    type: "milestone",
    title: "Milestone achieved",
    description: "Family reached 500 total CP",
    time: "2 days ago",
    icon: Star,
  },
]

const pendingApplications = [
  { name: "GamerPro99", level: 45, games: "Space Werewolf, Mic Grab", submitted: "1 day ago" },
  { name: "NightOwl22", level: 38, games: "Space Werewolf", submitted: "2 days ago" },
  { name: "StarPlayer", level: 52, games: "All Games", submitted: "3 days ago" },
]

const upcomingEvents = [
  { name: "Family Night", date: "Tonight", time: "8:00 PM", type: "Voice Room" },
  { name: "CP Push Week", date: "Tomorrow", time: "All Day", type: "Competition" },
  { name: "Werewolf Tournament", date: "Saturday", time: "7:00 PM", type: "Tournament" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 p-6">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Sun className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Welcome back, Admin</h1>
          </div>
          <p className="text-muted-foreground max-w-xl">
            Manage your PUHON family members, events, and applications from this dashboard.
            You have 5 pending applications and 3 events this week.
          </p>
        </div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-5 -bottom-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
              <CardDescription>Latest updates from your family</CardDescription>
            </div>
            <Activity className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="rounded-full bg-primary/10 p-2">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Applications */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Pending Applications</CardTitle>
                <CardDescription>Review new member requests</CardDescription>
              </div>
              <Link href="/admin/applications">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApplications.map((app) => (
                <div
                  key={app.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">{app.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{app.name}</p>
                      <p className="text-xs text-muted-foreground">Level {app.level} • {app.submitted}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="border-border hover:bg-destructive/10 hover:text-destructive">
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Upcoming Events</CardTitle>
                <CardDescription>Scheduled family activities</CardDescription>
              </div>
              <Link href="/admin/events">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{event.name}</p>
                      <p className="text-xs text-muted-foreground">{event.date} at {event.time}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
