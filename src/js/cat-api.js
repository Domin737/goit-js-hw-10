// Import biblioteki axios do wykonywania zapytań HTTP
import axios from 'axios';

// Ustawienie domyślnego nagłówka dla wszystkich zapytań HTTP wysyłanych za pomocą axios
axios.defaults.headers.common['x-api-key'] =
  'live_vYSWqZaZ9I3XINODiUUhkZMgIxgBFrhL0Q8TlNOnnbyY4O4W4lkXElyMd0bKNK0y';

// Funkcja asynchroniczna do pobierania listy ras kotów z The Cat API
export const fetchBreeds = async () => {
  try {
    // Wykonanie zapytania GET do The Cat API w celu pobrania listy ras kotów
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    // Zwrócenie danych odpowiedzi, które zawierają listę ras kotów
    return response.data;
  } catch (error) {
    // Logowanie błędu w konsoli w przypadku niepowodzenia zapytania
    console.error('Error fetching breeds:', error);
    // Przekazanie błędu wyżej, aby umożliwić obsługę błędu w kodzie wywołującym funkcję
    throw error;
  }
};

// Funkcja asynchroniczna do pobierania informacji o konkretnym kocie na podstawie jego rasy (breedId)
export const fetchCatByBreed = async breedId => {
  try {
    // Wykonanie zapytania GET do The Cat API z użyciem identyfikatora rasy kota jako parametru
    // w celu pobrania informacji o konkretnej rasie wraz z obrazem
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    // Zwrócenie pierwszego elementu z odpowiedzi, który zawiera informacje i obraz wybranego kota
    return response.data[0];
  } catch (error) {
    // Logowanie błędu w konsoli w przypadku niepowodzenia zapytania
    console.error(`Error fetching cat by breed ${breedId}:`, error);
    // Przekazanie błędu wyżej, aby umożliwić obsługę błędu w kodzie wywołującym funkcję
    throw error;
  }
};
