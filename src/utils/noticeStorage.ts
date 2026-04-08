/**
 * noticeStorage.ts
 * notices CRUD — Supabase 전용 (commentStorage.js 패턴 준수)
 */

import getSupabase from './supabase';
import { toCamel } from './dbHelpers';

interface NoticeInput {
  title: string;
  titleEn?: string;
  content: string;
  contentEn?: string;
  isPinned?: boolean;
  authorId: string;
  authorName: string;
}

interface NoticeUpdateInput {
  title: string;
  titleEn?: string;
  content: string;
  contentEn?: string;
  isPinned?: boolean;
}

interface NoticeListResult {
  data: Record<string, unknown>[];
  total: number;
}

/**
 * 공지 목록 조회 (페이지네이션)
 * page 1일 때 고정글을 먼저 가져온 후 일반글
 */
export async function getNotices(page: number = 1, limit: number = 10): Promise<NoticeListResult> {
  const client = getSupabase();
  if (!client) return { data: [], total: 0 };

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // 전체 카운트
  const { count } = await client
    .from('ah_notices')
    .select('*', { count: 'exact', head: true });

  // 고정글 먼저, 나머지는 최신순
  const { data, error } = await client
    .from('ah_notices')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('getNotices error:', error);
    return { data: [], total: 0 };
  }

  return { data: (data || []).map(toCamel), total: count || 0 };
}

/**
 * 단일 공지 조회 + 조회수 증가
 */
export async function getNotice(id: number | string): Promise<Record<string, unknown> | null> {
  const client = getSupabase();
  if (!client) return null;

  // 조회수 증가 (RPC 없이 직접 업데이트)
  const { data: current } = await client
    .from('ah_notices')
    .select('view_count')
    .eq('id', Number(id))
    .single();

  if (current) {
    await client
      .from('ah_notices')
      .update({ view_count: ((current as Record<string, unknown>).view_count as number || 0) + 1 })
      .eq('id', Number(id));
  }

  const { data, error } = await client
    .from('ah_notices')
    .select('*')
    .eq('id', Number(id))
    .single();

  if (error) {
    console.error('getNotice error:', error);
    return null;
  }
  return toCamel(data);
}

/**
 * 공지 작성
 */
export async function createNotice({ title, titleEn, content, contentEn, isPinned, authorId, authorName }: NoticeInput): Promise<Record<string, unknown> | null> {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('ah_notices')
    .insert({
      title,
      title_en: titleEn || null,
      content,
      content_en: contentEn || null,
      is_pinned: isPinned || false,
      author_id: authorId,
      author_name: authorName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error('createNotice error:', error);
    return null;
  }
  return toCamel(data);
}

/**
 * 공지 수정
 */
export async function updateNotice(id: number | string, { title, titleEn, content, contentEn, isPinned }: NoticeUpdateInput): Promise<Record<string, unknown> | null> {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('ah_notices')
    .update({
      title,
      title_en: titleEn || null,
      content,
      content_en: contentEn || null,
      is_pinned: isPinned || false,
      updated_at: new Date().toISOString()
    })
    .eq('id', Number(id))
    .select()
    .single();

  if (error) {
    console.error('updateNotice error:', error);
    return null;
  }
  return toCamel(data);
}

/**
 * 공지 삭제
 */
export async function deleteNotice(id: number | string): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  const { error } = await client
    .from('ah_notices')
    .delete()
    .eq('id', Number(id));

  if (error) {
    console.error('deleteNotice error:', error);
    return false;
  }
  return true;
}
