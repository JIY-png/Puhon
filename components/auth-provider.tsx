"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { login as serverLogin, logout as serverLogout, getAuthRole, getCurrentUser, type UserRole } from "@/lib/auth"
import type { User } from "@/lib/users"

interface AuthContextType {
  role: UserRole
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
  isMember: boolean
  user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("guest")
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      const [role, user] = await Promise.all([getAuthRole(), getCurrentUser()])
      setRole(role)
      setUser(user)
      setIsLoading(false)
    }
    initAuth()
  }, [])

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    const result = await serverLogin(username, password)
    if (result.success && result.user) {
      setRole(result.role)
      setUser(result.user)
    }
    setIsLoading(false)
    return { success: result.success, error: result.error }
  }

  const logout = async () => {
    setIsLoading(true)
    await serverLogout()
    setRole("guest")
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
        isAuthenticated: role !== "guest",
        isAdmin: role === "admin",
        isMember: role === "member" || role === "admin",
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
