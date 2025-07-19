import { describe, it, expect, vi, afterEach } from 'vitest';
import fetchData from './swapiService';

describe('fetchData function', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return data if response is ok', async () => {
    const mockData = {
      itemHeader: 'Item name',
      title: 'Some',
      desHeader: 'Item description',
      opening_crawl: 'About',
    };

    vi.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await fetchData('https://swapi.dev/api/films/1/');
    expect(result).toEqual(mockData);
  });

  it('should throw error if fetch fails', async () => {
    vi.spyOn(window, 'fetch').mockRejectedValueOnce(new Error('Network Error'));

    try {
      await fetchData('https://swapi.dev/api/films/1/');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('Network Error');
    }
  });

  it('should throw error if response is not ok', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);

    await expect(fetchData('https://swapi.dev/api/films/999/')).rejects.toThrow(
      'Error response: 404'
    );
  });
});
