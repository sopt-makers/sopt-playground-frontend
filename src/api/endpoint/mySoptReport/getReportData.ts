import { createEndpoint } from '@/api/typedAxios';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const ServiceCategorySchema = z.object({
  category: z.string(),
  count: z.number(),
});

const MeetingSpotSchema = z.object({
  spot: z.string(),
  count: z.number(),
  ratio: z.number(),
});

const SignUpPartSchema = z.object({
  part: z.string(),
  count: z.number(),
});

const UserMbtiSchema = z.object({
  type: z.string(),
  count: z.number(),
});

const WordChainGameSchema = z.object({
  wordList: z.array(z.string()),
  playCount: z.number(),
});

const CommunityReactionSchema = z.object({
  likeCount: z.number(),
  commentCount: z.number(),
});

const CrewPopularGroupSchema = z.object({
  id: z.number(),
  imageUrl: z.string().url(),
  groupName: z.string(),
  feedCount: z.number(),
});

const CoffeeChatHistorySchema = z.object({
  titleList: z.array(z.string()),
  sendCount: z.number(),
  openCount: z.number(),
});

const MySoptReportDataSchema = z.object({
  TotalServiceCount: z.number(),
  ServiceCategoryRankTable: z.array(ServiceCategorySchema),
  PopularMeetingSpotRankTable: z.array(MeetingSpotSchema),
  NewSignUpUserCount: z.number(),
  NewSignUpPartUserCountTable: z.array(SignUpPartSchema),
});

const MyPlaygroundReportDataSchema = z.object({
  TotalVisitCount: z.number(),
  PopularVisitDays: z.string(),
  UserMbtiRankTable: z.array(UserMbtiSchema),
  WordChainGameInfoTable: WordChainGameSchema,
  ComminityReactionInfoTable: CommunityReactionSchema,
  CrewPopularGroupInfoTable: CrewPopularGroupSchema,
  CrewTotalGroupUserCount: z.number(),
  CoffeeChatHistoryInfoTable: CoffeeChatHistorySchema,
  CoffeeChatTotalVisitCount: z.number(),
});

const getSoptReportData = createEndpoint({
  request: () => ({
    method: 'GET',
    url: `api/v1/report/stats?category=SOPT`,
  }),
  serverResponseScheme: MySoptReportDataSchema,
});

const getPlaygroundReportData = createEndpoint({
  request: () => ({
    method: 'GET',
    url: `api/v1/report/stats?category=PLAYGROUND`,
  }),
  serverResponseScheme: MyPlaygroundReportDataSchema,
});

export const useGetReportData = () => {
  const { data: soptReportData, isPending: isSoptDataPending } = useQuery({
    queryKey: getSoptReportData.cacheKey(),
    queryFn: () => getSoptReportData.request(),
  });

  const { data: playgroundReportData, isPending: isPlaygroundDataPending } = useQuery({
    queryKey: getPlaygroundReportData.cacheKey(),
    queryFn: () => getPlaygroundReportData.request(),
  });

  const isPending = isSoptDataPending || isPlaygroundDataPending;

  return { soptReportData, playgroundReportData, isPending };
};
