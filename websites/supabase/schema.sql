-- ═══════════════════════════════════════════════════════════
-- Vibe & Thread — Supabase Database Schema
-- Run this in your Supabase SQL Editor (supabase.com → Dashboard → SQL Editor)
-- ═══════════════════════════════════════════════════════════

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  "categoryLabel" TEXT NOT NULL,
  price TEXT NOT NULL,
  "priceNum" NUMERIC NOT NULL,
  image TEXT,
  filter TEXT DEFAULT 'none',
  alt TEXT,
  description TEXT,
  sizes TEXT[] DEFAULT '{}',
  details TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wishlists table (syncs user wishlists across devices)
CREATE TABLE IF NOT EXISTS wishlists (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table (optional — for future order history)
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  shipping NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  customer JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Products: readable by everyone, writable by no one (admin-managed)
CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  USING (true);

-- Wishlists: users can only read/write their own
CREATE POLICY "Users can read their own wishlist"
  ON wishlists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wishlist"
  ON wishlists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wishlist"
  ON wishlists FOR UPDATE
  USING (auth.uid() = user_id);

-- Orders: users can only read their own
CREATE POLICY "Users can read their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);
