import { setupWorker } from 'msw';

import { wordchain } from '@/mocks/wordchain/handlers';

export const handlers = [...wordchain];
export const worker = setupWorker(...handlers);
