['REACT_APP_API_URL', 'REACT_APP_CURRENT_HOST'].forEach((value) => {
  if (!process.env[value]) {
    throw new Error(`Missing env variable ${value}`);
  }
});

const API_URL = process.env.REACT_APP_API_URL;
const CURRENT_HOST = process.env.REACT_APP_CURRENT_HOST;

export { API_URL, CURRENT_HOST };
