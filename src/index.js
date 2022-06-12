import './css/styles.css';
// import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    countriInfo: document.querySelector('.country-info')
}


const BASE_URL = 'https://restcountries.com/v3.1/name/China';
const URL_PARAM = 'name,capital,population,flags,languages';

fetch(BASE_URL)
    .then(responce => { return responce.json(); })
    .then(renderCountrieInfo)
    .catch(error => { console.log(error); })

function countriesMarkup(data) {
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
                <p>Мови: ${Object.values(languages)}</p>
                </ul>
            </div>
        </div>`;
    }).join('');
};

function renderCountrieInfo(countrie) {
    const markup = countriesMarkup(countrie);
    refs.countriInfo.innerHTML = markup;
}