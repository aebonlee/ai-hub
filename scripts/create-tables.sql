-- ============================================
-- DreamIT AI Hub - Supabase 테이블 생성 스크립트
-- 접두사: ah_ (AI Hub)
-- ============================================

-- 1. 상품 (분양 상품)
CREATE TABLE IF NOT EXISTS ah_products (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE,
  category TEXT DEFAULT 'single-site',
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  description_en TEXT,
  price INTEGER DEFAULT 0,
  image_url TEXT,
  is_sold_out BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 주문
CREATE TABLE IF NOT EXISTS ah_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_phone TEXT,
  total_amount INTEGER DEFAULT 0,
  payment_method TEXT DEFAULT 'card',
  payment_status TEXT DEFAULT 'pending',
  portone_payment_id TEXT,
  paid_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancel_reason TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 주문 상세
CREATE TABLE IF NOT EXISTS ah_order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id UUID REFERENCES ah_orders(id) ON DELETE CASCADE,
  product_title TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price INTEGER DEFAULT 0,
  subtotal INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 공지사항
CREATE TABLE IF NOT EXISTS ah_notices (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  content TEXT NOT NULL,
  content_en TEXT,
  is_pinned BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Q&A 질문
CREATE TABLE IF NOT EXISTS ah_qna_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT,
  is_answered BOOLEAN DEFAULT FALSE,
  answer_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 댓글
CREATE TABLE IF NOT EXISTS ah_comments (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT NOT NULL,
  post_type TEXT NOT NULL DEFAULT 'qna',
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. 분양 신청
CREATE TABLE IF NOT EXISTS ah_franchise_applications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_site TEXT,
  experience TEXT,
  motivation TEXT,
  portfolio_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. 블로그
CREATE TABLE IF NOT EXISTS ah_blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  excerpt TEXT,
  excerpt_en TEXT,
  content TEXT,
  content_en TEXT,
  category TEXT,
  category_en TEXT,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT,
  date DATE DEFAULT CURRENT_DATE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. 게시판
CREATE TABLE IF NOT EXISTS ah_board_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT,
  author TEXT,
  author_id UUID REFERENCES auth.users(id),
  date DATE DEFAULT CURRENT_DATE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. 갤러리
CREATE TABLE IF NOT EXISTS ah_gallery_items (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  description_en TEXT,
  category TEXT,
  image_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. 회원 프로필 (공유 테이블 - 이미 존재할 수 있음)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  account_status TEXT DEFAULT 'active',
  status_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RLS (Row Level Security) 활성화
-- ============================================

ALTER TABLE ah_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE ah_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ah_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ah_notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE ah_qna_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ah_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ah_franchise_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ah_blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ah_board_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ah_gallery_items ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS 정책: Public Read
-- ============================================

CREATE POLICY "Public read ah_products" ON ah_products FOR SELECT USING (true);
CREATE POLICY "Public read ah_notices" ON ah_notices FOR SELECT USING (true);
CREATE POLICY "Public read ah_qna_posts" ON ah_qna_posts FOR SELECT USING (true);
CREATE POLICY "Public read ah_comments" ON ah_comments FOR SELECT USING (true);
CREATE POLICY "Public read ah_blog_posts" ON ah_blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read ah_board_posts" ON ah_board_posts FOR SELECT USING (true);
CREATE POLICY "Public read ah_gallery_items" ON ah_gallery_items FOR SELECT USING (true);

-- ============================================
-- RLS 정책: Authenticated Insert
-- ============================================

CREATE POLICY "Auth insert ah_orders" ON ah_orders FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth insert ah_order_items" ON ah_order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth insert ah_qna_posts" ON ah_qna_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Auth insert ah_comments" ON ah_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Auth insert ah_franchise_applications" ON ah_franchise_applications FOR INSERT WITH CHECK (true);

-- ============================================
-- RLS 정책: Owner Update/Delete
-- ============================================

CREATE POLICY "Owner update ah_orders" ON ah_orders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Owner update ah_qna_posts" ON ah_qna_posts FOR UPDATE TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "Owner delete ah_qna_posts" ON ah_qna_posts FOR DELETE TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "Owner delete ah_comments" ON ah_comments FOR DELETE TO authenticated USING (auth.uid() = author_id);

-- ============================================
-- RLS 정책: Orders - User can read own orders
-- ============================================

CREATE POLICY "User read own ah_orders" ON ah_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Read ah_order_items" ON ah_order_items FOR SELECT USING (true);

-- ============================================
-- 인덱스
-- ============================================

CREATE INDEX IF NOT EXISTS idx_ah_orders_user_id ON ah_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_ah_orders_order_number ON ah_orders(order_number);
CREATE INDEX IF NOT EXISTS idx_ah_order_items_order_id ON ah_order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_ah_notices_pinned_created ON ah_notices(is_pinned DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ah_qna_posts_created ON ah_qna_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ah_comments_post ON ah_comments(post_id, post_type);
CREATE INDEX IF NOT EXISTS idx_ah_products_active ON ah_products(is_active, sort_order);
