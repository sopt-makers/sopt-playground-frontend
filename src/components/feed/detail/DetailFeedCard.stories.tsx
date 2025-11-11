import { Meta } from '@storybook/react';
import { useState } from 'react';

import FeedLike from '@/components/feed/common/FeedLike';

import DetailFeedCard from './DetailFeedCard';

const meta = {
  component: DetailFeedCard,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DetailFeedCard>;
export default meta;

const COMMENTS = [
  {
    id: 1,
    name: '이정연',
    image:
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/f7ca1cbd-87e4-4dd3-92cf-e2420afee237-IMG_9435.JPG',
    info: '28기 디자인 파트',
    comment:
      '라면을 끓일때 엄청난 비법이 필요하기보단 정량의 물을 넣고, 레시피에 주어진 시간만큼 끓이는 것이 중요하듯 기본적인 조언이지만 스타트업 경영과 성장 역시도 필수적인 것을 지키지 않았을 때 크리티컬한 만큼',
    createdAt: '2021-08-31T14:00:00.000Z',
  },
  {
    id: 2,
    name: '이정연',
    image:
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/f7ca1cbd-87e4-4dd3-92cf-e2420afee237-IMG_9435.JPG',
    info: '28기 디자인 파트',
    comment:
      '라면을 끓일때 엄청난 비법이 필요하기보단 정량의 물을 넣고, 레시피에 주어진 시간만큼 끓이는 것이 중요하듯 기본적인 조언이지만 스타트업 경영과 성장 역시도 필수적인 것을 지키지 않았을 때 크리티컬한 만큼',
    createdAt: '2021-08-31T14:00:00.000Z',
  },
  {
    id: 3,
    name: '이정연',
    image:
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/f7ca1cbd-87e4-4dd3-92cf-e2420afee237-IMG_9435.JPG',
    info: '28기 디자인 파트',
    comment:
      '라면을 끓일때 엄청난 비법이 필요하기보단 정량의 물을 넣고, 레시피에 주어진 시간만큼 끓이는 것이 중요하듯 기본적인 조언이지만 스타트업 경영과 성장 역시도 필수적인 것을 지키지 않았을 때 크리티컬한 만큼',
    createdAt: '2021-08-31T14:00:00.000Z',
  },
  {
    id: 4,
    name: '이정연',
    image:
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/f7ca1cbd-87e4-4dd3-92cf-e2420afee237-IMG_9435.JPG',
    info: '28기 디자인 파트',
    comment:
      '라면을 끓일때 엄청난 비법이 필요하기보단 정량의 물을 넣고, 레시피에 주어진 시간만큼 끓이는 것이 중요하듯 기본적인 조언이지만 스타트업 경영과 성장 역시도 필수적인 것을 지키지 않았을 때 크리티컬한 만큼',
    createdAt: '2021-08-31T14:00:00.000Z',
  },
  {
    id: 5,
    name: '이정연',
    image:
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/f7ca1cbd-87e4-4dd3-92cf-e2420afee237-IMG_9435.JPG',
    info: '28기 디자인 파트',
    comment:
      '라면을 끓일때 엄청난 비법이 필요하기보단 정량의 물을 넣고, 레시피에 주어진 시간만큼 끓이는 것이 중요하듯 기본적인 조언이지만 스타트업 경영과 성장 역시도 필수적인 것을 지키지 않았을 때 크리티컬한 만큼',
    createdAt: '2021-08-31T14:00:00.000Z',
  },
];

const 당근데탑큰것 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/37aeca19-f53c-4a96-a42a-a6bfe1cc5f5b';
const 당근데탑작은것 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/45efc303-1449-4cc3-b4a0-b475af17ae57';

export const Default = () => {
  const [value, setValue] = useState('');
  const [isBlind, setIsBlind] = useState(false);

  return (
    <DetailFeedCard>
      <DetailFeedCard.Header categoryId='123' category='파트' tag='기획' />
      <DetailFeedCard.Body>
        <DetailFeedCard.Main>
          <DetailFeedCard.Top
            name='이준호'
            profileImage='https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/f7ca1cbd-87e4-4dd3-92cf-e2420afee237-IMG_9435.JPG'
            info='Frontend Developer @Toss'
            createdAt='2023.10.23.11:00:11'
            isBlindWriter={false}
            memberId={0}
          />
          <DetailFeedCard.Content
            postId={1}
            categoryId={1}
            isMine={false}
            vote={null}
            title='YC의 스타트업을 위한 필수 조언'
            hits={23}
            commentLength={COMMENTS.length}
            content='라면을 끓일때 엄청난 비법이 필요하기보단 정량의 물을 넣고, 레시피에 주어진 시간만큼 끓이는 것이 중요하듯 기본적인 조언이지만 스타트업 경영과 성장 역시도 필수적인 것을 지키지 않았을 때 크리티컬한 만큼'
            images={[당근데탑큰것, 당근데탑작은것, 당근데탑큰것]}
            sopticleUrl=''
            thumbnailUrl=''
            like={
              <FeedLike
                isLiked={true}
                likes={3}
                onClick={() => {
                  return;
                }}
              />
            }
          />
        </DetailFeedCard.Main>
        <DetailFeedCard.Divider />
        {COMMENTS.map((comment) => (
          <DetailFeedCard.Comment
            commentId={comment.id}
            postId={'123'}
            isLiked={false}
            commentLikeCount={0}
            key={comment.id}
            name={comment.name}
            profileImage={comment.image}
            info={comment.info}
            comment={comment.comment}
            isBlindWriter={false}
            createdAt={comment.createdAt}
            parentCommentId={null}
            isDeleted={false}
            hasReplies={false}
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
  );
};
