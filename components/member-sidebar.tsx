"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Image,
  User,
  Crown,
  ChevronLeft,
  Menu,
  ArrowLeft,
  Sparkles,
  Gift,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Strategy Guides", href: "/dashboard/guides", icon: BookOpen },
  { name: "Family Rules", href: "/dashboard/rules", icon: Crown },
  { name: "Name Generator", href: "/dashboard/name-generator", icon: Sparkles },
  { name: "Events & RSVP", href: "/dashboard/events", icon: Calendar },
  { name: "Full Gallery", href: "/dashboard/gallery", icon: Image },
  { name: "Spin the Wheel", href: "/dashboard/spin-the-wheel", icon: Gift },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
]

export function MemberSidebar() {
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
          <Link href="/dashboard" className="flex items-center gap-3">
            <img 
              src="/Puhon_logo.png" 
              alt="PUHON Logo" 
              className="h-8 w-8 object-contain"
            />
            {!isCollapsed && (
              <div>
                <span className="text-xl font-bold text-gold-gradient">PUHON</span>
                <p className="text-[10px] text-muted-foreground leading-none">Member Hub</p>
              </div>
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
          {!isCollapsed ? (
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Public Site
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          )}
        </div>
      </aside>
    </>
  )
}
