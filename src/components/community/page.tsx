import { colors } from '@sopt-makers/colors';
import { FC, useState } from 'react';

import Responsive from '@/components/common/Responsive';
import DesktopCommunityLayout from '@/components/community/layout/DesktopCommunityLayout';
import MobileCommunityLayout from '@/components/community/layout/MobileCommunityLayout';
import { FeedDetailLink, TagLink, useFeedDetailParam, useTagParam } from '@/components/community/queryParam';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';

const CommunityPage: FC = () => {
  const [feed] = useFeedDetailParam();
  const [tag] = useTagParam();
  const [value, setValue] = useState('');
  const [isBlind, setIsBlind] = useState(false);

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
        <MobileCommunityLayout isDetailOpen={feed !== ''} listSlot={feedList} detailSlot={feedDetail} />
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
