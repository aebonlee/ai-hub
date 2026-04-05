/**
 * noticeStorage.js
 * notices CRUD — Supabase 전용 (commentStorage.js 패턴 준수)
 */

import getSupabase from './supabase';
import { toCamel } from './dbHelpers';

/**
 * 공지 목록 조회 (페이지네이션)
 * page 1일 때 고정글을 먼저 가져온 후 일반글
 */
export async function getNotices(page = 1, limit = 10) {
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
export async function getNotice(id) {
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
      .update({ view_count: (current.view_count || 0) + 1 })
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
export async function createNotice({ title, titleEn, content, contentEn, isPinned, authorId, authorName }) {
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
export async function updateNotice(id, { title, titleEn, content, contentEn, isPinned }) {
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
export async function deleteNotice(id) {
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
