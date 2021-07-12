import axios from "axios";

export const getCountries = async () => {
    try {
        return await axios.get('https://restcountries.eu/rest/v2/currency/cop');
    } catch (e) {
        console.log(e);
    }
}