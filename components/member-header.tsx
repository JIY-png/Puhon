"use client"

import { Bell, LogOut, Crown, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

export function MemberHeader() {
  const { logout, isAdmin } = useAuth()

  const handleLogout = async () => {
    await logout()
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      {/* Spacer for mobile menu button */}
      <div className="w-10 lg:hidden" />

      {/* Title Area */}
      <div className="flex-1 flex items-center gap-3">
        <img 
          src="/Puhon_logo.png" 
          alt="PUHON Logo" 
          className="w-5 h-5 object-contain"
        />
        <span className="text-sm font-medium text-muted-foreground">Member Dashboard</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Admin link */}
        {isAdmin && (
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin">
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </Link>
          </Button>
        )}

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                2
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">New Strategy Guide</span>
              <span className="text-xs text-muted-foreground">Advanced Werewolf Tactics posted by ShadowKing</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Event Reminder</span>
              <span className="text-xs text-muted-foreground">Space Werewolf Championship starts in 3 days</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile / Logout */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <img 
                  src="/Puhon_logo.png" 
                  alt="PUHON Logo" 
                  className="h-4 w-4 object-contain"
                />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">
                <Crown className="mr-2 h-4 w-4" />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/">
                <Crown className="mr-2 h-4 w-4" />
                Public Site
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
