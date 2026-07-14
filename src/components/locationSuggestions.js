import { LOCATION_SUGGESTIONS } from '../constants/locations.js';

function renderOptions(datalist, values) {
  datalist.replaceChildren(
    ...values.map((value) => {
      const option = document.createElement('option');
      option.value = value;
      return option;
    }),
  );
}

function findCountry(value) {
  const normalizedValue = value.trim().toLowerCase();

  return LOCATION_SUGGESTIONS.find(
    ({ country }) => country.toLowerCase() === normalizedValue,
  );
}

export function initializeLocationSuggestions(elements) {
  renderOptions(
    elements.countrySuggestions,
    LOCATION_SUGGESTIONS.map(({ country }) => country),
  );

  const renderCitySuggestions = () => {
    const selectedCountry = findCountry(elements.countryInput.value);
    const cities = selectedCountry
      ? selectedCountry.cities
      : LOCATION_SUGGESTIONS.flatMap(({ cities: countryCities }) => countryCities);

    renderOptions(elements.citySuggestions, [...new Set(cities)].sort());
  };

  elements.countryInput.addEventListener('input', renderCitySuggestions);
  renderCitySuggestions();
}
