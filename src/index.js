import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

import getRefs from './js/getRefs';
import { fetchCountries } from './js/fetchCountries';
import {
  createCountryListMarkup,
  createCountryCardMarkup,
} from './js/createMarkup';
const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.countryFormEl.addEventListener(
  'input',
  debounce(handleCountryFormInput, DEBOUNCE_DELAY)
);

function handleCountryFormInput(event) {
  event.preventDefault();
  const searchCountry = event.target.value.trim();
  clearCountryFormEl();

  if (searchCountry === '') {
    clearCountryFormEl();
    return;
  }

  fetchCountries(searchCountry)
    .then(data => {
      if (data.length === 1) {
        refs.countryInfo.insertAdjacentHTML(
          'beforeend',
          createCountryCardMarkup(data)
        );
      }

      if (data.length >= 2 && data.length < 10)
        refs.countryList.insertAdjacentHTML(
          'beforeend',
          createCountryListMarkup(data)
        );
      if (data.length > 10) {
        Notify.failure(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function clearCountryFormEl() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
