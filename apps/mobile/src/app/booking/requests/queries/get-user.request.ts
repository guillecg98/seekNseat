import axios from 'axios';

export const getUser = async (userId: string, token: string) => {
  try {
    return await axios.get(`http://localhost:3333/api/users/` + userId, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error(err);
  }
};
