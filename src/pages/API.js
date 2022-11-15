import axios from 'axios';
import { getUser } from './storage';

export async function getConfig(formData = false) {
  const user = await getUser();
  return {
    headers: {
      'Content-Type': formData ? 'multipart/form-data' : 'application/json',
      Authorization: `Token ${user.token}`,
    },
  };
}

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;