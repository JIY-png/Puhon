"use server"

import { cookies } from "next/headers"
import { verifyCredentials, getUserById, type User, type UserRole } from "./users"

const ADMIN_ROLES: UserRole[] = ["Leader", "Deputies", "Admins"]

function isAdminRole(role: UserRole): boolean {
  return ADMIN_ROLES.includes(role)
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
}

export async function login(
  username: string,
  password: string
): Promise<{
  success: boolean
  role: UserRole
  user?: User
  error?: string
}> {
  const cookieStore = await cookies()

  let user: User | null
  try {
    user = await verifyCredentials(username, password)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unable to sign in. Please try again."
    return { success: false, role: "Members", error: message }
  }

  if (!user) {
    return { success: false, role: "Members", error: "Invalid username or password" }
  }

  if (!isAdminRole(user.role)) {
    return {
      success: false,
      role: user.role,
      error: "This account does not have admin access. Use the public site to browse family content.",
    }
  }

  cookieStore.set("puhon-user-id", user.id, cookieOptions)
  cookieStore.set("puhon-admin", "1", cookieOptions)

  return {
    success: true,
    role: user.role,
    user,
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("puhon-user-id")
  cookieStore.delete("puhon-admin")
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const userId = cookieStore.get("puhon-user-id")?.value

  if (!userId) return null

  try {
    const user = await getUserById(userId)
    if (!user || !isAdminRole(user.role)) return null
    return user
  } catch {
    return null
  }
}

export async function getAuthRole(): Promise<UserRole | null> {
  const user = await getCurrentUser()
  return user?.role ?? null
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getCurrentUser()) !== null
}

export async function isAdmin(): Promise<boolean> {
  return (await getCurrentUser()) !== null
}
