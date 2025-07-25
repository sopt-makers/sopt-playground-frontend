import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { useGetPopularPost } from '@/api/endpoint/feed/getPopularPost';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { categoryIdNameMap } from '@/components/feed/common/utils';
import PopularCard from '@/components/feed/home/PopularArea/PopularCard';
import { MB_SM_MEDIA_QUERY } from '@/styles/mediaQuery';

const PopularArea = () => {
  const { data, isLoading, isError } = useGetPopularPost();
  const router = useRouter();

  const handleClickPopular = (category: string, feedId: number) => {
    const categoryId = Object.entries(categoryIdNameMap).find(([_, name]) => name === category)?.[0];

    if (!categoryId) {
      router.push(`/?feed=${feedId}`);
    }
    router.push(`/?category=${categoryId}&feed=${feedId}`);
  };

  const { data: categoryData } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  const getFullCategoryNameFromId = (id: number): string | undefined => {
    if (categoryData) {
      for (const parent of categoryData) {
        if (parent.id === id) return parent.name;

        const child = parent.children.find((c) => c.id === id);
        if (child) {
          return `${parent.name}_${child.name}`;
        }
      }
    }
  };

  return (
    <Container>
      <TitleWrapper>
        <Text typography='SUIT_18_B' color={colors.white} lineHeight={28}>
          실시간 인기글 🚀
        </Text>
        <Text typography='SUIT_12_SB' color={colors.gray400} lineHeight={16}>
          이번 달에 가장 많은 솝트인이 봤어요!
        </Text>
      </TitleWrapper>
      <ContentWrapper>
        {isError && (
          <Text
            typography='SUIT_14_M'
            color={colors.gray300}
            lineHeight={16}
            style={{ textAlign: 'center', padding: '80px' }}
          >
            인기글을 보여주는데 문제가 발생했어요.
          </Text>
        )}
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <PopularCard key={`skeleton-${index}`} rank={index + 1} isLoading />
          ))}
        {data?.map((card, index) => {
          const category = card.id !== null ? getFullCategoryNameFromId(card.id) ?? card.category : card.category;
          return (
            <LoggingClick
              eventKey='feedCard'
              param={{ feedId: String(card.id), category, referral: 'category_HOT' }}
              key={card.id ?? index}
            >
              <PopularCard
                key={card.id}
                rank={index + 1}
                card={card}
                onClick={() => handleClickPopular(card.category, card.id)}
              />
            </LoggingClick>
          );
        })}
      </ContentWrapper>
    </Container>
  );
};

export default PopularArea;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  width: 100%;
`;

const TitleWrapper = styled.h1`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;

  @media ${MB_SM_MEDIA_QUERY} {
    flex-direction: column;
    align-items: start;
  }
`;

const ContentWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
