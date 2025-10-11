/*
  # Create News and Content Management System

  1. New Tables
    - `news` - News articles and announcements
    - `comments` - User comments on news
    - `events` - Upcoming events
    - `citizen_appeals` - Citizen feedback and appeals
    - `vacancies` - Job openings

  2. Security
    - Enable RLS on all tables
    - Public read access to published content
    - Public write for appeals and comments
*/

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'news',
  author text NOT NULL DEFAULT 'Администрация',
  images jsonb DEFAULT '[]'::jsonb,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  published boolean DEFAULT false,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id uuid REFERENCES news(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  author_email text,
  content text NOT NULL,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text,
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  image_url text,
  registration_link text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS citizen_appeals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vacancies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  description text NOT NULL,
  requirements text,
  salary_range text,
  contact_info text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_news_published ON news(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_news_id ON comments(news_id);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE citizen_appeals ENABLE ROW LEVEL SECURITY;
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published news"
  ON news FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Anyone can view approved comments"
  ON comments FOR SELECT
  TO public
  USING (approved = true);

CREATE POLICY "Anyone can create comments"
  ON comments FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create appeals"
  ON citizen_appeals FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view active vacancies"
  ON vacancies FOR SELECT
  TO public
  USING (active = true);
