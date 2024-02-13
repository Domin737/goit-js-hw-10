// import SlimSelect from 'slimselect';
// import cssLoader from 'css-loader';
// import Notiflix from 'notiflix';
import axios from 'axios';

// Klucz API The Cat API
const API_KEY =
  'live_vYSWqZaZ9I3XINODiUUhkZMgIxgBFrhL0Q8TlNOnnbyY4O4W4lkXElyMd0bKNK0y';

// Konfiguracja domyślnych nagłówków dla axios
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = API_KEY; // Twój klucz API

// Funkcja pobierająca listę wszystkich ras kotów
async function fetchAllBreeds() {
  try {
    const response = await axios.get('/breeds');
    return response.data;
  } catch (error) {
    console.error(error);
    return null; // lub obsługa błędów
  }
}

// Funkcja pobierająca informacje o kocie na podstawie jego identyfikatora
async function fetchCatById(catId) {
  try {
    const response = await axios.get(`/images/search?breed_ids=${catId}`);
    return response.data[0]; // Zakładając, że API zwraca tablicę
  } catch (error) {
    console.error(error);
    return null; // lub obsługa błędów
  }
}

export { fetchAllBreeds, fetchCatById };
