import axios from "axios";

export const getBusinesses = async () => {
    try {
        return await axios('https://restcountries.eu/rest/v2/name/eesti');
    } catch (e) {
        console.log(e);
    }
}