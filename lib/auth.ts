"use server"

import { cookies } from "next/headers"
import { verifyCredentials, getUserById, type User, type UserRole } from "./users"

const ADMIN_ROLES: UserRole[] = ["Leader", "Deputies", "Admins"]

export async function login(username: string, password: string): Promise<{
  success: boolean;
  role: UserRole;
  user?: User;
  error?: string
}> {
  const cookieStore = await cookies()

  const user = await verifyCredentials(username, password)

  if (user) {
    cookieStore.set("puhon-user-id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    cookieStore.set("puhon-user-role", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return {
      success: true,
      role: user.role,
      user
    }
  }

  return { success: false, role: "Members", error: "Invalid username or password" }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("puhon-user-id")
  cookieStore.delete("puhon-user-role")
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const userId = cookieStore.get("puhon-user-id")?.value

  if (!userId) return null

  return await getUserById(userId)
}

export async function getAuthRole(): Promise<UserRole> {
  const user = await getCurrentUser()

  if (!user) return "Members"

  return user.role
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false
  return ADMIN_ROLES.includes(user.role)
}
