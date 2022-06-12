const BASE_URL = 'https://restcountries.com/v3.1/name/China';
const URL_PARAM = 'name,capital,population,flags,languages';

fetch(BASE_URL)
    .then(responce => { return responce.json(); })
    .then(name => {
        console.log(name);
        const markup = countriesMarkup(name);
        console.log(markup);
    })
    .catch(error => { console.log(error); })

export { fetchCountries };