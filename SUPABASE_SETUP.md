# Supabase Setup Guide

## 1. Create Supabase Project
- Go to https://supabase.com and create a new project
- Wait for it to finish initializing

## 2. Update Environment Variables
- Open the `.env.local` file
- Replace with your actual Supabase URL and Anon Key from the Supabase dashboard (Settings > API)

## 3. Run SQL Schema
- Go to the SQL Editor in your Supabase dashboard
- Copy the contents of `supabase/schema.sql` and run it to create the users table and insert initial data

## 4. Notes
⚠️ **Important**: For production, you should hash passwords using bcrypt or similar libraries instead of storing them in plain text!
