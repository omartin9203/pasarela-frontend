export const apiURI = process.env.NODE_ENV === 'production' ? 'https://api.pasarela.com/' : 'http://localhost:4000/';

export const baseURL = process.env.NODE_ENV === 'production' ? 'https://pasarela.com/' : 'http://localhost:3000/';

export const api = {
  uri: apiURI,
  endpoints: {
    graphql: apiURI + 'graphql',
  },
};
