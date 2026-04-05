-- ============================================
-- 공지사항 & Q&A 게시판 — Supabase 테이블 생성
-- Supabase Dashboard > SQL Editor 에서 실행
-- ============================================

-- ── 공지사항 ──
create table notices (
  id bigint generated always as identity primary key,
  title text not null,
  title_en text,
  content text not null,
  content_en text,
  is_pinned boolean default false,
  author_id uuid references auth.users(id),
  author_name text,
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table notices enable row level security;

create policy "notices_select" on notices for select using (true);
create policy "notices_insert" on notices for insert with check (auth.uid() is not null);
create policy "notices_update" on notices for update using (auth.uid() = author_id);
create policy "notices_delete" on notices for delete using (auth.uid() = author_id);

-- ── Q&A ──
create table qna_posts (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  category text,
  author_id uuid references auth.users(id),
  author_name text,
  is_answered boolean default false,
  answer_count integer default 0,
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table qna_posts enable row level security;

create policy "qna_select" on qna_posts for select using (true);
create policy "qna_insert" on qna_posts for insert with check (auth.uid() is not null);
create policy "qna_update" on qna_posts for update using (auth.uid() = author_id);
create policy "qna_delete" on qna_posts for delete using (auth.uid() = author_id);

-- Q&A 답변은 기존 comments 테이블 재사용 (post_type = 'qna')
