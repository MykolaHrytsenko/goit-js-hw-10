const BASE_URL = 'https://restcountries.com/v3.1/name';
const URL_PARAM = 'name,capital,population,flags,languages';

function fetchCountries(countrieName) {
    return fetch(`${BASE_URL}/${countrieName}?fields=${URL_PARAM}`).then(
        response => {
            if (!response.ok || response.status === 404) {
                return Promise.reject(new Error());
            }
            return response.json();
        });

};

export { fetchCountries };