import axios from "axios";

export const getBusinesses = async () => {
    try {
        return await axios.get(`${process.env.RN_REMOTE_URL}/api/businesses`);
    } catch (e) {
        console.log(e);
    }
}