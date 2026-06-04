"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Crown, LogIn, LogOut, LayoutDashboard, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

const publicNavigation = [
  { name: "Home", href: "/" },
  { name: "Members", href: "/members" },
  { name: "Rules", href: "/rules" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Join Us", href: "/join" },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, isAdmin, logout, isLoading } = useAuth()

  const handleLogout = async () => {
    await logout()
    window.location.href = "/"
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/Puhon_logo.png" 
              alt="PUHON Logo" 
              className="w-10 h-10 rounded-lg object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-xl font-bold text-gold-gradient">PUHON</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {publicNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/admin">
                          <Shield className="w-4 h-4 mr-2" />
                          Admin
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button size="sm" asChild>
                    <Link href="/login">
                      <LogIn className="w-4 h-4 mr-2" />
                      Member Login
                    </Link>
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {publicNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-border mt-2 pt-2">
                {!isLoading && (
                  <>
                    {isAuthenticated ? (
                      <>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            Admin Panel
                          </Link>
                        )}
                        <Link
                          href="/dashboard"
                          className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg"
                          onClick={() => {
                            handleLogout()
                            setMobileMenuOpen(false)
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/login"
                        className="flex items-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Member Login
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
