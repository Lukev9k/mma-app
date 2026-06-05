-- ENUMs
CREATE TYPE user_role AS ENUM ('student', 'admin');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE experience_level AS ENUM ('0-6 months', '6-12 months', '12-24 months', '24+ months');
CREATE TYPE weight_division AS ENUM ('strawweight', 'flyweight', 'bantamweight', 'featherweight', 'lightweight', 'welterweight', 'middleweight', 'heavyweight');
CREATE TYPE session_type AS ENUM ('striking', 'grappling', 'mixed', 'endurance');
CREATE TYPE batch_type AS ENUM ('adults', 'kids');
CREATE TYPE current_status AS ENUM ('ordered', 'requested', 'fulfilled');

-- Tables
CREATE TABLE gyms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  created_at timestamp DEFAULT now()
);

CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  gym_id uuid REFERENCES gyms(id),
  name text NOT NULL,
  age integer,
  gender gender_type,
  weight_class weight_division,
  experience experience_level,
  height integer,
  role user_role NOT NULL DEFAULT 'student',
  subscription_end_date timestamp,
  created_at timestamp DEFAULT now()
);

CREATE TABLE tournaments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id uuid REFERENCES gyms(id),
  name text NOT NULL,
  min_age integer,
  tournament_date timestamp,
  enrollment_deadline timestamp,
  created_at timestamp DEFAULT now()
);

CREATE TABLE tournament_enrollments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES profiles(id),
  tournament_id uuid REFERENCES tournaments(id),
  enrolled_at timestamp
);

CREATE TABLE calendar_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id uuid REFERENCES gyms(id),
  session session_type,
  instructor text,
  day_of_week text,
  session_time time,
  batch batch_type,
  is_recurring boolean,
  specific_date timestamp,
  created_at timestamp DEFAULT now()
);

CREATE TABLE gym_equipment (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id uuid REFERENCES gyms(id),
  name text,
  price integer,
  image_url text,
  available boolean,
  created_at timestamp DEFAULT now()
);

CREATE TABLE equipment_orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id uuid REFERENCES gyms(id),
  student_id uuid REFERENCES profiles(id),
  gym_equipment_id uuid REFERENCES gym_equipment(id),
  status current_status,
  price integer,
  created_at timestamp DEFAULT now()
);

CREATE TABLE drills (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  gym_id uuid REFERENCES gyms(id),
  name text,
  type session_type,
  description text,
  video_url text,
  date timestamp,
  created_at timestamp DEFAULT now()
);

-- RLS Policies

-- SELECT policies
CREATE POLICY "gym members can view their own gym"
ON gyms FOR SELECT
USING (id = (SELECT gym_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "gym members can view profiles in their gym"
ON profiles FOR SELECT
USING (gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "accessing the tournaments"
ON tournaments FOR SELECT
USING (gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "accessing the calendar"
ON calendar_events FOR SELECT
USING (gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "accessing gym equipment"
ON gym_equipment FOR SELECT
USING (gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "accessing equipment orders"
ON equipment_orders FOR SELECT
USING (gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "accessing drills"
ON drills FOR SELECT
USING (gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "accessing tournament enrollments"
ON tournament_enrollments FOR SELECT
USING (student_id = auth.uid());

-- INSERT policies
CREATE POLICY "users can insert their own profile"
ON profiles FOR INSERT
WITH CHECK (id = auth.uid());

CREATE POLICY "students can enroll in tournaments"
ON tournament_enrollments FOR INSERT
WITH CHECK (student_id = auth.uid());

CREATE POLICY "students can order equipments"
ON equipment_orders FOR INSERT
WITH CHECK (student_id = auth.uid());

CREATE POLICY "admins can insert tournaments"
ON tournaments FOR INSERT
WITH CHECK (
  gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid())
  AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "admins can insert calendar events"
ON calendar_events FOR INSERT
WITH CHECK (
  gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid())
  AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "admins can add gym equipments"
ON gym_equipment FOR INSERT
WITH CHECK (
  gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid())
  AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "admins can add drills taught"
ON drills FOR INSERT
WITH CHECK (
  gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid())
  AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- UPDATE policies
CREATE POLICY "users can update their own profile"
ON profiles FOR UPDATE
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

CREATE POLICY "admins can update tournaments"
ON tournaments FOR UPDATE
USING (gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid()))
WITH CHECK (
  gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid())
  AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "admins can update calendar events"
ON calendar_events FOR UPDATE
USING (gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid()))
WITH CHECK (
  gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid())
  AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "admins can update gym equipments"
ON gym_equipment FOR UPDATE
USING (gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid()))
WITH CHECK (
  gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid())
  AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "admins can update drills"
ON drills FOR UPDATE
USING (gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid()))
WITH CHECK (
  gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid())
  AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- DELETE policies
CREATE POLICY "users can delete their orders"
ON equipment_orders FOR DELETE
USING (student_id = auth.uid());

CREATE POLICY "users can delete their enrollments"
ON tournament_enrollments FOR DELETE
USING (student_id = auth.uid());

CREATE POLICY "admins can delete tournaments"
ON tournaments FOR DELETE
USING (
  gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid())
  AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "admins can delete calendar events"
ON calendar_events FOR DELETE
USING (
  gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid())
  AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "admins can delete gym equipments"
ON gym_equipment FOR DELETE
USING (
  gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid())
  AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "admins can delete drills"
ON drills FOR DELETE
USING (
  gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid())
  AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "admins can delete profiles"
ON profiles FOR DELETE
USING (
  gym_id = (SELECT gym_id FROM profiles WHERE id = auth.uid())
  AND
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Helper functions
CREATE OR REPLACE FUNCTION get_my_gym_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT gym_id FROM profiles WHERE id = auth.uid() LIMIT 1;
$$;

-- Permissions
GRANT SELECT ON public.gyms TO anon, authenticated;
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT SELECT ON public.tournaments TO anon, authenticated;
GRANT SELECT ON public.tournament_enrollments TO anon, authenticated;
GRANT SELECT ON public.calendar_events TO anon, authenticated;
GRANT SELECT ON public.gym_equipment TO anon, authenticated;
GRANT SELECT ON public.equipment_orders TO anon, authenticated;
GRANT SELECT ON public.drills TO anon, authenticated;