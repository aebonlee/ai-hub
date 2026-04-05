/**
 * commentStorage.js
 * 댓글 CRUD — Supabase 전용 (boardStorage.js 패턴 준수)
 */

import getSupabase from './supabase';
import { toCamel } from './dbHelpers';

/**
 * 특정 게시글의 댓글 목록 조회
 * @param {number|string} postId - 게시글 ID
 * @param {string} postType - 'blog' | 'board'
 */
export async function getComments(postId, postType) {
  const client = getSupabase();
  if (!client) return [];
  const { data, error } = await client
    .from('ah_comments')
    .select('*')
    .eq('post_id', Number(postId))
    .eq('post_type', postType)
    .order('created_at', { ascending: true });
  if (error) {
    console.error('getComments error:', error);
    return [];
  }
  return (data || []).map(toCamel);
}

/**
 * 댓글 작성
 * @param {{ postId: number, postType: string, authorId: string, authorName: string, content: string }}
 */
export async function createComment({ postId, postType, authorId, authorName, content }) {
  const client = getSupabase();
  if (!client) return null;
  const { data, error } = await client
    .from('ah_comments')
    .insert({
      post_id: Number(postId),
      post_type: postType,
      author_id: authorId,
      author_name: authorName,
      content,
      created_at: new Date().toISOString()
    })
    .select()
    .single();
  if (error) {
    console.error('createComment error:', error);
    return null;
  }
  return toCamel(data);
}

/**
 * 댓글 삭제
 * @param {number} id - 댓글 ID
 */
export async function deleteComment(id) {
  const client = getSupabase();
  if (!client) return false;
  const { error } = await client
    .from('ah_comments')
    .delete()
    .eq('id', Number(id));
  if (error) {
    console.error('deleteComment error:', error);
    return false;
  }
  return true;
}
