import { supabase } from "./supabase"

export type UserRole = "Leader" | "Deputies" | "Admins" | "Members"

export interface User {
  id: string
  username: string
  displayName: string
  password: string
  role: UserRole
  weplayId?: string
  level?: number
  favoriteGame?: string
  status?: string
  badges?: string[]
  joinDate?: string
  createdAt?: string
  updatedAt?: string
}

// Get all users from Supabase
export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("role", { ascending: false })

  if (error) throw error

  return data.map((user) => ({
    id: user.id,
    username: user.username,
    displayName: user.display_name,
    password: user.password,
    role: user.role,
    weplayId: user.weplay_id,
    level: user.level,
    favoriteGame: user.favorite_game,
    status: user.status,
    badges: user.badges,
    joinDate: user.join_date,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  }))
}

// Get user by ID
export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error

  if (!data) return null

  return {
    id: data.id,
    username: data.username,
    displayName: data.display_name,
    password: data.password,
    role: data.role,
    weplayId: data.weplay_id,
    level: data.level,
    favoriteGame: data.favorite_game,
    status: data.status,
    badges: data.badges,
    joinDate: data.join_date,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

// Get user by username
export async function getUserByUsername(username: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single()

  if (error) throw error

  if (!data) return null

  return {
    id: data.id,
    username: data.username,
    displayName: data.display_name,
    password: data.password,
    role: data.role,
    weplayId: data.weplay_id,
    level: data.level,
    favoriteGame: data.favorite_game,
    status: data.status,
    badges: data.badges,
    joinDate: data.join_date,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

// Add new user
export async function addUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .insert({
      username: user.username,
      display_name: user.displayName,
      password: user.password,
      role: user.role,
      weplay_id: user.weplayId,
      level: user.level || 1,
      favorite_game: user.favoriteGame,
      status: user.status,
      badges: user.badges,
      join_date: user.joinDate || new Date().toISOString().split("T")[0],
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    username: data.username,
    displayName: data.display_name,
    password: data.password,
    role: data.role,
    weplayId: data.weplay_id,
    level: data.level,
    favoriteGame: data.favorite_game,
    status: data.status,
    badges: data.badges,
    joinDate: data.join_date,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

// Update user
export async function updateUser(
  id: string,
  userData: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .update({
      username: userData.username,
      display_name: userData.displayName,
      password: userData.password,
      role: userData.role,
      weplay_id: userData.weplayId,
      level: userData.level,
      favorite_game: userData.favoriteGame,
      status: userData.status,
      badges: userData.badges,
      join_date: userData.joinDate,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    username: data.username,
    displayName: data.display_name,
    password: data.password,
    role: data.role,
    weplayId: data.weplay_id,
    level: data.level,
    favoriteGame: data.favorite_game,
    status: data.status,
    badges: data.badges,
    joinDate: data.join_date,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

// Verify credentials for login
export async function verifyCredentials(
  username: string,
  password: string
): Promise<User | null> {
  const user = await getUserByUsername(username)

  if (!user) return null

  // NOTE: In production, you should hash passwords with bcrypt!
  // For demo purposes, we're checking plain text
  if (user.password === password) {
    return user
  }

  return null
}

// Delete user
export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase.from("users").delete().eq("id", id)
  if (error) throw error
}
