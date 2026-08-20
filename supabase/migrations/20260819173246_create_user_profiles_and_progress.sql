/*
# Create user profiles and progress tables (retry)

Same migration as before — fixes a syntax error where DROP POLICY
included a FOR DELETE clause (not valid syntax).

## New Tables
1. user_profiles — student onboarding data, one row per auth user
2. saved_resources — bookmarked learning resources
3. completed_resources — finished learning resources
4. study_plans — adaptive study plan JSON

## Security
- RLS on all tables, authenticated-only, ownership via auth.uid()
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  college text NOT NULL DEFAULT '',
  degree text NOT NULL DEFAULT '',
  branch text NOT NULL DEFAULT '',
  year text NOT NULL DEFAULT '',
  goal text NOT NULL DEFAULT '',
  study_time text NOT NULL DEFAULT '',
  confidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_onboarded boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON user_profiles;
CREATE POLICY "select_own_profile" ON user_profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON user_profiles;
CREATE POLICY "insert_own_profile" ON user_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON user_profiles;
CREATE POLICY "update_own_profile" ON user_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON user_profiles;
CREATE POLICY "delete_own_profile" ON user_profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

CREATE TABLE IF NOT EXISTS saved_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id text NOT NULL,
  saved_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, resource_id)
);

ALTER TABLE saved_resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_saved" ON saved_resources;
CREATE POLICY "select_own_saved" ON saved_resources FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_saved" ON saved_resources;
CREATE POLICY "insert_own_saved" ON saved_resources FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_saved" ON saved_resources;
CREATE POLICY "delete_own_saved" ON saved_resources FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS completed_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, resource_id)
);

ALTER TABLE completed_resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_completed" ON completed_resources;
CREATE POLICY "select_own_completed" ON completed_resources FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_completed" ON completed_resources;
CREATE POLICY "insert_own_completed" ON completed_resources FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_completed" ON completed_resources;
CREATE POLICY "delete_own_completed" ON completed_resources FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS study_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  plan jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);

ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_plan" ON study_plans;
CREATE POLICY "select_own_plan" ON study_plans FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "upsert_own_plan" ON study_plans;
CREATE POLICY "upsert_own_plan" ON study_plans FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_plan" ON study_plans;
CREATE POLICY "update_own_plan" ON study_plans FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_plan" ON study_plans;
CREATE POLICY "delete_own_plan" ON study_plans FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
