"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { login as serverLogin, logout as serverLogout, getAuthRole, getCurrentUser } from "@/lib/auth"
import type { User, UserRole } from "@/lib/users"

const ADMIN_ROLES: UserRole[] = ["Leader", "Deputies", "Admins"]

interface AuthContextType {
  role: UserRole | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
  user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const initAuth = async () => {
      const [authRole, currentUser] = await Promise.all([getAuthRole(), getCurrentUser()])
      setRole(authRole)
      setUser(currentUser)
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
    setRole(null)
    setUser(null)
    setIsLoading(false)
  }

  const isAdmin = role !== null && ADMIN_ROLES.includes(role)

  return (
    <AuthContext.Provider
      value={{
        role,
        isLoading,
        login,
        logout,
        isAuthenticated: isAdmin && user !== null,
        isAdmin,
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
