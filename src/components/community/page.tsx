import { colors } from '@sopt-makers/colors';
import { FC } from 'react';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';

import Responsive from '@/components/common/Responsive';
import DesktopCommunityLayout from '@/components/community/layout/DesktopCommunityLayout';
import MobileCommunityLayout from '@/components/community/layout/MobileCommunityLayout';

const CommunityPage: FC = () => {
  const [category, setCategory] = useQueryParam('category', withDefault(StringParam, ''));
  const [feed, setFeed] = useQueryParam('feed', withDefault(StringParam, ''));
  const [tag, setTag] = useQueryParam('tag', withDefault(StringParam, ''));

  const feedList = (
    <div style={{ backgroundColor: colors.blue600 }}>
      <button onClick={() => setFeed('NEW FEED')}>피드 열기</button>
    </div>
  );

  const feedDetail = (
    <div style={{ backgroundColor: colors.green600 }}>
      <button onClick={() => setFeed(undefined)}>닫기</button>
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
