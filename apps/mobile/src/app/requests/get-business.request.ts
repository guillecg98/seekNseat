import axios from "axios"

export const getBusiness = async (id: string) => {
    try {
        return await axios.get(`${process.env.RN_REMOTE_URL}/api/businesses/43f134c4-6d0d-448f-a53c-60d9362c1a1a`)
    } catch (e) {
        console.log(e)
    }
}