import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchCharacters, fetchHomeworld, fetchCharacterDetails } from '../characters';

const mock = new MockAdapter(axios);

describe('API functions', () => {
  afterEach(() => {
    mock.reset();
  });

  describe('fetchCharacters', () => {
    beforeEach(() => {
      global.fetch = vi.fn();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should fetch characters and return them with total pages', async () => {
      const term = 'luke';
      const responseData = {
        count: 1,
        results: [
          {
            name: 'Luke Skywalker',
            gender: 'male',
            height: '172',
            eye_color: 'blue',
            homeworld: 'https://swapi.dev/api/planets/1/',
            url: 'https://swapi.dev/api/people/1/',
          },
        ],
      };

      (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(responseData),
      });

      const result = await fetchCharacters(term);
      expect(result).toEqual({ characters: responseData.results, totalPages: 1 });
      expect(global.fetch).toHaveBeenCalledWith(`https://swapi.dev/api/people/?search=${term}`);
    });

    it('should throw an error if the response is not ok', async () => {
      (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(fetchCharacters('invalid')).rejects.toThrow('Error fetching characters: 404');
      expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?search=invalid');
    });
  });

  describe('fetchHomeworld', () => {
    it('should fetch homeworld and return its name', async () => {
      const url = 'https://swapi.dev/api/planets/1/';
      const responseData = { name: 'Tatooine' };

      mock.onGet(url).reply(200, responseData);

      const result = await fetchHomeworld(url);
      expect(result).toBe('Tatooine');
    });

    it('should throw an error if the response is not ok', async () => {
      const url = 'https://swapi.dev/api/planets/1/';

      mock.onGet(url).reply(404);

      await expect(fetchHomeworld(url)).rejects.toThrow();
    });
  });

  describe('fetchCharacterDetails', () => {
    it('should fetch character details and return them', async () => {
      const url = 'https://swapi.dev/api/people/1/';
      const responseData = {
        name: 'Luke Skywalker',
        gender: 'male',
        height: '172',
        eye_color: 'blue',
        homeworld: 'https://swapi.dev/api/planets/1/',
        url,
      };

      mock.onGet(url).reply(200, responseData);

      const result = await fetchCharacterDetails(url);
      expect(result).toEqual(responseData);
    });

    it('should throw an error if the response is not ok', async () => {
      const url = 'https://swapi.dev/api/people/1/';

      mock.onGet(url).reply(404);

      await expect(fetchCharacterDetails(url)).rejects.toThrow();
    });
  });
});
