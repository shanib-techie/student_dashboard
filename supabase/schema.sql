-- ─────────────────────────────────────────────────────────────────────
-- LearnOS — Supabase SQL Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────────────

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─── Table: courses ──────────────────────────────────────────────────
create table if not exists courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null default 0 check (progress between 0 and 100),
  icon_name   text not null default 'BookOpen',
  created_at  timestamptz not null default now()
);

-- ─── Row Level Security ──────────────────────────────────────────────
alter table courses enable row level security;

-- Allow public read (dashboard is single-user for now)
create policy "Public read access"
  on courses for select
  using (true);

-- ─── Seed Data ───────────────────────────────────────────────────────
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns',         75, 'BookOpen'),
  ('Next.js Mastery',                 40, 'Code'),
  ('TypeScript Pro',                  90, 'FileCode'),
  ('Data Structures & Algorithms',    60, 'Brain'),
  ('Tailwind CSS Deep Dive',          55, 'Layers'),
  ('Node.js & REST APIs',             30, 'Terminal')
on conflict do nothing;
