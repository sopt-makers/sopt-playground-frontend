import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconAlertTriangle, IconShare } from '@sopt-makers/icons';
import { Flex } from '@toss/emotion-utils';

import { useToggleCrewPostLikeMutation } from '@/api/crew/toggleCrewPostLike';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import FeedLike from '@/components/feed/common/FeedLike';
import { useReportFeed } from '@/components/feed/common/hooks/useReportFeed';
import { getMemberInfo, getRelativeTime } from '@/components/feed/common/utils';
import CrewMeetingLinkRow from '@/components/feed/list/CrewFeedList/CrewMeetingLinkRow';
import FeedCard from '@/components/feed/list/FeedCard';
import { crewLink } from '@/constants/links';

interface CrewFeedListItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any;
  orgId: number;
  onFeedCardClick: () => void;
  onFeedContentClick: () => void;
}

const CrewFeedListItem = ({ post, orgId, onFeedCardClick, onFeedContentClick }: CrewFeedListItemProps) => {
  const postId = post.id;
  const { mutate: toggleCrewPostLike } = useToggleCrewPostLikeMutation(orgId, postId);

  const { handleReport } = useReportFeed();

  const handleFeedLike = () => {
    toggleCrewPostLike();
  };

  const handleCopyLink = () => {
    copy(`${window.location.origin}${crewLink.feedDetail(postId)}`, {
      successMessage: '링크가 복사되었어요.',
    });
  };

  if (!post) {
    return null;
  }

  const createdAt = getRelativeTime(post.createdDate);
  const memberInfo = getMemberInfo({
    categoryId: 24,
    categoryName: '모임',
    member: {
      activity: post.user.partInfo,
      // TODO(@j-nary): 플그 careers 데이터 연결
      careers: null,
    },
  });

  return (
    <FeedCard
      onClick={onFeedCardClick}
      name={post.user.name}
      title={post.title}
      content={post.contents}
      profileImage={post.user.profileImage}
      createdAt={createdAt}
      commentLength={post.commentCount}
      hits={post.viewCount}
      isShowInfo={false}
      memberId={post.user.id}
      thumbnailUrl={post?.images[0]}
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
          {createdAt}
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
                handleCopyLink();
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
        <CrewMeetingLinkRow category={post.category} title={post.title} meetingId={post.meetingId} />
      </MeetingLinkRowWrapper>
    </FeedCard>
  );
};

export default CrewFeedListItem;

const MeetingLinkRowWrapper = styled.div`
  padding-right: 20px;
  width: 100%;
`;
function copy(arg0: string, arg1: { successMessage: string }) {
  throw new Error('Function not implemented.');
}
