import axios from 'axios';
import { z } from 'zod';

// FIXME: 1/28 데모데이 due date가 얼마 남지 않은 이슈로 크루 api와 바로 통신했습니다.
// 플그 서버와 통신하도록 수정 + zod, createEndPoint 사용하도록 변경 필요합니다. 담당자: FE 서지수, BE 이승헌
// 무한스크롤 적용해야합니다.

const MeetingSchema = z.object({
  id: z.number(),
  isMeetingLeader: z.boolean(),
  title: z.string(),
  imageUrl: z.string(),
  category: z.string(),
  isActiveMeeting: z.boolean(),
  mstartDate: z.string(),
  mendDate: z.string(),
});

const MetaSchema = z.object({
  page: z.number(),
  take: z.number(),
  itemCount: z.number(),
  pageCount: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
});

export const CREW_ORIGIN =
  process.env.NODE_ENV === 'development' ? `https://crew.api.dev.sopt.org` : `https://crew.api.prod.sopt.org`;

// export const getMeetings = createEndpoint({
//   request: (orgUserId: number) => ({
//     method: 'GET',
//     url: `${CREW_ORIGIN}/meeting/v2/org-user?orgUserId=${orgUserId}`,
// }),
//   serverResponseScheme: z.object({
//     meetings: z.array(MeetingSchema),
//     meta: MetaSchema,
//   }),
// });

// export const getMeetings = async (orgUserId: number) => {
//     await axios.request({
//       method: 'GET',
//       baseURL: `${CREW_ORIGIN}/meeting/v2/org-user?orgUserId=${orgUserId}`,
//     });
//   };

export async function getMeetings(orgUserId: string) {
  const data = await axios.get(`https://crew.api.dev.sopt.org/meeting/v2/org-user?orgUserId=${orgUserId}`);

  return data.data?.meetings;
}
