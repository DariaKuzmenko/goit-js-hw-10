function createCountryListMarkup(data) {
  return data
    .map(({ name, flags }) => {
      return `<li class = "country-list-item">
        <img class ="country-list-img" src = '${flags.svg}' alt='${flags.alt}'>${name.official} 
        </li>
        `;
    })
    .join('');
}

function createCountryCardMarkup(data) {
  return data
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class="country-card">
            <img class="country-card-img" src= '${flags.svg}' alt='${
        flags.alt
      }'>
            <p class="country-card-name">${name.official}</p>
        </div>
            <ul class="country-information-list">
                <li  class="country-information-item"> <span class="country-information-span">Capital:</span> ${capital}</li>
                <li class="country-information-item"><span class="country-information-span">Population:</span> ${population}</li>
                <li class="country-information-item"><span class="country-information-span">Languages:</span> ${Object.values(
                  languages
                )}</li>
            </ul>`;
    })
    .join('');
}

export { createCountryListMarkup, createCountryCardMarkup };
