import axios from 'axios';

import { ADMIN_API_KEY, ADMIN_API_URL, API_URL } from '@/constants/env';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
});

// 어드민 API 연결을 위한 axiosInstance
export const axiosAdminInstance = axios.create({
  baseURL: ADMIN_API_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'api-key': ADMIN_API_KEY,
  },
});
