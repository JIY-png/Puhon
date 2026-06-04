-- Run this in Supabase Dashboard → SQL Editor if login fails with
-- "infinite recursion detected in policy for relation users" (code 42P17)

DROP POLICY IF EXISTS "Users can view all users" ON users;
DROP POLICY IF EXISTS "Users can manage all users" ON users;

ALTER TABLE users DISABLE ROW LEVEL SECURITY;
