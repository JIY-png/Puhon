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

-- Demo app uses custom cookie auth, not Supabase Auth.
-- RLS with overlapping policies causes infinite recursion (Postgres 42P17) on login.
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- For production: enable RLS with Supabase Auth + scoped policies, or use
-- SUPABASE_SERVICE_ROLE_KEY only on the server (see lib/supabase-server.ts).

-- Create events table for family events and tournaments
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Voice Room', 'Tournament', 'Competition', 'Meeting', 'Social')),
  attendees INTEGER DEFAULT 0,
  max_attendees INTEGER,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create applications table for join requests
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  weplay_id TEXT NOT NULL UNIQUE,
  level INTEGER NOT NULL,
  games TEXT[] NOT NULL,
  reason TEXT NOT NULL,
  experience TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_date ON events(date DESC, time DESC);
CREATE INDEX idx_applications_status ON applications(status);

-- Insert initial users
INSERT INTO users (username, display_name, password, role, weplay_id, level, favorite_game, status, badges)
VALUES 
  ('admin', 'ShadowKing', 'admin123', 'Leader', 'WP12345678', 42, 'Space Werewolf', 'online', ARRAY['Founder', 'MVP', 'Strategist']),
  ('crystalfang', 'CrystalFang', 'crystal123', 'Deputies', 'WP23456789', 28, 'Space Werewolf', 'in-game', ARRAY['Event Regular']),
  ('shadow', 'ShadowHunter', 'shadow123', 'Admins', 'WP34567890', 22, 'Space Werewolf', 'online', ARRAY['Veteran']),
  ('phoenix', 'DarkPhoenix', 'phoenix123', 'Admins', 'WP45678901', 19, 'Space Werewolf', 'offline', ARRAY['Rising Star']),
  ('storm', 'StormBreaker', 'storm123', 'Members', 'WP56789012', 31, 'Mic Grab', 'online', ARRAY['Veteran']);

-- Insert sample events
INSERT INTO events (title, description, date, time, type, attendees, max_attendees)
VALUES 
  ('Family Night', 'Weekly voice room hangout for all members', CURRENT_DATE + INTERVAL '1 day', '20:00:00', 'Voice Room', 25, 50),
  ('CP Push Week', 'Family-wide CP contribution event', CURRENT_DATE + INTERVAL '2 days', '00:00:00', 'Competition', 40, NULL),
  ('Space Werewolf Tournament', 'Internal tournament with prizes', CURRENT_DATE + INTERVAL '6 days', '19:00:00', 'Tournament', 32, 32),
  ('Mic Grab Night', 'Karaoke and music session', CURRENT_DATE + INTERVAL '8 days', '21:00:00', 'Social', 18, 30),
  ('Leader Meeting', 'Monthly planning and strategy discussion', CURRENT_DATE + INTERVAL '11 days', '18:00:00', 'Meeting', 5, 10);

-- Insert sample applications
INSERT INTO applications (name, weplay_id, level, games, reason, experience, status, notes)
VALUES 
  ('GamerPro99', 'WP98765432', 45, ARRAY['Space Werewolf', 'Mic Grab'], 'Looking for an active family with friendly members to enjoy games together', 'Been playing WePlay for 6 months, previously in StarGazers family', 'pending', NULL),
  ('NightOwl22', 'WP87654321', 38, ARRAY['Space Werewolf'], 'Heard great things about PUHON from friends, want to join competitive events', 'New to family gaming but very active player', 'pending', NULL),
  ('StarPlayer', 'WP76543210', 52, ARRAY['Space Werewolf', 'Mic Grab', 'Other'], 'Looking for a family that values both competition and community', '2 years on WePlay, was co-leader in previous family', 'pending', NULL),
  ('ProPlayer123', 'WP54321098', 60, ARRAY['Space Werewolf', 'Mic Grab'], 'Looking for top-tier competitive family', 'Tournament winner, 1.5 years experience', 'approved', 'Excellent candidate, added to Elite roster');
