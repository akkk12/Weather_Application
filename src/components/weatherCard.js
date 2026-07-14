import { kelvinToCelsius } from '../utils/temperature.js';

export function renderWeatherCard(elements, weather) {
  elements.name.textContent = weather.name;
  elements.description.textContent = `Description : ${weather.weather[0].description}`;
  elements.temperature.textContent = `Temperature : ${kelvinToCelsius(weather.main.temp)}C`;
}

export function renderWeatherError(elements, message) {
  elements.name.textContent = '';
  elements.description.textContent = message;
  elements.temperature.textContent = '';
}

export function clearWeatherCard(elements) {
  elements.name.textContent = '';
  elements.description.textContent = '';
  elements.temperature.textContent = '';
}
