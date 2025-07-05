import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Link from 'next/link';

import { RecentPosts } from '@/api/endpoint/feed/getRecentPosts';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { QUESTION_CATEGORY_ID } from '@/components/feed/constants';
import FeedIcon from '@/components/feed/home/RecentArea/FeedIcon';
import VoteIcon from '@/public/icons/icon-vote.svg';

interface RecentCardProps {
  recentPosts: RecentPosts;
}

const RecentCard = ({ recentPosts }: RecentCardProps) => {
  const { id, title, content, createdAt, likeCount, commentCount, categoryName, categoryId, totalVoteCount } =
    recentPosts;
  const isQuestion = QUESTION_CATEGORY_ID === categoryId;

  return (
    <LoggingClick eventKey='feedCard' param={{ feedId: String(id), category: categoryName, referral: 'category_HOT' }}>
      <CardContainer href={`/?category=${categoryId}&feed=${id}`}>
        <CardContent>
          <TitleStyle>
            <QuestionTag>{categoryName}</QuestionTag>
            {title}
          </TitleStyle>
          <ContentStyle>{content}</ContentStyle>
        </CardContent>

        <CardFooter>
          <FlexBox>
            <CreatedDate>{createdAt}</CreatedDate>
            {isQuestion && (
              <>
                <LineStyle />
                <FlexStyle>
                  <VoteIcon />
                  <CreatedDate>{totalVoteCount ?? 0}</CreatedDate>
                </FlexStyle>
              </>
            )}
          </FlexBox>

          <FeedIconBox>
            <FeedIcon type={isQuestion ? 'thumbsUp' : 'heart'} count={likeCount} />
            <FeedIcon type='message' count={commentCount} />
          </FeedIconBox>
        </CardFooter>
      </CardContainer>
    </LoggingClick>
  );
};

export default RecentCard;

const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 12px;
  border-radius: 12px;
  background-color: ${colors.gray900};
  cursor: pointer;
  padding: 16px;
  width: 272px;
  height: 158px;

  &:hover {
    background-color: ${colors.gray800};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 240px;
  height: 96px;
`;

const TitleStyle = styled(Text)`
  ${fonts.TITLE_16_SB}

  height: 48px;

  /* stylelint-disable */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentStyle = styled(Text)`
  ${fonts.BODY_14_L}
  height: 48px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.gray400};
`;

const FeedIconBox = styled.div`
  display: flex;
  gap: 16px;
`;

const CreatedDate = styled(Text)`
  color: ${colors.gray400};
  ${fonts.LABEL_14_SB}
`;

const QuestionTag = styled.span`
  display: inline-flex;
  width: fit-content;
  height: 20px;
  border-radius: 4px;
  background-color: ${colors.orangeAlpha200};
  color: ${colors.secondary};
  ${fonts.LABEL_11_SB}
  padding: 3px 6px;
  margin-right: 6px;
  transform: translateY(-1.5px);
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LineStyle = styled.div`
  width: 1px;
  height: 12px;
  background-color: ${colors.gray600};
`;

const FlexStyle = styled.div`
  display: flex;
  gap: 4px;
`;
