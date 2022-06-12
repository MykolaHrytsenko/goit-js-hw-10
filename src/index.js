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

refs.searchInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    evt.preventDefault();

    const value = refs.searchInput.value.trim();

    if (evt === '') {
        return (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = '');
    }

    fetchCountries(value)
        .then(name => {
            if (name.length === 1) {
                refs.countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(name))
                return
            }

            else if (name.length > 10) {
                Notiflix.Notify.info('Oops, there is no country with that name')
            }

            else {
                refs.countryInfo.insertAdjacentHTML('beforeend', renderCountryList(name))
            };
        }).catch(Notiflix.Notify.failure('Oops, there is no country with that name'));
};

function countryListMarkup(data) {
    return data.map(({ name, flags }) => {
        return `<li>
                    <img src='${flags.png}' alt='${name.official}' />
                    <h2 class='card-title'>Назва: ${name.official}</h2>
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
    refs.countryInfo.innerHTML = markup;
};

function renderCountryInfo(country) {
    const markup = countryInfoMarkup(country);
    refs.countryInfo.innerHTML = markup;
};



