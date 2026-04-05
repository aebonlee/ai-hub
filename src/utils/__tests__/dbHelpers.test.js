import { describe, it, expect } from 'vitest';
import { toCamelKey, toCamel } from '../dbHelpers';

describe('toCamelKey', () => {
  it('converts snake_case to camelCase', () => {
    expect(toCamelKey('created_at')).toBe('createdAt');
    expect(toCamelKey('is_sold_out')).toBe('isSoldOut');
    expect(toCamelKey('author_name')).toBe('authorName');
  });

  it('returns same string if no underscores', () => {
    expect(toCamelKey('id')).toBe('id');
    expect(toCamelKey('title')).toBe('title');
  });

  it('handles multiple consecutive underscored segments', () => {
    expect(toCamelKey('view_count')).toBe('viewCount');
    expect(toCamelKey('post_type')).toBe('postType');
  });
});

describe('toCamel', () => {
  it('converts all keys in a row object', () => {
    const row = { id: 1, created_at: '2024-01-01', author_name: 'Kim' };
    const result = toCamel(row);
    expect(result).toEqual({ id: 1, createdAt: '2024-01-01', authorName: 'Kim' });
  });

  it('returns null for null input', () => {
    expect(toCamel(null)).toBeNull();
  });

  it('returns null for undefined input', () => {
    expect(toCamel(undefined)).toBeNull();
  });

  it('handles empty object', () => {
    expect(toCamel({})).toEqual({});
  });

  it('preserves values of different types', () => {
    const row = { is_active: true, sort_order: 5, title_en: null };
    const result = toCamel(row);
    expect(result).toEqual({ isActive: true, sortOrder: 5, titleEn: null });
  });
});
