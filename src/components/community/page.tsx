import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import Responsive from '@/components/common/Responsive';
import DesktopCommunityLayout from '@/components/community/layout/DesktopCommunityLayout';
import MobileCommunityLayout from '@/components/community/layout/MobileCommunityLayout';
import { FeedDetailLink, TagLink, useFeedDetailParam, useTagParam } from '@/components/community/queryParam';

const CommunityPage: FC = () => {
  const [feed] = useFeedDetailParam();
  const [tag] = useTagParam();

  const feedList = (
    <div style={{ backgroundColor: colors.blue600, display: 'flex', flexDirection: 'column' }}>
      <TagLink tagId='tag1'>태그1</TagLink>
      <TagLink tagId='tag2'>태그2</TagLink>
      <TagLink tagId='tag3'>태그3</TagLink>
      <div>CurrentTag: {tag}</div>
      <FeedDetailLink feedId='ramen'>한강라면</FeedDetailLink>
      <FeedDetailLink feedId='chicken'>치킨</FeedDetailLink>
    </div>
  );

  const feedDetail = (
    <div style={{ backgroundColor: colors.green600 }}>
      <FeedDetailLink feedId={undefined}>닫기</FeedDetailLink>
      <div>피드 ID: {feed}</div>
    </div>
  );

  return (
    <>
      <Responsive only='desktop'>
        <DesktopCommunityLayout isDetailOpen={feed !== ''} listSlot={feedList} detailSlot={feedDetail} />
      </Responsive>
      <Responsive only='mobile'>
        <MobileCommunityLayout isDetailOpen={feed !== ''} listSlot={feedList} detailSlot={feedDetail} />
      </Responsive>
    </>
  );
};

export default CommunityPage;
