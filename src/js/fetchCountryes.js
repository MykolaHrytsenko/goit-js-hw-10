const URL = 'https://restcountries.com/v3.1/name';
const URL_PARAM = 'name,capital,population,flags,languages';

function fetchCountries(countrieName) {
    return fetch(`${URL}/${countrieName}?fields=${URL_PARAM}`).then(
        response => {
            return response.json();
        }).catch(error => console.log(error));

};

export { fetchCountries };