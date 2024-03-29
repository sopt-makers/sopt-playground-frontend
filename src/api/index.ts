import axios from 'axios';

import { API_URL } from '@/constants/env';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
});
