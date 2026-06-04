import { supabase, supabaseAdmin } from "./supabase"

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

export type PublicUser = Omit<User, "password">

// Columns safe to expose publicly (excludes password)
const PUBLIC_COLUMNS = "id, username, display_name, role, weplay_id, level, favorite_game, status, badges, join_date, created_at, updated_at"

// All columns including password (for auth only)
const ALL_COLUMNS = "id, username, display_name, password, role, weplay_id, level, favorite_game, status, badges, join_date, created_at, updated_at"

function mapUser(data: Record<string, unknown>): User {
  return {
    id: data.id as string,
    username: data.username as string,
    displayName: data.display_name as string,
    password: (data.password as string) || "",
    role: data.role as UserRole,
    weplayId: data.weplay_id as string | undefined,
    level: data.level as number | undefined,
    favoriteGame: data.favorite_game as string | undefined,
    status: data.status as string | undefined,
    badges: data.badges as string[] | undefined,
    joinDate: data.join_date as string | undefined,
    createdAt: data.created_at as string | undefined,
    updatedAt: data.updated_at as string | undefined,
  }
}

// Get all users (public view - no passwords exposed)
export async function getUsers(): Promise<PublicUser[]> {
  const { data, error } = await supabase
    .from("users")
    .select(PUBLIC_COLUMNS)
    .order("role", { ascending: false })

  if (error) throw error

  return data.map((u: Record<string, unknown>) => {
    const user = mapUser(u)
    const { password: _, ...safeUser } = user
    return safeUser
  })
}

// Get user by ID (full record including password, for server-side auth)
export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select(ALL_COLUMNS)
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return mapUser(data as Record<string, unknown>)
}

// Get user by username (full record including password, for server-side auth)
export async function getUserByUsername(username: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select(ALL_COLUMNS)
    .eq("username", username)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return mapUser(data as Record<string, unknown>)
}

// Add new user (server-side only, uses admin client)
export async function addUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
  const { data, error } = await supabaseAdmin
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
    .select(ALL_COLUMNS)
    .single()

  if (error) throw error

  return mapUser(data as Record<string, unknown>)
}

// Update user (server-side only, uses admin client)
export async function updateUser(
  id: string,
  userData: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
): Promise<User> {
  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }
  if (userData.username !== undefined) updateData.username = userData.username
  if (userData.displayName !== undefined) updateData.display_name = userData.displayName
  if (userData.password !== undefined) updateData.password = userData.password
  if (userData.role !== undefined) updateData.role = userData.role
  if (userData.weplayId !== undefined) updateData.weplay_id = userData.weplayId
  if (userData.level !== undefined) updateData.level = userData.level
  if (userData.favoriteGame !== undefined) updateData.favorite_game = userData.favoriteGame
  if (userData.status !== undefined) updateData.status = userData.status
  if (userData.badges !== undefined) updateData.badges = userData.badges
  if (userData.joinDate !== undefined) updateData.join_date = userData.joinDate

  const { data, error } = await supabaseAdmin
    .from("users")
    .update(updateData)
    .eq("id", id)
    .select(ALL_COLUMNS)
    .single()

  if (error) throw error

  return mapUser(data as Record<string, unknown>)
}

// Verify credentials for login
export async function verifyCredentials(
  username: string,
  password: string
): Promise<User | null> {
  const user = await getUserByUsername(username)

  if (!user) return null

  if (user.password === password) {
    return user
  }

  return null
}

// Delete user (server-side only, uses admin client)
export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from("users").delete().eq("id", id)
  if (error) throw error
}
