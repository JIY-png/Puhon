"use client"

import { useEffect, useState } from "react"
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
import {
  getDashboardStats,
  getRecentActivity,
  getPendingApplications,
  getUpcomingEventsForDashboard,
  type DashboardStats,
  type RecentActivity,
  type PendingApplication,
  type UpcomingEvent,
} from "@/lib/dashboard-actions"

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activity, setActivity] = useState<RecentActivity[]>([])
  const [applications, setApplications] = useState<PendingApplication[]>([])
  const [events, setEvents] = useState<UpcomingEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsData, activityData, appData, eventData] = await Promise.all([
          getDashboardStats(),
          getRecentActivity(),
          getPendingApplications(),
          getUpcomingEventsForDashboard(),
        ])

        setStats(statsData)
        setActivity(activityData)
        setApplications(appData)
        setEvents(eventData)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (isLoading || !stats) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse bg-primary/10 rounded-xl h-32" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-card rounded-lg h-24" />
          ))}
        </div>
      </div>
    )
  }

  const dynamicStats = [
    {
      name: "Total Members",
      value: stats.totalMembers.toString(),
      change: "+3 this week",
      trend: "up" as const,
      icon: Users,
    },
    {
      name: "Pending Applications",
      value: stats.pendingApplications.toString(),
      change: "2 new today",
      trend: "up" as const,
      icon: UserPlus,
    },
    {
      name: "Upcoming Events",
      value: stats.upcomingEvents.toString(),
      change: "Next: Tonight",
      trend: "neutral" as const,
      icon: Calendar,
    },
    {
      name: "Family Level",
      value: stats.familyLevel.toString(),
      change: "82% to Level 8",
      trend: "up" as const,
      icon: Trophy,
    },
  ]

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
            You have {stats.pendingApplications} pending applications and {stats.upcomingEvents} events this week.
          </p>
        </div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-5 -bottom-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dynamicStats.map((stat) => (
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
            {activity.length === 0 ? (
              <p className="text-muted-foreground text-sm">No recent activity</p>
            ) : (
              activity.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="rounded-full bg-primary/10 p-2">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </div>
                </div>
              ))
            )}
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
              {applications.length === 0 ? (
                <p className="text-muted-foreground text-sm">No pending applications</p>
              ) : (
                applications.map((app) => (
                  <div
                    key={app.id}
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
                ))
              )}
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
              {events.length === 0 ? (
                <p className="text-muted-foreground text-sm">No upcoming events</p>
              ) : (
                events.map((event, index) => (
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
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
