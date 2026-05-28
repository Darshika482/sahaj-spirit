-- Run this in your Supabase project: Dashboard → SQL Editor → New Query

-- Whitelisted admin emails (add rows manually)
create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  created_at timestamptz default now()
);

-- One record per payment/booking
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  payer_name text not null,
  payer_email text not null,
  payer_mobile text not null,
  member_count integer not null,
  amount_paid integer not null,
  razorpay_order_id text unique not null,
  razorpay_payment_id text,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'success', 'failed')),
  registered_at timestamptz default now()
);

-- One row per individual being registered
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  member_id text unique,
  registration_id uuid not null references registrations(id) on delete cascade,
  name text not null,
  gender text not null,
  age integer not null,
  dietary text not null default 'Jain Food',
  created_at timestamptz default now()
);

-- Indexes for common queries
create index if not exists members_registration_id_idx on members(registration_id);
create index if not exists registrations_payment_status_idx on registrations(payment_status);
create index if not exists registrations_registered_at_idx on registrations(registered_at desc);

-- RLS: only service role can access (our backend uses service role key)
alter table admins enable row level security;
alter table registrations enable row level security;
alter table members enable row level security;

-- Allow service role full access (service role bypasses RLS by default in Supabase)
-- No public access needed — all access goes through our backend API
