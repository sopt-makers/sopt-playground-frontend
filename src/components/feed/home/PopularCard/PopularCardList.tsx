import { useGetPopularPost } from '@/api/endpoint/feed/getPopularPost';
import Text from '@/components/common/Text';
import PopularCard from '@/components/feed/home/PopularCard/PopularCard';
import { MB_SM_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';

const PopularCardList = () => {
  const { data, isLoading, isError } = useGetPopularPost();
  const router = useRouter();

  const handleClickPopular = (id: number) => {
    router.push(`/?feed=${id}`);
  };

  return (
    <>
      <TitleWrapper>
        <Text typography='SUIT_18_B' color={colors.white} lineHeight={28}>
          실시간 인기글 🚀
        </Text>
        <Text typography='SUIT_12_SB' color={colors.gray400} lineHeight={16}>
          이번 주 동안 가장 많은 솝트인이 봤어요!
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
        {data?.map((card, index) => (
          <PopularCard key={card.id} rank={index + 1} card={card} onClick={() => handleClickPopular(card.id)} />
        ))}
      </ContentWrapper>
    </>
  );
};

export default PopularCardList;

const TitleWrapper = styled.h1`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;

  @media ${MB_SM_MEDIA_QUERY} {
    flex-direction: column;
  }
`;

const ContentWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
