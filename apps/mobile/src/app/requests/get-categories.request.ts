import axios from "axios";

export const getCategories = async () => {
    try {
        return await axios.get(`${process.env.RN_REMOTE_URL}/api/categories`);
    } catch (e) {
        console.error(e);
    }
}