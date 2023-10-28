import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import Responsive from '@/components/common/Responsive';
import DesktopCommunityLayout from '@/components/community/layout/DesktopCommunityLayout';
import MobileCommunityLayout from '@/components/community/layout/MobileCommunityLayout';
import FeedList from '@/components/community/list/FeedList';
import { FeedDetailLink, useFeedDetailParam } from '@/components/community/queryParam';

const CommunityPage: FC = () => {
  const [feed] = useFeedDetailParam();

  const feedList = <FeedList />;

  const feedDetail = (
    <div style={{ backgroundColor: colors.green600 }}>
      <FeedDetailLink feedId={undefined}>닫기</FeedDetailLink>
      <div>피드 ID: {feed}</div>
    </div>
  );

  const isDetailOpen = feed != null && feed !== '';

  return (
    <>
      <Responsive only='desktop'>
        <DesktopCommunityLayout isDetailOpen={isDetailOpen} listSlot={feedList} detailSlot={feedDetail} />
      </Responsive>
      <Responsive only='mobile'>
        <MobileCommunityLayout isDetailOpen={isDetailOpen} listSlot={feedList} detailSlot={feedDetail} />
      </Responsive>
    </>
  );
};

export default CommunityPage;
