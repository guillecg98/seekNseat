import axios from "axios";

export const getBusinesses = async () => {
    try {
        // return await axios.get(`${process.env.RN_REMOTE_URL}/api/businesses`);
        return await axios.get('http://localhost:3333/api/businesses');
    } catch (e) {
        console.log(e);
    }
}