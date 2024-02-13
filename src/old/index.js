import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const showLoader = () => {
  loader.style.display = 'block';
  error.style.display = 'none';
  catInfo.style.display = 'none';
};

const hideLoader = () => {
  loader.style.display = 'none';
};

const showError = message => {
  error.textContent = message;
  error.style.display = 'block';
};

// Funkcja do wyświetlenia informacji o kocie
const displayCatInfo = cat => {
  catInfo.innerHTML = `
    <h2>${cat.breeds[0].name}</h2>
    <p>${cat.breeds[0].description}</p>
    <img src="${cat.url}" alt="${cat.breeds[0].name}" style="max-width: 100%;">
  `;
  catInfo.style.display = 'block';
};

// Funkcja do inicjowania aplikacji
const initApp = async () => {
  showLoader();
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    hideLoader();
  } catch {
    showError('Failed to load breed data. Please try reloading the page.');
  }
};

// Funkcja do obsługi zmiany rasy w selekcie
const handleBreedChange = async () => {
  const breedId = breedSelect.value;
  if (!breedId) return;
  showLoader();
  try {
    const cat = await fetchCatByBreed(breedId);
    displayCatInfo(cat);
    hideLoader();
  } catch {
    showError('Failed to load cat data. Please try again.');
  }
};

breedSelect.addEventListener('change', handleBreedChange);

initApp();
