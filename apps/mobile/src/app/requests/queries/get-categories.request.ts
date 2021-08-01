import axios from 'axios';

export const getCategories = async () => {
  try {
    return await axios.get(`http://localhost:3333/api/categories
        `);
  } catch (e) {
    console.error(e);
  }
};
