import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { useRecentPosts } from '@/api/endpoint/feed/getRecentPosts';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import Text from '@/components/common/Text';
import RecentCard from '@/components/feed/home/RecentArea/RecentCard';
import FeedSkeleton from '@/components/feed/list/FeedSkeleton';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const RecentArea = () => {
  const { data: me } = useGetMemberOfMe();
  const { data: recentPosts, isLoading, isError } = useRecentPosts();

  return (
    <>
      {isError && (
        <Text
          typography='SUIT_14_M'
          color={colors.gray300}
          lineHeight={16}
          style={{ textAlign: 'center', padding: '80px' }}
        >
          답변을 기다리고 있는 질문을 보여주는데 문제가 발생했어요.
        </Text>
      )}
      {isLoading ? (
        <FeedSkeleton count={1} />
      ) : (
        <Container>
          <TitleBox>
            <Title>
              <UserNameStyle>{me?.name}</UserNameStyle>님,
              <MobileLineBreak /> 새로 올라온 글을 확인해 보세요
            </Title>
          </TitleBox>

          <RecentFeedList>
            {recentPosts?.map((recentPosts) => (
              <RecentCard key={recentPosts.id} recentPosts={recentPosts} />
            ))}
          </RecentFeedList>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 16px;
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${MOBILE_MEDIA_QUERY} {
    align-items: flex-end;
  }
`;

const Title = styled(Text)`
  ${fonts.HEADING_18_B};

  word-break: keep-all;
`;

const MobileLineBreak = styled.br`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: inline;
  }
`;

const UserNameStyle = styled.span`
  color: ${colors.secondary};
`;

const RecentFeedList = styled.div`
  display: flex;
  gap: 12px;
  margin: 0 -16px -18px;
  padding: 0 16px;
  overflow-x: auto;

  ::-webkit-scrollbar-track {
    margin: 0 16px;
  }

  /* 스크롤바 전체 */
  ::-webkit-scrollbar {
    width: 12px;
    height: 18px;
  }

  ::-webkit-scrollbar-thumb {
    border: 6px solid transparent;
    border-radius: 10px;
    background-clip: padding-box;
    background-color: ${colors.gray400};
    cursor: pointer;
  }

  @supports (-webkit-touch-callout: none) {
    margin-bottom: 0;
  }
`;

export default RecentArea;
