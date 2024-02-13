import axios from 'axios';

// Konfiguracja klucza API dla axios
axios.defaults.headers.common['x-api-key'] =
  'live_vYSWqZaZ9I3XINODiUUhkZMgIxgBFrhL0Q8TlNOnnbyY4O4W4lkXElyMd0bKNK0y';

// Funkcja do pobierania ras kotów
export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
};

// Funkcja do pobierania informacji o kocie na podstawie rasy
export const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0]; // Zwracamy pierwszy element, ponieważ API zwraca tablicę
  } catch (error) {
    console.error(`Error fetching cat by breed ${breedId}:`, error);
    throw error;
  }
};
