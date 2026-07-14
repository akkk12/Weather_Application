const config = window.WEATHER_APP_CONFIG || {};

export const WEATHER_API_BASE_URL = config.apiBaseUrl || 'https://api.openweathermap.org/data/2.5';

export const WEATHER_API_KEY = config.apiKey || '';

export const WEATHER_REQUEST_TIMEOUT_MS = 8000;

export const WEATHER_REQUEST_RETRIES = 1;
