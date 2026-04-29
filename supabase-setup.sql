-- Deposits table
CREATE TABLE deposits (
  id BIGSERIAL PRIMARY KEY,
  office TEXT NOT NULL,
  date DATE NOT NULL,
  insurance_checks DECIMAL(10,2) DEFAULT 0,
  medi_eft_insurance DECIMAL(10,2) DEFAULT 0,
  cash DECIMAL(10,2) DEFAULT 0,
  debit_credit_cards DECIMAL(10,2) DEFAULT 0,
  care_credit DECIMAL(10,2) DEFAULT 0,
  sunbit DECIMAL(10,2) DEFAULT 0,
  grand_total DECIMAL(10,2) DEFAULT 0,
  petty_cash DECIMAL(10,2) DEFAULT 0,
  staff_name TEXT DEFAULT '',
  office_sales DECIMAL(10,2) DEFAULT 0,
  uploads JSONB DEFAULT '[]',
  doctor_prod JSONB DEFAULT '[]',
  patients JSONB DEFAULT '{}',
  parsed_checks JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PINs table
CREATE TABLE office_pins (
  office TEXT PRIMARY KEY,
  pin TEXT NOT NULL
);

-- Insert default PINs
INSERT INTO office_pins (office, pin) VALUES
  ('Artico Dental Mesquite', '5150'),
  ('Artico Dental Duncanville', '5116'),
  ('Artico Dental Dallas', '5231'),
  ('Fundamental Dental', '5243');

-- Enable Row Level Security but allow all access via anon key
-- (PINs provide our access control layer)
ALTER TABLE deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE office_pins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to deposits" ON deposits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to office_pins" ON office_pins FOR ALL USING (true) WITH CHECK (true);
