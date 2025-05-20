import { useGetPopularPost } from '@/api/endpoint/feed/getPopularPost';
import Text from '@/components/common/Text';
import PopularCard from '@/components/feed/home/PopularCard/PopularCard';
import { MB_SM_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

const PopularCardList = () => {
  const { data, isLoading, isError } = useGetPopularPost();

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
        {data?.map((card, index) => (
          <PopularCard
            key={card.id}
            rank={index + 1}
            category={card.category}
            title={card.title}
            profileImage={card.member.profileImage}
            name={card.member.name}
            hits={card.hits}
          />
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
