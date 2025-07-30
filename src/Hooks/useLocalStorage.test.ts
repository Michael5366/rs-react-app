import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initialValue if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('searchTerm', 'b'));

    expect(result.current[0]).toBe('b');
  });

  it('should return an empty string if initialValue is empty', () => {
    const { result } = renderHook(() => useLocalStorage('searchTerm', ''));

    expect(result.current[0]).toBe('');
  });

  it('should update localStorage when value is changed', () => {
    const { result } = renderHook(() => useLocalStorage('searchTerm', ''));
    const [, setValue] = result.current;

    act(() => setValue('c'));

    expect(localStorage.getItem('searchTerm')).toBe('c');
  });
});
