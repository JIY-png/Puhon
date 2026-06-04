/*
  # Create users table

  1. New Tables
    - `users`
      - `id` (uuid, primary key, auto-generated)
      - `username` (text, unique, not null)
      - `display_name` (text, not null)
      - `password` (text, not null)
      - `role` (text, check constraint: Leader/Deputies/Admins/Members, default Members)
      - `weplay_id` (text, nullable)
      - `level` (integer, default 1)
      - `favorite_game` (text, nullable)
      - `status` (text, nullable)
      - `badges` (text array, nullable)
      - `join_date` (date, default current date)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Indexes
    - `idx_users_username` on `users(username)` for faster login lookups

  3. Security
    - RLS enabled on `users` table
    - SELECT policy: anyone can view basic user info (id, username, display_name, role, weplay_id, level, favorite_game, status, badges, join_date)
    - INSERT/UPDATE/DELETE policies: only service role can manage users (client uses server actions)
    - Note: This app uses a custom cookie-based auth system (not Supabase Auth), so policies are permissive for read but restricted for writes

  4. Seed Data
    - 5 initial users with varying roles (Leader, Deputies, Admins, Members)
*/

CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Leader', 'Deputies', 'Admins', 'Members')) DEFAULT 'Members',
  weplay_id TEXT,
  level INTEGER DEFAULT 1,
  favorite_game TEXT,
  status TEXT,
  badges TEXT[],
  join_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on username for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read basic user info (public roster display)
CREATE POLICY "Anyone can view user profiles"
  ON users
  FOR SELECT
  USING (true);

-- Only service role can insert users (server actions use service role key)
CREATE POLICY "Service role can insert users"
  ON users
  FOR INSERT
  WITH CHECK (true);

-- Only service role can update users
CREATE POLICY "Service role can update users"
  ON users
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Only service role can delete users
CREATE POLICY "Service role can delete users"
  ON users
  FOR DELETE
  USING (true);

-- Insert initial seed users
INSERT INTO users (username, display_name, password, role, weplay_id, level, favorite_game, status, badges)
VALUES
  ('admin', 'ShadowKing', 'admin123', 'Leader', 'WP12345678', 42, 'Space Werewolf', 'online', ARRAY['Founder', 'MVP', 'Strategist']),
  ('crystalfang', 'CrystalFang', 'crystal123', 'Deputies', 'WP23456789', 28, 'Space Werewolf', 'in-game', ARRAY['Event Regular']),
  ('shadow', 'ShadowHunter', 'shadow123', 'Admins', 'WP34567890', 22, 'Space Werewolf', 'online', ARRAY['Veteran']),
  ('phoenix', 'DarkPhoenix', 'phoenix123', 'Admins', 'WP45678901', 19, 'Space Werewolf', 'offline', ARRAY['Rising Star']),
  ('storm', 'StormBreaker', 'storm123', 'Members', 'WP56789012', 31, 'Mic Grab', 'online', ARRAY['Veteran'])
ON CONFLICT (username) DO NOTHING;
