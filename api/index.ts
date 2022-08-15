import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROJECT_API_URL,
  headers: {
    'Authorization':
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJzdWIiOiJ1c2VyfDEiLCJpYXQiOjE2NjA1NTM3NDcsImV4cCI6MTk3NTkxMzc0N30.YaGjXIiikKmRwCJPe4-74WMdbCvXX8EubNEX1Nr0rqA',
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});
