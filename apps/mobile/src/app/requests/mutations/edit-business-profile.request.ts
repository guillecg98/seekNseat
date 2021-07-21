import {
    EditBusinessDTO
} from "@seekNseat/contracts";
import axios from "axios";

export const editBusinessProfile = async (id: string, business: EditBusinessDTO) => {
    try {
        return await axios.put(`http://localhost:3333/api/businesses/`+id, {
            name: business.name,
            contactPhone: business.contactPhone,
            address: business.address,
            description: business.description,
        })
    } catch ( err ) {
        console.log(err)
    }
}