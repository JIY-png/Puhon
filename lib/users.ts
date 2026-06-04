import { getSupabaseServer } from "./supabase-server"

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

function mapUser(row: Record<string, unknown>): User {
  return {
    id: row.id as string,
    username: row.username as string,
    displayName: row.display_name as string,
    password: row.password as string,
    role: row.role as UserRole,
    weplayId: row.weplay_id as string | undefined,
    level: row.level as number | undefined,
    favoriteGame: row.favorite_game as string | undefined,
    status: row.status as string | undefined,
    badges: row.badges as string[] | undefined,
    joinDate: row.join_date as string | undefined,
    createdAt: row.created_at as string | undefined,
    updatedAt: row.updated_at as string | undefined,
  }
}

function isNotFoundError(error: { code?: string }): boolean {
  return error.code === "PGRST116"
}

function formatDbError(error: { code?: string; message?: string }): Error {
  if (error.code === "42P17") {
    return new Error(
      "Database RLS misconfiguration. Run supabase/fix-rls.sql in the Supabase SQL Editor, or set SUPABASE_SERVICE_ROLE_KEY in .env.local."
    )
  }
  return new Error(error.message || "Database request failed")
}

// Get all users from Supabase
export async function getUsers(): Promise<User[]> {
  const { data, error } = await getSupabaseServer()
    .from("users")
    .select("*")
    .order("role", { ascending: false })

  if (error) throw formatDbError(error)

  return (data ?? []).map((row) => mapUser(row))
}

// Get user by ID
export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await getSupabaseServer()
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    if (isNotFoundError(error)) return null
    throw formatDbError(error)
  }

  if (!data) return null

  return mapUser(data)
}

// Get user by username
export async function getUserByUsername(username: string): Promise<User | null> {
  const { data, error } = await getSupabaseServer()
    .from("users")
    .select("*")
    .eq("username", username)
    .maybeSingle()

  if (error) {
    if (isNotFoundError(error)) return null
    throw formatDbError(error)
  }

  if (!data) return null

  return mapUser(data)
}

// Add new user
export async function addUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
  const { data, error } = await getSupabaseServer()
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

  if (error) throw formatDbError(error)

  return mapUser(data)
}

// Update user
export async function updateUser(
  id: string,
  userData: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
): Promise<User> {
  const { data, error } = await getSupabaseServer()
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

  if (error) throw formatDbError(error)

  return mapUser(data)
}

// Verify credentials for login
export async function verifyCredentials(
  username: string,
  password: string
): Promise<User | null> {
  const user = await getUserByUsername(username)

  if (!user) return null

  // NOTE: In production, you should hash passwords with bcrypt!
  if (user.password === password) {
    return user
  }

  return null
}

// Delete user
export async function deleteUser(id: string): Promise<void> {
  const { error } = await getSupabaseServer().from("users").delete().eq("id", id)
  if (error) throw formatDbError(error)
}
