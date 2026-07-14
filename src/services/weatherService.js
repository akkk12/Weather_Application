import { getJson } from '../api/httpClient.js';
import {
  WEATHER_API_BASE_URL,
  WEATHER_API_KEY,
  WEATHER_REQUEST_RETRIES,
  WEATHER_REQUEST_TIMEOUT_MS,
} from '../constants/weather.js';

export async function getCurrentWeather({ city, country }) {
  if (!WEATHER_API_KEY) {
    throw new Error('Missing OpenWeather API key. Add it in env.js.');
  }

  const location = [city, country].filter(Boolean).join(',');
  const params = new URLSearchParams({
    q: location,
    appid: WEATHER_API_KEY,
  });

  const data = await getJson(`${WEATHER_API_BASE_URL}/weather?${params.toString()}`, {
    retries: WEATHER_REQUEST_RETRIES,
    timeoutMs: WEATHER_REQUEST_TIMEOUT_MS,
  });

  if (!data.main || !data.weather?.length) {
    throw new Error(data.message || 'Unable to fetch weather for this location.');
  }

  return data;
}
