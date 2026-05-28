-- Migration 001: Remove dietary column from members table
-- Run this in Supabase Dashboard → SQL Editor

ALTER TABLE members DROP COLUMN IF EXISTS dietary;
