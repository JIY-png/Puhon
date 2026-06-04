"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Calendar,
  Trophy,
  FileText,
  Image,
  UserPlus,
  Gamepad2,
  Sun,
  ChevronLeft,
  Menu,
  ScrollText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Members", href: "/admin/members", icon: Users },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Milestones", href: "/admin/milestones", icon: Trophy },
  { name: "Applications", href: "/admin/applications", icon: UserPlus },
  { name: "Fam Rules", href: "/admin/rules", icon: ScrollText },
  { name: "Guides", href: "/admin/guides", icon: FileText },
  { name: "PFP Gallery", href: "/admin/gallery", icon: Image },
  { name: "Games", href: "/admin/games", icon: Gamepad2 },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden text-primary"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <Link href="/admin" className="flex items-center gap-3">
            <Sun className="h-8 w-8 text-primary" />
            {!isCollapsed && (
              <span className="text-xl font-bold text-gold-gradient">PUHON</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex text-muted-foreground hover:text-foreground"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary gold-glow"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-sm font-bold">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Admin</p>
                <p className="text-xs text-muted-foreground truncate">Leader</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
