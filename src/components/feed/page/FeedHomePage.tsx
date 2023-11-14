import { colors } from '@sopt-makers/colors';
import { FC, useState } from 'react';

import Responsive from '@/components/common/Responsive';
import FeedList from '@/components/feed/list/FeedList';
import { FeedDetailLink, useFeedDetailParam } from '@/components/feed/common/queryParam';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';
import DesktopCommunityLayout from '@/components/feed/page/layout/DesktopCommunityLayout';
import MobileCommunityLayout from '@/components/feed/page/layout/MobileCommunityLayout';

const CommunityPage: FC = () => {
  const [feed] = useFeedDetailParam();
  const [value, setValue] = useState('');
  const [isBlind, setIsBlind] = useState(false);

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
        <DesktopCommunityLayout
          isDetailOpen={feed !== ''}
          listSlot={feedList}
          detailSlot={
            <DetailFeedCard>
              <DetailFeedCard.Header category='파트' tag='기획' />
              <DetailFeedCard.Body>
                <DetailFeedCard.Main>
                  <DetailFeedCard.Top
                    name='이준호'
                    profileImage='https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/f7ca1cbd-87e4-4dd3-92cf-e2420afee237-IMG_9435.JPG'
                    info='Frontend Developer @Toss'
                    createdAt='2023.10.23.11:00:11'
                  />
                  <DetailFeedCard.Content
                    isQuestion
                    title='YC의 스타트업을 위한 필수 조언'
                    hits={23}
                    commentLength={COMMENTS.length}
                    content='라면을 끓일때 엄청난 비법이 필요하기보단 정량의 물을 넣고, 레시피에 주어진 시간만큼 끓이는 것이 중요하듯 기본적인 조언이지만 스타트업 경영과 성장 역시도 필수적인 것을 지키지 않았을 때 크리티컬한 만큼'
                    images={IMAGES}
                  />
                </DetailFeedCard.Main>
                <DetailFeedCard.Divider />
                {COMMENTS.map((comment) => (
                  <DetailFeedCard.Comment
                    key={comment.id}
                    name={comment.name}
                    image={comment.image}
                    info={comment.info}
                    comment={comment.comment}
                  />
                ))}
              </DetailFeedCard.Body>
              <DetailFeedCard.Input
                value={value}
                onChange={setValue}
                isBlindChecked={isBlind}
                onChangeIsBlindChecked={setIsBlind}
              />
            </DetailFeedCard>
          }
        />
      </Responsive>
      <Responsive only='mobile'>
        <MobileCommunityLayout isDetailOpen={isDetailOpen} listSlot={feedList} detailSlot={feedDetail} />
      </Responsive>
    </>
  );
};

export default CommunityPage;

const COMMENTS = [
  {
    id: 1,
    name: '이정연',
    image:
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/f7ca1cbd-87e4-4dd3-92cf-e2420afee237-IMG_9435.JPG',
    info: '28기 디자인 파트',
    comment:
      '라면을 끓일때 엄청난 비법이 필요하기보단 정량의 물을 넣고, 레시피에 주어진 시간만큼 끓이는 것이 중요하듯 기본적인 조언이지만 스타트업 경영과 성장 역시도 필수적인 것을 지키지 않았을 때 크리티컬한 만큼',
  },
  {
    id: 1,
    name: '이정연',
    image:
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/f7ca1cbd-87e4-4dd3-92cf-e2420afee237-IMG_9435.JPG',
    info: '28기 디자인 파트',
    comment:
      '라면을 끓일때 엄청난 비법이 필요하기보단 정량의 물을 넣고, 레시피에 주어진 시간만큼 끓이는 것이 중요하듯 기본적인 조언이지만 스타트업 경영과 성장 역시도 필수적인 것을 지키지 않았을 때 크리티컬한 만큼',
  },
  {
    id: 1,
    name: '이정연',
    image:
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/f7ca1cbd-87e4-4dd3-92cf-e2420afee237-IMG_9435.JPG',
    info: '28기 디자인 파트',
    comment:
      '라면을 끓일때 엄청난 비법이 필요하기보단 정량의 물을 넣고, 레시피에 주어진 시간만큼 끓이는 것이 중요하듯 기본적인 조언이지만 스타트업 경영과 성장 역시도 필수적인 것을 지키지 않았을 때 크리티컬한 만큼',
  },
  {
    id: 1,
    name: '이정연',
    image:
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/f7ca1cbd-87e4-4dd3-92cf-e2420afee237-IMG_9435.JPG',
    info: '28기 디자인 파트',
    comment:
      '라면을 끓일때 엄청난 비법이 필요하기보단 정량의 물을 넣고, 레시피에 주어진 시간만큼 끓이는 것이 중요하듯 기본적인 조언이지만 스타트업 경영과 성장 역시도 필수적인 것을 지키지 않았을 때 크리티컬한 만큼',
  },
  {
    id: 1,
    name: '이정연',
    image:
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/f7ca1cbd-87e4-4dd3-92cf-e2420afee237-IMG_9435.JPG',
    info: '28기 디자인 파트',
    comment:
      '라면을 끓일때 엄청난 비법이 필요하기보단 정량의 물을 넣고, 레시피에 주어진 시간만큼 끓이는 것이 중요하듯 기본적인 조언이지만 스타트업 경영과 성장 역시도 필수적인 것을 지키지 않았을 때 크리티컬한 만큼',
  },
];

const 당근데탑큰것 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/37aeca19-f53c-4a96-a42a-a6bfe1cc5f5b';
const 주우재먹방 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/906c09a2-6c30-4022-ae36-681f54c490e0';
const 사과점수 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/b47c137d-b2d6-4cc0-a1c3-583f253d8728';

const IMAGES = [주우재먹방, 당근데탑큰것, 사과점수];
