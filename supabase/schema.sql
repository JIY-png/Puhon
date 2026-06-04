-- Create users table
CREATE TABLE users (
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
CREATE INDEX idx_users_username ON users(username);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for all users to view all users (for now)
CREATE POLICY "Users can view all users"
  ON users
  FOR SELECT
  USING (true);

-- Create policy for all authenticated users to manage all users (for demo purposes)
CREATE POLICY "Users can manage all users"
  ON users
  USING (true)
  WITH CHECK (true);

-- NOTE: For production, you should use Supabase Auth properly!
-- For this demo, we're disabling strict RLS temporarily to avoid recursion

-- Insert initial users
INSERT INTO users (username, display_name, password, role, weplay_id, level, favorite_game, status, badges)
VALUES 
  ('admin', 'ShadowKing', 'admin123', 'Leader', 'WP12345678', 42, 'Space Werewolf', 'online', ARRAY['Founder', 'MVP', 'Strategist']),
  ('crystalfang', 'CrystalFang', 'crystal123', 'Deputies', 'WP23456789', 28, 'Space Werewolf', 'in-game', ARRAY['Event Regular']),
  ('shadow', 'ShadowHunter', 'shadow123', 'Admins', 'WP34567890', 22, 'Space Werewolf', 'online', ARRAY['Veteran']),
  ('phoenix', 'DarkPhoenix', 'phoenix123', 'Admins', 'WP45678901', 19, 'Space Werewolf', 'offline', ARRAY['Rising Star']),
  ('storm', 'StormBreaker', 'storm123', 'Members', 'WP56789012', 31, 'Mic Grab', 'online', ARRAY['Veteran']);
