import axios from 'axios';

import { tokenStorage } from '@/components/auth/util/accessToken';

const token = tokenStorage.get() ?? '';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Accept': '*/*',
    'Authorization': token,
    'Content-Type': 'application/json',
  },
});
