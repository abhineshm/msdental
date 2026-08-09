/*
# Create appointments table (single-tenant, no auth)

1. New Tables
- `appointments`
  - `id` (uuid, primary key)
  - `name` (text, not null) - patient's full name
  - `email` (text, not null) - patient's email
  - `phone` (text, not null) - patient's phone number
  - `service` (text, not null) - requested dental service
  - `preferred_date` (date, not null) - preferred appointment date
  - `preferred_time` (text, not null) - preferred time slot
  - `message` (text) - optional notes from patient
  - `status` (text, default 'pending') - booking status
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `appointments`.
- Allow anon + authenticated INSERT so visitors can submit booking requests from the public website.
- No SELECT/UPDATE/DELETE for anon — clinic staff would manage records through an authenticated admin view (not built in this task).
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_appointments" ON appointments;
CREATE POLICY "anon_insert_appointments"
  ON appointments FOR INSERT
  TO anon, authenticated WITH CHECK (true);
