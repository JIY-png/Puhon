"use client"

import { useState, useEffect } from "react"
import { Crown, Users, Shield, Search, Gamepad2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import type { User, UserRole } from "@/lib/users"
import { getPublicUsers } from "@/lib/user-actions"

const allRoles: UserRole[] = ["Leader", "Deputies", "Admins", "Members"]

const roleConfig: Record<UserRole, { icon: typeof Crown; color: string; bg: string }> = {
  Leader: { icon: Crown, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  Deputies: { icon: Shield, color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30" },
  Admins: { icon: Shield, color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/30" },
  Members: { icon: Users, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
}

const statusConfig = {
  online: { label: "Online", color: "bg-emerald-500" },
  offline: { label: "Offline", color: "bg-zinc-500" },
  "in-game": { label: "In Game", color: "bg-primary" },
}

export default function MembersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<UserRole | "All">("All")

  // Load users on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getPublicUsers()
        setUsers(data)
      } catch (e) {
        console.error("Failed to load users:", e)
      }
    }
    loadUsers()
  }, [])

  const filtered = users.filter((user) => {
    const matchesSearch = 
      user.displayName.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === "All" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              {users.length} Members Strong
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gold-gradient">Family</span> Roster
            </h1>
            <p className="text-muted-foreground text-lg">
              Meet the warriors of PUHON. From seasoned veterans to rising recruits, we are one united family.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 pb-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card/50 border-border/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setRoleFilter("All")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                roleFilter === "All"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/50 text-muted-foreground hover:text-foreground border border-border/50"
              }`}
            >
              All
            </button>
            {allRoles.map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  roleFilter === role
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/50 text-muted-foreground hover:text-foreground border border-border/50"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((user) => {
            const config = roleConfig[user.role]
            const RoleIcon = config.icon
            const status = statusConfig[user.status || "offline"]
            return (
              <Card
                key={user.id}
                className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 group glass-card"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors">
                        <span className="text-lg font-bold text-primary">
                          {user.displayName[0]}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${status.color} border-2 border-background`} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{user.displayName}</h3>
                      </div>
                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border ${config.bg}`}>
                        <RoleIcon className={`w-3 h-3 ${config.color}`} />
                        <span className={config.color}>{user.role}</span>
                      </div>
                    </div>

                    {/* Level */}
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">Level</p>
                      <p className="text-lg font-bold text-gold-gradient">{user.level || 1}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Gamepad2 className="w-3 h-3" />
                      {user.favoriteGame || "N/A"}
                    </div>
                    <span>Since {new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>

                  {/* Badges */}
                  {user.badges && user.badges.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {user.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs bg-secondary/50">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No members found</p>
            <p className="text-sm">Try adjusting your search or filter</p>
          </div>
        )}
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
              <Link href="/rules" className="hover:text-primary transition-colors">Rules</Link>
              <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
              <Link href="/join" className="hover:text-primary transition-colors">Join Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
