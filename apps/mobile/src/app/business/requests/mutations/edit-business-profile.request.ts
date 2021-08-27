import { EditBusinessDTO } from '@seekNseat/contracts/business';
import axios from 'axios';

export const editBusinessProfile = async (
  id: string,
  business: EditBusinessDTO,
  token: string
) => {
  try {
    return await axios.put(
      `http://localhost:3333/api/businesses/` + id,
      {
        name: business.name,
        contactPhone: business.contactPhone,
        address: business.address,
        description: business.description,
        categories: business.categories,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
