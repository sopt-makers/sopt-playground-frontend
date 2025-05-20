import Text from '@/components/common/Text';
import PopularCard from '@/components/feed/home/PopularCard/PopularCard';
import { MB_SM_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

const cardList = [
  {
    id: 358,
    category: '솝티클',
    title:
      'feat: sp1관련 앰플리튜드 로깅 추가 by seong-hui · Pull Request #1830 · sopt-makers/sopt-playground-frontend',
    member: {
      id: 225,
      name: '문성희',
      profileImage: null,
    },
    hits: 244,
  },
  {
    id: 363,
    category: '자유',
    title: 'asdf',
    member: {
      id: 221,
      name: '임주민',
      profileImage:
        'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//dev/image/project/3468b344-631c-4492-b342-33538acac173-131675243_1285425091826888_4352205340244382184_n.jpg',
    },
    hits: 241,
  },
  {
    id: 378,
    category: '질문',
    title: 'asdf',
    member: {
      id: 225,
      name: '문성희',
      profileImage: null,
    },
    hits: 236,
  },
];

const PopularCardList = () => {
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
        {cardList.map((card, index) => (
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
