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