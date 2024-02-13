import SlimSelect from "slimselect";
import cssLoader from "css-loader";
import Notiflix from "notiflix";

const API_KEY = "live_vYSWqZaZ9I3XINODiUUhkZMgIxgBFrhL0Q8TlNOnnbyY4O4W4lkXElyMd0bKNK0y";

const breedSelect = new SlimSelect(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

async function fetchBreeds() {
  const response = await fetch("https://api.thecatapi.com/v1/breeds", {
    headers: {
      "x-api-key": API_KEY,
    },
  });
  const breeds = await response.json();
  breedSelect.addOptions(breeds.map((breed) => ({
    text: breed.name,
    value: breed.id,
  })));
}

async function fetchCatByBreed(breedId) {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  });
  const cat = await response.json();
  const catData = cat[0];
  catInfo.querySelector(".cat-image").src = catData.url;
  catInfo.querySelector(".cat-name").textContent = catData.name;
  catInfo.querySelector(".cat-description").textContent = catData.description;
  catInfo.querySelector(".cat-temperament").textContent = catData.temperament;
