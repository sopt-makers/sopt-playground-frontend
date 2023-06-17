import { rest } from 'msw';

import { API_URL } from '@/constants/env';
import { fixtures, Winner } from '@/mocks/wordchain/fixtures';

export const wordchain = [
  rest.get(`${API_URL}/winners`, (req, res, ctx) => {
    return res(ctx.json<Winner[]>(fixtures));
  }),
];
