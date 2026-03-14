-- ═══════════════════════════════════════════════════════════════════════════════
--  All Care Dental Clinic — Supabase Database Schema
--  Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════════════════════

-- 1. APPOINTMENTS TABLE
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS appointments (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT          NOT NULL CHECK (char_length(name) >= 2),
  phone       TEXT          NOT NULL CHECK (phone ~ '^[6-9][0-9]{9}$'),
  date        DATE          NOT NULL,
  time        TEXT          NOT NULL,
  treatment   TEXT,
  notes       TEXT          CHECK (char_length(notes) <= 500),
  status      TEXT          NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending','confirmed','completed','cancelled')),
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- 2. AUTO-UPDATE updated_at TRIGGER
-- ──────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3. INDEXES
-- ──────────────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_appointments_date   ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_phone  ON appointments(phone);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created ON appointments(created_at DESC);

-- 4. ROW LEVEL SECURITY (RLS)
-- ──────────────────────────────────────────────────────────────────────────────
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow INSERT from anon (form submissions)
CREATE POLICY "Allow public insert"
  ON appointments FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service_role full access (API routes)
CREATE POLICY "Allow service role full access"
  ON appointments FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. SAMPLE DATA (optional — remove in production)
-- ──────────────────────────────────────────────────────────────────────────────
-- INSERT INTO appointments (name, phone, date, time, treatment, notes) VALUES
--   ('Ravi Sharma',  '9876543210', '2026-03-15', '10:00 AM', 'Root Canal Treatment', 'Upper right molar'),
--   ('Sneha Patil',  '8765432109', '2026-03-16', '5:00 PM',  'Teeth Whitening',      NULL),
--   ('Amit Joshi',   '7654321098', '2026-03-17', '11:00 AM', 'Dental Implants',      'Consultation first');

-- ─────────────────────────────────────────────────────────────────────────────
--  VERIFICATION: Run this to confirm table was created correctly
-- ─────────────────────────────────────────────────────────────────────────────
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'appointments'
-- ORDER BY ordinal_position;
