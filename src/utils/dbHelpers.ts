/**
 * dbHelpers.ts
 * Supabase DB 공통 헬퍼 — toCamelKey/toCamel 변환 + 클라이언트 접근
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import getSupabase from './supabase';

/**
 * snake_case 키를 camelCase로 변환
 */
export function toCamelKey(key: string): string {
  return key.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
}

/**
 * DB row 객체의 모든 키를 camelCase로 변환
 */
export function toCamel(row: Record<string, unknown> | null): Record<string, unknown> | null {
  if (!row) return null;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    out[toCamelKey(k)] = v;
  }
  return out;
}

/**
 * Supabase 클라이언트 반환 (미설정 시 Error throw)
 */
export function getClient(): SupabaseClient {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');
  return client;
}

/**
 * Supabase 클라이언트 반환 (미설정 시 null)
 */
export function safeClient(): SupabaseClient | null {
  return getSupabase();
}
