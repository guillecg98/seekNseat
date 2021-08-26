import axios from 'axios';

export const createBusiness = async (
  id: string,
  ownerId: string,
  name: string,
  contactPhone: string,
  categories: string[],
  token: string
) => {
  try {
    return await axios.post(
      'http://localhost:3333/api/businesses',
      {
        _id: id,
        ownerId: ownerId,
        name: name,
        contactPhone: contactPhone,
        categories: categories,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.error(err);
  }
};
