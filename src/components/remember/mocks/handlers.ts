import { API_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const REVIEW_LIST = [
  { id: 1, content: '솝트해서 좋았다!' },
  {
    id: 2,
    content:
      '솝트에서 이루고 싶은 것, \n현재의 다짐 등 34기 활동을 시작하는 \n스스로에게 하고 싶은 말을 자유롭게 \n적어주세요! 솝트에서 이루고 싶은 것, 현재의 다짐 등 34기 활동을 시작하는 스스로에게 하고 싶은 말을 자유롭게 적어주세요! 솝트에서 이루고 싶은 것, 현재의 다짐 등 34기 활동을 시',
  },
  {
    id: 3,
    content:
      '솝트에서 이루고 싶은 것, \n현재의 다짐 등 34기 활동을 시작하는 \n스스로에게 하고 싶은 말을 자유롭게 \n적어주세요! 솝트에서 이루고 싶은 것, 현재의',
  },
  {
    id: 4,
    content:
      '솝트에서 이루고 싶은 것, \n현재의 다짐 등 34기 활동을 시작하는 \n스스로에게 하고 싶은 말을 자유롭게 \n적어주세요! 솝트에서 이루고 싶은 것, \n현재의 다짐 등 34기 활동을 시작하는 \n스스로에게 하고 싶은 말을 자유롭게 \n적어주세요! 솝트에서 이루고 싶은 것, 현재의 다짐 등 34기 활동을 시작하는 스스로에게 하고 싶은 말을 자유롭게 적어주세요! 솝트에서 이루고 싶은 것, 현재의 다짐 등 34기 활동을 시',
  },
  {
    id: 5,
    content:
      '솝트에서 이루고 싶은 것, \n현재의 다짐 등 34기 활동을 시작하는 \n스스로에게 하고 싶은 말을 자유롭게 \n적어주세요! 솝트에서 이루고 싶은 것, 현재의',
  },
  {
    id: 6,
    content:
      '솝트에서 이루고 싶은 것, \n현재의 다짐 등 34기 활동을 시작하는 \n스스로에게 하고 싶은 말을 자유롭게 \n적어주세요! 솝트에서 이루고 싶은 것, 현재의',
  },
  { id: 7, content: '솝트 굿' },
  {
    id: 8,
    content:
      '솝트에서 이루고 싶은 것, \n현재의 다짐 등 34기 활동을 시작하는 \n스스로에게 하고 싶은 말을 자유롭게 \n적어주세요! 솝트에서 이루고 싶은 것, 현재의',
  },
  { id: 9, content: '솝트해서 좋았다!\n솝트해서 좋았다!\n솝트해서 좋았다!' },
  { id: 10, content: '재밌었다 ㅋ' },
  {
    id: 11,
    content:
      '솝트에서 이루고 싶은 것, \n현재의 다짐 등 34기 활동을 시작하는 \n스스로에게 하고 싶은 말을 자유롭게 \n적어주세요! 솝트에서 이루고 싶은 것, 현재의',
  },
  {
    id: 12,
    content:
      '솝트에서 이루고 싶은 것, \n현재의 다짐 등 34기 활동을 시작하는 \n스스로에게 하고 싶은 말을 자유롭게 \n적어주세요! 솝트에서 이루고 싶은 것, 현재의',
  },
  { id: 13, content: '솝트해서 좋았다!\n솝트해서 좋았다!\n솝트해서 좋았다!' },
];

export const handlers = [
  http.get(`${API_URL}/review`, async () => {
    return HttpResponse.json(REVIEW_LIST);
  }),
  http.post(`${API_URL}/review/upload`, async ({ request }) => {
    const requestBody = await request.json();
    console.log(requestBody);
    return HttpResponse.text(JSON.stringify('ok'), {});
  }),
];
