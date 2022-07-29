import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Authorization':
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJURVNUX09SSUdJTiIsInN1YiI6InVzZXJ8MSIsImlhdCI6MTY1Nzk2ODUyNywiZXhwIjoxOTczNTQ0NTI3fQ.KoPLNZQppl7kEZzx8LBIHBgaDJgDhqqF_A-8po6gibQ',
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});
