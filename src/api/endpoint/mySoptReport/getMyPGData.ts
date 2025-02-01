import { createEndpoint } from '@/api/typedAxios';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const serverResponseScheme = z.object({
  myType: z.string(),
  totalVisitCount: z.number(),
  myCommunityStats: z.object({
    likeCount: z.number(),
  }),
  myProfileStats: z.object({
    viewCount: z.number(),
  }),
  myCrewStats: z.object({
    topFastestJoinedGroupList: z.array(z.string()),
  }),
  myWordChainGameStats: z.object({
    playCount: z.number(),
    winCount: z.number(),
    wordList: z.array(z.string()),
  }),
});

const getMyPgData = createEndpoint({
  request: () => ({
    method: 'GET',
    url: `api/v1/report/stats/me`,
  }),
  serverResponseScheme,
});

export const useGetPGData = () => {
  const { data: myPgData, isPending: isMyPGDataPending } = useQuery({
    queryKey: getMyPgData.cacheKey(),
    queryFn: () => getMyPgData.request(),
  });

  return { myPgData, isMyPGDataPending };
};
