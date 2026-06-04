"use server"

import { getSupabaseServer } from "./supabase-server"
import { getUsers } from "./users"

export interface DashboardStats {
  totalMembers: number
  pendingApplications: number
  upcomingEvents: number
  familyLevel: number
}

export interface RecentActivity {
  type: "member" | "event" | "application" | "milestone"
  title: string
  description: string
  time: string
  icon: string
}

export interface PendingApplication {
  id: string
  name: string
  level: number
  games: string[]
  submitted: string
}

export interface UpcomingEvent {
  id: string
  name: string
  date: string
  time: string
  type: string
}

// Get dashboard statistics
export async function getDashboardStats(): Promise<DashboardStats> {
  const db = getSupabaseServer()

  // Get total members
  const { data: users, error: usersError } = await db
    .from("users")
    .select("id", { count: "exact" })

  // Get pending applications count
  const { data: pendingApps, error: appsError } = await db
    .from("applications")
    .select("id", { count: "exact" })
    .eq("status", "pending")

  // Get upcoming events count
  const today = new Date().toISOString().split("T")[0]
  const { data: upcomingEvents, error: eventsError } = await db
    .from("events")
    .select("id", { count: "exact" })
    .gte("date", today)

  if (usersError || appsError || eventsError) {
    throw new Error("Failed to fetch dashboard stats")
  }

  // Calculate family level based on member count
  const totalMembers = users?.length ?? 0
  const familyLevel = Math.floor(totalMembers / 10) + 1

  return {
    totalMembers,
    pendingApplications: pendingApps?.length ?? 0,
    upcomingEvents: upcomingEvents?.length ?? 0,
    familyLevel,
  }
}

// Get recent activity
export async function getRecentActivity(): Promise<RecentActivity[]> {
  const db = getSupabaseServer()

  // Get recent member joins
  const { data: recentUsers } = await db
    .from("users")
    .select("display_name, created_at")
    .order("created_at", { ascending: false })
    .limit(2)

  // Get recent approved applications
  const { data: recentApps } = await db
    .from("applications")
    .select("name, updated_at, status")
    .eq("status", "approved")
    .order("updated_at", { ascending: false })
    .limit(2)

  // Get recent events
  const { data: recentEvents } = await db
    .from("events")
    .select("title, created_at")
    .order("created_at", { ascending: false })
    .limit(1)

  const activities: RecentActivity[] = []

  // Add recent members
  recentUsers?.forEach((user) => {
    activities.push({
      type: "member",
      title: "New member joined",
      description: `${user.display_name} has been accepted into the family`,
      time: formatTimeAgo(new Date(user.created_at)),
      icon: "Users",
    })
  })

  // Add recent approvals
  recentApps?.forEach((app) => {
    activities.push({
      type: "application",
      title: "Application approved",
      description: `${app.name} has been approved`,
      time: formatTimeAgo(new Date(app.updated_at)),
      icon: "UserPlus",
    })
  })

  // Add recent events
  recentEvents?.forEach((event) => {
    activities.push({
      type: "event",
      title: "Event created",
      description: `${event.title} has been scheduled`,
      time: formatTimeAgo(new Date(event.created_at)),
      icon: "Calendar",
    })
  })

  return activities.slice(0, 4)
}

// Get pending applications
export async function getPendingApplications(): Promise<PendingApplication[]> {
  const db = getSupabaseServer()

  const { data, error } = await db
    .from("applications")
    .select("id, name, level, games, submitted_at")
    .eq("status", "pending")
    .order("submitted_at", { ascending: false })
    .limit(3)

  if (error) throw error

  return (
    data?.map((app) => ({
      id: app.id,
      name: app.name,
      level: app.level,
      games: app.games || [],
      submitted: formatTimeAgo(new Date(app.submitted_at)),
    })) ?? []
  )
}

// Get upcoming events
export async function getUpcomingEventsForDashboard(): Promise<UpcomingEvent[]> {
  const db = getSupabaseServer()

  const today = new Date().toISOString().split("T")[0]
  const { data, error } = await db
    .from("events")
    .select("id, title, date, time, type")
    .gte("date", today)
    .order("date", { ascending: true })
    .limit(3)

  if (error) throw error

  return (
    data?.map((event) => ({
      id: event.id,
      name: event.title,
      date: new Date(event.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      time: event.time,
      type: event.type,
    })) ?? []
  )
}

// Helper function to format time ago
function formatTimeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}
