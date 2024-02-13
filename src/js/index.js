// Import funkcji z modułu cat-api.js
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// Główny blok kodu wykonujący się po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
  // Znajdowanie elementów interfejsu użytkownika w dokumencie
  const breedSelectElement = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const catInfo = document.querySelector('.cat-info');

  // Inicjalizacja rozwijanej listy przy użyciu SlimSelect
  const breedSelect = new SlimSelect({
    select: '.breed-select',
    placeholder: 'Wybierz rasę kota...', // Tekst zachęty
    onChange: option => {
      // Funkcja wywoływana przy zmianie wyboru
      if (option.value) {
        fetchAndDisplayCat(option.value);
      }
    },
  });

  // Funkcja pokazująca loader
  const showLoader = () => {
    loader.style.display = 'block';
    catInfo.style.display = 'none';
  };

  // Funkcja ukrywająca loader
  const hideLoader = () => {
    loader.style.display = 'none';
  };

  // Funkcja wyświetlająca komunikat o błędzie przy pomocy Notiflix
  const showError = message => {
    Notiflix.Notify.failure(message);
  };

  // Funkcja pobierająca i wyświetlająca informacje o kocie
  const fetchAndDisplayCat = async breedId => {
    showLoader();
    try {
      const cat = await fetchCatByBreed(breedId);
      displayCatInfo(cat);
      hideLoader();
    } catch (error) {
      showError(
        'Nie udało się załadować informacji o kocie. Spróbuj ponownie.'
      );
      hideLoader();
    }
  };

  // Funkcja wypełniająca interfejs użytkownika danymi o kocie
  const displayCatInfo = cat => {
    catInfo.innerHTML = `
            <h2>${cat.breeds[0].name}</h2>
            <p>${cat.breeds[0].description}</p>
            <img src="${cat.url}" alt="${cat.breeds[0].name}" style="max-width: 100%;">
        `;
    catInfo.style.display = 'block';
  };

  // Inicjalizacja aplikacji: ładowanie ras kotów i ustawienie danych w rozwijanej liście
  const initApp = async () => {
    showLoader();
    try {
      const breeds = await fetchBreeds();
      const breedOptions = breeds.map(breed => ({
        text: breed.name,
        value: breed.id,
      }));
      breedSelect.setData([
        { text: 'Wybierz rasę kota...', value: null },
        ...breedOptions,
      ]);
      hideLoader();
    } catch (error) {
      showError('Nie udało się załadować danych ras. Spróbuj ponownie.');
      hideLoader();
    }
  };

  // Uruchomienie inicjalizacji aplikacji
  initApp();
});
