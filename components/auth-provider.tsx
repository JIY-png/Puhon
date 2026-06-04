"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { login as serverLogin, logout as serverLogout, getAuthRole, getCurrentUser } from "@/lib/auth"
import type { PublicUser, UserRole } from "@/lib/users"

const ADMIN_ROLES: UserRole[] = ["Leader", "Deputies", "Admins"]
const MEMBER_ROLES: UserRole[] = ["Leader", "Deputies", "Admins", "Members"]

interface AuthContextType {
  role: UserRole | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
  isMember: boolean
  user: PublicUser | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<PublicUser | null>(null)

  useEffect(() => {
    const initAuth = async () => {
      const [authRole, authUser] = await Promise.all([getAuthRole(), getCurrentUser()])
      setRole(authUser ? authRole : null)
      if (authUser) {
        const { password: _, ...safeUser } = authUser
        setUser(safeUser)
      }
      setIsLoading(false)
    }
    initAuth()
  }, [])

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    const result = await serverLogin(username, password)
    if (result.success && result.user) {
      setRole(result.role)
      const { password: _, ...safeUser } = result.user
      setUser(safeUser)
    }
    setIsLoading(false)
    return { success: result.success, error: result.error }
  }

  const logout = async () => {
    setIsLoading(true)
    await serverLogout()
    setRole(null)
    setUser(null)
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        role,
        isLoading,
        login,
        logout,
        isAuthenticated: role !== null && MEMBER_ROLES.includes(role),
        isAdmin: role !== null && ADMIN_ROLES.includes(role),
        isMember: role !== null && MEMBER_ROLES.includes(role),
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
