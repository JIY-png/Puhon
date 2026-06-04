"use server"

import { getUsers, addUser, updateUser, deleteUser, type User, type PublicUser } from "./users"
import { isAdmin, getCurrentUser } from "./auth"
import { revalidatePath } from "next/cache"

export async function getAllUsers(): Promise<PublicUser[]> {
  if (!await isAdmin()) {
    throw new Error("Unauthorized")
  }
  return getUsers()
}

export async function createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">) {
  if (!await isAdmin()) {
    throw new Error("Unauthorized")
  }
  const result = await addUser(user)
  revalidatePath("/admin/members")
  return result
}

export async function editUser(id: string, userData: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>) {
  if (!await isAdmin()) {
    throw new Error("Unauthorized")
  }
  const result = await updateUser(id, userData)
  revalidatePath("/admin/members")
  return result
}

export async function removeUser(id: string) {
  if (!await isAdmin()) {
    throw new Error("Unauthorized")
  }
  await deleteUser(id)
  revalidatePath("/admin/members")
}

// Allow members to update their own profile - verifies ownership
export async function updateSelf(id: string, userData: Partial<Omit<User, "id" | "joinDate" | "createdAt" | "updatedAt">>) {
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.id !== id) {
    throw new Error("Unauthorized: You can only update your own profile")
  }
  const result = await updateUser(id, userData)
  revalidatePath("/dashboard/profile")
  return result
}

// Public function to get all users (no passwords exposed)
export async function getPublicUsers(): Promise<PublicUser[]> {
  return getUsers()
}
