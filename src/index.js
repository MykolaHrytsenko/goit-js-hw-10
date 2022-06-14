import './css/styles.css';
import { fetchCountries } from './js/fetchCountryes';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    countryInfo: document.querySelector('.country-info'),
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list')
}

function onInput(evt) {
    evt.preventDefault();

    const value = evt.target.value.trim();

    if (!value) {
        return (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = '');
    };

    fetchCountries(value)
        .then(name => {
            refs.countryList.innerHTML = '';
            refs.countryInfo.innerHTML = '';

            if (name.length === 1) {
                renderCountryInfo(name)
                return
            }

            if (name.length >= 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                return
            }

            else {
                renderCountryList(name);
            };
        }).catch(onError);

};

function onError() {
    Notiflix.Notify.failure('Oops, there is no country with that name')
}

function countryListMarkup(data) {
    return data.map(({ name, flags }) => {
        return `<li>
                    <img src='${flags.png}' alt='${name.official}' width="100" />
                    <h2 class='card-title'>${name.official}</h2>
                </li>`;
    }).join('');
};

function countryInfoMarkup(data) {
    return data.map(({ name, capital, population, flags, languages }) => {
        return `
        <div class='card' >
            <div class='flag'>
                <img src='${flags.png}' alt='${name.official}' />
            </div>
            <div class='card-body'>
                <h2 class='card-title'>Назва: ${name.official}</h2>
                <p class='card-text'>Столиця: ${capital}</p>
                <p class='card-text'>Населення: ${population}</p>
                <p class='card-text'>Мови: ${Object.values(languages)}</p>
                </ul>
            </div>
        </div>`;
    }).join('');
};

function renderCountryList(country) {
    const markup = countryListMarkup(country);
    refs.countryList.innerHTML = markup;
    return
};

function renderCountryInfo(country) {
    const markup = countryInfoMarkup(country);
    refs.countryInfo.innerHTML = markup;
    return
};

refs.searchInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));