import { initializeLocationSuggestions } from './components/locationSuggestions.js';
import { renderWeatherCard, renderWeatherError } from './components/weatherCard.js';
import { getCurrentWeather } from './services/weatherService.js';

const elements = {
  form: document.querySelector('[data-weather-form]'),
  cityInput: document.querySelector('[data-city-input]'),
  citySuggestions: document.querySelector('[data-city-suggestions]'),
  countryInput: document.querySelector('[data-country-input]'),
  countrySuggestions: document.querySelector('[data-country-suggestions]'),
  name: document.querySelector('[data-weather-name]'),
  temperature: document.querySelector('[data-weather-temperature]'),
  description: document.querySelector('[data-weather-description]'),
  submitButton: document.querySelector('[data-submit-button]'),
};

initializeLocationSuggestions(elements);

function setLoading(isLoading) {
  elements.submitButton.disabled = isLoading;
  elements.submitButton.value = isLoading ? 'Loading...' : 'Get weather';
}

elements.form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const city = elements.cityInput.value.trim();
  const country = elements.countryInput.value.trim();

  if (!city) {
    renderWeatherError(elements, 'Please enter a city name.');
    return;
  }

  setLoading(true);

  try {
    const weather = await getCurrentWeather({ city, country });
    renderWeatherCard(elements, weather);
    elements.cityInput.value = '';
    elements.countryInput.value = '';
  } catch (error) {
    renderWeatherError(elements, `Error : ${error.message}`);
  } finally {
    setLoading(false);
  }
});
