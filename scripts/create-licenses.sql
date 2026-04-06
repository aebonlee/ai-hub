-- ============================================
-- LicenseGuard — 개인 학습자 콘텐츠 접근 제어
-- 실행 위치: Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. user_licenses 테이블 생성
-- ============================================
CREATE TABLE IF NOT EXISTS user_licenses (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  license_type TEXT NOT NULL CHECK (license_type IN ('single', 'bundle')),
  site_slug TEXT,  -- NULL for bundle, 'chatgpt'/'gemini' etc for single
  order_id UUID REFERENCES ah_orders(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_user_site UNIQUE (user_id, license_type, site_slug)
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_ul_user_site ON user_licenses(user_id, site_slug);
CREATE INDEX IF NOT EXISTS idx_ul_user_bundle ON user_licenses(user_id, license_type) WHERE license_type = 'bundle';

-- RLS
ALTER TABLE user_licenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own licenses" ON user_licenses FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- 2. grant_license RPC (SECURITY DEFINER)
--    결제 완료 후 클라이언트에서 호출
--    주문 소유자/결제 상태를 검증 후 라이선스 생성
-- ============================================
CREATE OR REPLACE FUNCTION grant_license(
  p_user_id UUID,
  p_order_id UUID,
  p_license_type TEXT,
  p_site_slug TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order RECORD;
  v_license_id BIGINT;
BEGIN
  -- 1) 주문 확인: 소유자 + 결제 완료
  SELECT id, user_id, payment_status
  INTO v_order
  FROM ah_orders
  WHERE id = p_order_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'ORDER_NOT_FOUND');
  END IF;

  IF v_order.user_id IS DISTINCT FROM p_user_id THEN
    RETURN jsonb_build_object('ok', false, 'error', 'NOT_ORDER_OWNER');
  END IF;

  IF v_order.payment_status <> 'paid' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'ORDER_NOT_PAID');
  END IF;

  -- 2) license_type 유효성
  IF p_license_type NOT IN ('single', 'bundle') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'INVALID_LICENSE_TYPE');
  END IF;

  -- 3) single 타입이면 site_slug 필수
  IF p_license_type = 'single' AND (p_site_slug IS NULL OR p_site_slug = '') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'SITE_SLUG_REQUIRED');
  END IF;

  -- 4) 라이선스 생성 (중복 시 무시)
  INSERT INTO user_licenses (user_id, license_type, site_slug, order_id)
  VALUES (p_user_id, p_license_type, p_site_slug, p_order_id)
  ON CONFLICT (user_id, license_type, site_slug) DO NOTHING
  RETURNING id INTO v_license_id;

  IF v_license_id IS NULL THEN
    -- 이미 존재하는 라이선스
    RETURN jsonb_build_object('ok', true, 'already_exists', true);
  END IF;

  RETURN jsonb_build_object('ok', true, 'license_id', v_license_id);
END;
$$;

-- ============================================
-- 3. check_user_license RPC
--    각 학습 사이트에서 호출
--    single 또는 bundle 중 하나라도 있으면 true
-- ============================================
CREATE OR REPLACE FUNCTION check_user_license(
  p_user_id UUID,
  p_site_slug TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_licenses
    WHERE user_id = p_user_id
      AND (
        (license_type = 'bundle')
        OR
        (license_type = 'single' AND site_slug = p_site_slug)
      )
  );
END;
$$;

-- ============================================
-- 4. ah_products에 license_site_slug 컬럼 추가
-- ============================================
ALTER TABLE ah_products ADD COLUMN IF NOT EXISTS license_site_slug TEXT;

-- ============================================
-- 5. 12개 상품 데이터 INSERT (개인 학습자용)
--    11개 개별 사이트(각 30,000원) + 1개 번들(150,000원)
-- ============================================

-- 개별 사이트 상품 (single-site 카테고리)
INSERT INTO ah_products (slug, category, title, title_en, description, description_en, price, is_active, sort_order, license_site_slug) VALUES
  ('license-chatgpt', 'single-site', 'ChatGPT 활용 이용권', 'ChatGPT Utilization License', 'ChatGPT 활용 학습사이트 평생 이용권', 'Lifetime access to ChatGPT Utilization learning site', 30000, true, 100, 'chatgpt'),
  ('license-claude', 'single-site', 'Claude AI 활용 이용권', 'Claude AI License', 'Claude AI 활용 학습사이트 평생 이용권', 'Lifetime access to Claude AI learning site', 30000, true, 101, 'claude'),
  ('license-gemini', 'single-site', 'Gemini AI 활용 이용권', 'Gemini AI License', 'Gemini AI 활용 학습사이트 평생 이용권', 'Lifetime access to Gemini AI learning site', 30000, true, 102, 'gemini'),
  ('license-genspark', 'single-site', 'GenSpark AI 이용권', 'GenSpark AI License', 'GenSpark AI 학습사이트 평생 이용권', 'Lifetime access to GenSpark AI learning site', 30000, true, 103, 'genspark'),
  ('license-autowork', 'single-site', 'AI 업무 자동화 이용권', 'AI Work Automation License', 'AI 업무 자동화 학습사이트 평생 이용권', 'Lifetime access to AI Work Automation learning site', 30000, true, 104, 'autowork'),
  ('license-ai-agents', 'single-site', 'AI 에이전트 이용권', 'AI Agent License', 'AI 에이전트 학습사이트 평생 이용권', 'Lifetime access to AI Agent learning site', 30000, true, 105, 'ai-agents'),
  ('license-ai-data', 'single-site', 'AI 데이터 분석 이용권', 'AI Data Analysis License', 'AI 데이터 분석 학습사이트 평생 이용권', 'Lifetime access to AI Data Analysis learning site', 30000, true, 106, 'ai-data'),
  ('license-ai-media', 'single-site', 'AI 미디어 생성 이용권', 'AI Media Generation License', 'AI 미디어 생성 학습사이트 평생 이용권', 'Lifetime access to AI Media Generation learning site', 30000, true, 107, 'ai-media'),
  ('license-ai-prompt', 'single-site', '프롬프트 엔지니어링 이용권', 'Prompt Engineering License', '프롬프트 엔지니어링 학습사이트 평생 이용권', 'Lifetime access to Prompt Engineering learning site', 30000, true, 108, 'ai-prompt'),
  ('license-fine-tuning', 'single-site', 'AI 파인튜닝 이용권', 'AI Fine-Tuning License', 'AI 파인튜닝 학습사이트 평생 이용권', 'Lifetime access to AI Fine-Tuning learning site', 30000, true, 109, 'fine-tuning'),
  ('license-openclaw', 'single-site', '오픈소스 AI 이용권', 'Open Source AI License', '오픈소스 AI 학습사이트 평생 이용권', 'Lifetime access to Open Source AI learning site', 30000, true, 110, 'openclaw')
ON CONFLICT (slug) DO NOTHING;

-- 번들 상품
INSERT INTO ah_products (slug, category, title, title_en, description, description_en, price, is_active, sort_order, license_site_slug) VALUES
  ('license-bundle-all', 'bundle', 'AI 학습 전체 이용권 (11개 사이트)', 'AI Learning All-Access Pass (11 Sites)', '11개 AI 학습사이트 평생 이용권 — 개별 구매 대비 약 55% 할인', 'Lifetime access to all 11 AI learning sites — ~55% discount vs individual purchase', 150000, true, 50, NULL)
ON CONFLICT (slug) DO NOTHING;
