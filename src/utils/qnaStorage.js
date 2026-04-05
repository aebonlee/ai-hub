/**
 * qnaStorage.js
 * qna_posts CRUD + answer_count 동기화 — Supabase 전용
 */

import getSupabase from './supabase';
import { toCamel } from './dbHelpers';

/**
 * Q&A 목록 조회 (페이지네이션 + 필터)
 * @param {number} page
 * @param {number} limit
 * @param {'all'|'answered'|'unanswered'} filter
 */
export async function getQnaPosts(page = 1, limit = 10, filter = 'all') {
  const client = getSupabase();
  if (!client) return { data: [], total: 0 };

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = client.from('ah_qna_posts').select('*', { count: 'exact' });

  if (filter === 'answered') query = query.eq('is_answered', true);
  else if (filter === 'unanswered') query = query.eq('is_answered', false);

  query = query
    .order('created_at', { ascending: false })
    .range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error('getQnaPosts error:', error);
    return { data: [], total: 0 };
  }

  return { data: (data || []).map(toCamel), total: count || 0 };
}

/**
 * 단일 Q&A 조회 + 조회수 증가
 */
export async function getQnaPost(id) {
  const client = getSupabase();
  if (!client) return null;

  const { data: current } = await client
    .from('ah_qna_posts')
    .select('view_count')
    .eq('id', Number(id))
    .single();

  if (current) {
    await client
      .from('ah_qna_posts')
      .update({ view_count: (current.view_count || 0) + 1 })
      .eq('id', Number(id));
  }

  const { data, error } = await client
    .from('ah_qna_posts')
    .select('*')
    .eq('id', Number(id))
    .single();

  if (error) {
    console.error('getQnaPost error:', error);
    return null;
  }
  return toCamel(data);
}

/**
 * Q&A 작성
 */
export async function createQnaPost({ title, content, category, authorId, authorName }) {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('ah_qna_posts')
    .insert({
      title,
      content,
      category: category || null,
      author_id: authorId,
      author_name: authorName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error('createQnaPost error:', error);
    return null;
  }
  return toCamel(data);
}

/**
 * Q&A 수정
 */
export async function updateQnaPost(id, { title, content, category }) {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('ah_qna_posts')
    .update({
      title,
      content,
      category: category || null,
      updated_at: new Date().toISOString()
    })
    .eq('id', Number(id))
    .select()
    .single();

  if (error) {
    console.error('updateQnaPost error:', error);
    return null;
  }
  return toCamel(data);
}

/**
 * Q&A 삭제
 */
export async function deleteQnaPost(id) {
  const client = getSupabase();
  if (!client) return false;

  const { error } = await client
    .from('ah_qna_posts')
    .delete()
    .eq('id', Number(id));

  if (error) {
    console.error('deleteQnaPost error:', error);
    return false;
  }
  return true;
}

/**
 * 답변수 동기화 — 댓글 추가/삭제 시 호출
 */
export async function syncAnswerCount(postId) {
  const client = getSupabase();
  if (!client) return;

  const { count } = await client
    .from('ah_comments')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', Number(postId))
    .eq('post_type', 'qna');

  const answerCount = count || 0;

  await client
    .from('ah_qna_posts')
    .update({
      answer_count: answerCount,
      is_answered: answerCount > 0
    })
    .eq('id', Number(postId));
}
