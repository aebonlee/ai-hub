/**
 * dbHelpers.js
 * Supabase DB 공통 헬퍼 — toCamelKey/toCamel 변환 + 클라이언트 접근
 */

import getSupabase from './supabase';

/**
 * snake_case 키를 camelCase로 변환
 * @param {string} key
 * @returns {string}
 */
export function toCamelKey(key) {
  return key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * DB row 객체의 모든 키를 camelCase로 변환
 * @param {Record<string, any> | null} row
 * @returns {Record<string, any> | null}
 */
export function toCamel(row) {
  if (!row) return null;
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    out[toCamelKey(k)] = v;
  }
  return out;
}

/**
 * Supabase 클라이언트 반환 (미설정 시 Error throw)
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function getClient() {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');
  return client;
}

/**
 * Supabase 클라이언트 반환 (미설정 시 null)
 * @returns {import('@supabase/supabase-js').SupabaseClient | null}
 */
export function safeClient() {
  return getSupabase();
}
