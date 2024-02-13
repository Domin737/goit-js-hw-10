// Import bibliotek
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

// Selektory elementów HTML
const breedSelect = new SlimSelect('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Import funkcji z pliku cat-api.js
import { fetchAllBreeds, fetchRandomCat, fetchCatById } from './cat-api.js';

// Pobranie listy ras kotów po załadowaniu strony
async function fetchBreeds() {
  const breeds = await fetchAllBreeds();
  breedSelect.addOptions(
    breeds.map(breed => ({
      text: breed.name,
      value: breed.id,
    }))
  );
}

fetchBreeds();

// Obsługa zdarzenia wyboru rasy
breedSelect.on('change', async selected => {
  // Pokazanie animacji ładowania
  loader.classList.add('active');
  // Ukrycie informacji o kocie
  catInfo.classList.remove('active');

  // Pobranie szczegółowych informacji o kocie
  const catData = await fetchCatById(selected.value);

  // Ukrycie animacji ładowania
  loader.classList.remove('active');

  // Wyświetlenie informacji o kocie
  if (catData) {
    catInfo.querySelector('.cat-image').src = catData.url;
    catInfo.querySelector('.cat-name').textContent = catData.name;
    catInfo.querySelector('.cat-description').textContent = catData.description;
    catInfo.querySelector('.cat-temperament').textContent = catData.temperament;
    catInfo.classList.add('active');
  } else {
    // Wyświetlenie komunikatu o błędzie
    error.classList.add('active');
  }
});
