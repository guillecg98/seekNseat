import axios from "axios"

export const getBusiness = async (businessId: string) => {
    try {
        return await axios.get(`http://localhost:3333/api/businesses/`+businessId)
    } catch (e) {
        console.log(e)
    }
}