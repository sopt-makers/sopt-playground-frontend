import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconAlertTriangle, IconShare } from '@sopt-makers/icons';
import { Flex } from '@toss/emotion-utils';

import { useGetCrewPostQuery } from '@/api/crew/getCrewPost';
import { useToggleCrewPostLikeMutation } from '@/api/crew/toggleCrewPostLike';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import FeedLike from '@/components/feed/common/FeedLike';
import { useReportFeed } from '@/components/feed/common/hooks/useReportFeed';
import { useShareFeed } from '@/components/feed/common/hooks/useShareFeed';
import { getRelativeTime } from '@/components/feed/common/utils';
import CrewMeetingLinkRow from '@/components/feed/list/CrewFeedList/CrewMeetingLinkRow';
import FeedCard from '@/components/feed/list/FeedCard';

interface CrewFeedListItemProps {
  postId: number;
  onFeedCardClick: () => void;
  onFeedContentClick: () => void;
  memberInfo: string;
}

const CrewFeedListItem = ({ postId, onFeedCardClick, onFeedContentClick, memberInfo }: CrewFeedListItemProps) => {
  const { data: post } = useGetCrewPostQuery(postId);
  const { mutate: toggleCrewPostLike } = useToggleCrewPostLikeMutation(postId);

  const { handleShareFeed } = useShareFeed();
  const { handleReport } = useReportFeed();

  const handleFeedLike = () => {
    toggleCrewPostLike();
  };

  if (!post) {
    return null;
  }

  return (
    <FeedCard
      onClick={onFeedCardClick}
      name={post.user.name}
      title={post.title}
      content={post.contents}
      profileImage={post.user.profileImage}
      createdAt={getRelativeTime(post.createdDate)}
      commentLength={post.commentCount}
      hits={post.viewCount}
      isShowInfo={false}
      memberId={post.user.id}
      thumbnailUrl={post.meeting.imageURL[0].url}
      sopticleUrl={''}
      info={
        <>
          <Text typography='SUIT_14_R' lineHeight={20} color={colors.gray400} style={{ margin: '0 2px' }}>
            ∙
          </Text>
          {memberInfo}
          <Text typography='SUIT_14_R' lineHeight={20} color={colors.gray400} style={{ margin: '0 2px' }}>
            ∙
          </Text>
          {getRelativeTime(post.createdDate)}
        </>
      }
      rightIcon={
        <FeedDropdown
          trigger={
            <Flex as='button'>
              <FeedCard.Icon />
            </Flex>
          }
        >
          <LoggingClick eventKey='feedShareButton' param={{ feedId: String(post.id), referral: 'list' }}>
            <FeedDropdown.Item
              onClick={(e) => {
                e.stopPropagation();
                handleShareFeed(`${post.id}`);
              }}
            >
              <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                <IconShare css={{ width: '16px', height: '16px' }} />
                공유
              </Flex>
            </FeedDropdown.Item>
          </LoggingClick>
          <FeedDropdown.Item
            onClick={(e) => {
              e.stopPropagation();
              handleReport({ postId: `${post.id}` });
            }}
          >
            <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
              <IconAlertTriangle css={{ width: '16px', height: '16px' }} />
              신고
            </Flex>
          </FeedDropdown.Item>
        </FeedDropdown>
      }
      like={
        <LoggingClick
          eventKey={post.isLiked ? 'feedUnlike' : 'feedLike'}
          param={{ feedId: String(post.id), category: post.categoryName }}
        >
          <FeedLike isLiked={post.isLiked} likes={post.likeCount} onClick={handleFeedLike} type={'heart'} />
        </LoggingClick>
      }
      onClickContent={onFeedContentClick}
      onCommentClick={onFeedContentClick}
    >
      {post.images.length !== 0 && (
        <FeedCard.Image>
          {post.images.map((image: string, index: number) => (
            <FeedCard.ImageItem key={`${image}-${index}`} src={image} height={240} />
          ))}
        </FeedCard.Image>
      )}
      <MeetingLinkRowWrapper>
        <CrewMeetingLinkRow category={post.meeting.category} title={post.meeting.title} meetingId={post.meeting.id} />
      </MeetingLinkRowWrapper>
    </FeedCard>
  );
};

export default CrewFeedListItem;

const MeetingLinkRowWrapper = styled.div`
  padding-right: 20px;
  width: 100%;
`;
