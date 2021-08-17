import axios from 'axios';

export const googleLogin = (token: string) => {
  return axios
    .post('http://localhost:3333/api/google-login', {
      token: token,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};
