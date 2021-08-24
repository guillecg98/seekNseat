import restDataProvider from 'ra-data-rest-client';
import { fetchUtils } from 'react-admin';

import { getToken } from './auth.provider';

const httpClient = (url, options = { headers: undefined }) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  const access_token = getToken();
  options.headers.set('Authorization', `Bearer ${access_token}`);

  return fetchUtils.fetchJson(url, options);
};

export const dataProvider = restDataProvider(
  `${process.env.NODE_API_URL || process.env.NX_API_URL}/api`,
  { users: '_id' },
  {},
  httpClient,
  'X-Total-Count'
);