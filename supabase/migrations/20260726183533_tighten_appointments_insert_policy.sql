/*
# Tighten appointments INSERT policy

1. Security changes
- Drop the permissive `anon_insert_appointments` policy that used `WITH CHECK (true)`.
- Replace it with a policy that still allows public booking submissions (no sign-in on this site),
  but validates that every required field is present and non-empty before the row is accepted.
- Required fields checked: name, email, phone, service, preferred_date, preferred_time.
- Email must match a basic email pattern; phone must be at least 7 digits.
- This prevents blank/junk/malformed inserts while keeping the public booking form working.

2. Notes
- SELECT/UPDATE/DELETE remain locked down (no policies) — only INSERT is permitted, and only for well-formed rows.
- RLS stays enabled.
*/

DROP POLICY IF EXISTS "anon_insert_appointments" ON appointments;

CREATE POLICY "anon_insert_appointments"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL
    AND length(btrim(name)) >= 2
    AND email IS NOT NULL
    AND email ~ '^[^@]+@[^@]+\.[^@]+$'
    AND phone IS NOT NULL
    AND length(regexp_replace(phone, '[^0-9]', '', 'g')) >= 7
    AND service IS NOT NULL
    AND length(btrim(service)) > 0
    AND preferred_date IS NOT NULL
    AND preferred_time IS NOT NULL
    AND length(btrim(preferred_time)) > 0
  );
