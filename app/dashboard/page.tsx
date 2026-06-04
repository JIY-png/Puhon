import {
  Crown,
  Calendar,
  BookOpen,
  Image,
  User,
  Bell,
  Trophy,
  TrendingUp,
  Clock,
  ChevronRight,
  Sparkles,
  Swords,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const quickStats = [
  { label: "Days in Family", value: "127", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10" },
  { label: "Events Attended", value: "34", icon: Calendar, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { label: "Guides Read", value: "12", icon: BookOpen, color: "text-purple-400", bg: "bg-purple-400/10" },
  { label: "Current Level", value: "28", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
]

const announcements = [
  {
    title: "Space Werewolf Championship This Saturday!",
    content: "Don't forget to sign up for the monthly championship. Top 3 earn exclusive badges!",
    date: "2 hours ago",
    priority: "high",
  },
  {
    title: "New Strategy Guide: Advanced Werewolf Roles",
    content: "ShadowKing has published a new comprehensive guide. Check it out!",
    date: "1 day ago",
    priority: "normal",
  },
  {
    title: "Welcome Our New Recruits",
    content: "Let's give a warm welcome to DarkPhoenix, QuantumFlash, and VoidWalker!",
    date: "3 days ago",
    priority: "normal",
  },
]

const recentActivity = [
  { action: "RSVP'd to Space Werewolf Championship", time: "2h ago", icon: Calendar },
  { action: "Read 'Advanced Werewolf Tactics' guide", time: "1d ago", icon: BookOpen },
  { action: "Downloaded Crystal Fang PFP", time: "2d ago", icon: Image },
  { action: "Attended Family Game Night", time: "5d ago", icon: Swords },
  { action: "Updated profile bio", time: "1w ago", icon: User },
]

const quickLinks = [
  { title: "Strategy Guides", description: "Learn winning tactics", href: "/dashboard/guides", icon: BookOpen, color: "text-purple-400" },
  { title: "Name Generator", description: "Official clan names", href: "/dashboard/name-generator", icon: Sparkles, color: "text-yellow-400" },
  { title: "Events & RSVP", description: "Join upcoming events", href: "/dashboard/events", icon: Calendar, color: "text-emerald-400" },
  { title: "Full Gallery", description: "Download all assets", href: "/dashboard/gallery", icon: Image, color: "text-blue-400" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-br from-primary/10 via-card to-card border-primary/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <CardContent className="p-6 md:p-8 relative">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">Member</Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, <span className="text-gold-gradient">Warrior</span>! 👋
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Here&apos;s what&apos;s happening in the PUHON family today. Stay active, stay connected.
          </p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="bg-card/50 border-border/50 glass-card">
            <CardContent className="p-4">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-gold-gradient">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Announcements */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Announcements
            </h2>
          </div>
          <div className="space-y-3">
            {announcements.map((announcement, index) => (
              <Card key={index} className="bg-card/50 border-border/50 glass-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-sm">{announcement.title}</h3>
                    {announcement.priority === "high" && (
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-xs shrink-0">
                        Important
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                  <p className="text-xs text-muted-foreground/60">{announcement.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Recent Activity
          </h2>
          <Card className="bg-card/50 border-border/50 glass-card">
            <CardContent className="p-4 space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <activity.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5 text-primary" />
          Quick Links
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Card key={link.title} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 group glass-card">
              <CardContent className="p-4">
                <Link href={link.href} className="block">
                  <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <link.icon className={`w-5 h-5 ${link.color}`} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{link.title}</h3>
                  <p className="text-xs text-muted-foreground">{link.description}</p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground mt-2 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
