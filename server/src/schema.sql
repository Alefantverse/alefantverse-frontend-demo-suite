CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(160) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(40) NOT NULL DEFAULT 'staff' CHECK (role IN ('admin','staff','parent','student')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(255) NOT NULL,
  child_age INTEGER NOT NULL,
  class_level VARCHAR(80) NOT NULL,
  academic_year VARCHAR(80) NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'New',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS school_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(255) NOT NULL,
  child_age INTEGER NOT NULL,
  class_level VARCHAR(80) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  visitor_count INTEGER NOT NULL DEFAULT 1,
  status VARCHAR(40) NOT NULL DEFAULT 'Requested',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_content (
  key VARCHAR(120) PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL CHECK (type IN ('news','event')),
  title VARCHAR(220) NOT NULL,
  summary TEXT NOT NULL,
  event_date DATE,
  location VARCHAR(180),
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(180) NOT NULL,
  category VARCHAR(80) NOT NULL,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(220),
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_code VARCHAR(60) UNIQUE NOT NULL,
  full_name VARCHAR(160) NOT NULL,
  class_level VARCHAR(80) NOT NULL,
  house VARCHAR(80),
  academic_year VARCHAR(40) NOT NULL,
  guardian_name VARCHAR(160),
  guardian_email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  month_label VARCHAR(20) NOT NULL,
  attendance_percent NUMERIC(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject VARCHAR(120) NOT NULL,
  score NUMERIC(5,2) NOT NULL,
  term VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS fees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  label VARCHAR(120) NOT NULL,
  amount NUMERIC(14,2) NOT NULL,
  paid NUMERIC(14,2) NOT NULL DEFAULT 0,
  due_date DATE
);

CREATE TABLE IF NOT EXISTS timetable (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_level VARCHAR(80) NOT NULL,
  day_name VARCHAR(20) NOT NULL,
  start_time TIME NOT NULL,
  subject VARCHAR(120) NOT NULL,
  venue VARCHAR(120),
  teacher VARCHAR(160)
);

CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(220) NOT NULL,
  category VARCHAR(80) NOT NULL,
  body TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference VARCHAR(120) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  student_id UUID REFERENCES students(id),
  amount NUMERIC(14,2) NOT NULL,
  purpose VARCHAR(120) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  provider VARCHAR(60),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
