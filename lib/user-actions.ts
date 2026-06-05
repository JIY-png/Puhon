"use server"

import { getUsers, addUser, updateUser, deleteUser, getUserById, type User } from "./users"
import { isAdmin } from "./auth"
import { revalidatePath } from "next/cache"

export async function getAllUsers() {
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

// Allow members to update their own password/profile
export async function updateSelf(id: string, userData: Partial<Omit<User, "id" | "joinDate" | "createdAt" | "updatedAt">>) {
  const user = await updateUser(id, userData)
  revalidatePath("/dashboard/profile")
  return user
}

// Public function to get all users without admin check
export async function getPublicUsers() {
  return getUsers()
}
