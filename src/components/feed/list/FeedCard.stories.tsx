import { Meta } from '@storybook/react';
import { ComponentProps } from 'react';

import FeedLike from '@/components/feed/common/FeedLike';

import FeedCard from './FeedCard';

const meta = {
  component: FeedCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FeedCard>;
export default meta;

const COMMENTS = [
  {
    id: 1,
    name: '주수한',
    comment: '저도 같이 가고 싶어요!',
    isBlindWriter: false,
    memberId: 0,
  },
  {
    id: 2,
    name: '이정연',
    comment: '도요 도요 저도요!',
    isBlindWriter: false,
    memberId: 0,
  },
  {
    id: 3,
    name: '남부장',
    comment: '어허, 나는 왜 빼려고 하는가 허허',
    isBlindWriter: false,
    memberId: 0,
  },
];

const defaultProps: ComponentProps<typeof FeedCard> = {
  name: '이준호',
  info: 'Frontend Developer @Toss',
  profileImage:
    'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/f7ca1cbd-87e4-4dd3-92cf-e2420afee237-IMG_9435.JPG',
  createdAt: '2023.10.23.11:00:11',
  title: '다음주 일요일에 클라이밍하러가실 분',
  content:
    '처음해봐도 괜찮으니까 편하게 오세요! 장소는 클라이밍파크 신논현점 생각하고 있어요. 2시쯤 만나서 하고, 끝나고 같이 고기 먹어요~',
  hits: 23,
  commentLength: COMMENTS.length,
  isShowInfo: true,
  memberId: 0,
  sopticleUrl: '',
  thumbnailUrl: '',
  like: (
    <FeedLike
      isLiked={true}
      likes={3}
      onClick={() => {
        return;
      }}
    />
  ),
};

export const 기본 = () => {
  return (
    <FeedCard {...defaultProps}>
      <FeedCard.Comment>
        {COMMENTS.map((comment) => (
          <FeedCard.CommentItem key={comment.id} name={comment.name} comment={comment.comment} />
        ))}
      </FeedCard.Comment>
    </FeedCard>
  );
};

export const 익명 = () => {
  return (
    <FeedCard {...defaultProps} isBlindWriter>
      <FeedCard.Comment>
        {COMMENTS.map((comment) => (
          <FeedCard.CommentItem key={comment.id} name={comment.name} comment={comment.comment} />
        ))}
      </FeedCard.Comment>
    </FeedCard>
  );
};

const QURESTION_COMMENTS = [
  {
    id: 1,
    name: '박건영',
    comment:
      'flexbox의 자식 컴포넌트의 기본 min-width값은 min-width: auto 에요. 따라서 컨테이너의 width를 넘어가지 않을 것으로 예상되지만, flex-basis: auto보다 min-width: auto가 먼저 적용되어 자식 컴포넌트가 옆으로 길어질 경우 컨테이너의 너비를 초과하게 돼요. 이를 해결하려면 min-width: 0 을 주어야 해요!',
    isBlindWriter: false,
  },
  {
    id: 2,
    name: '남부장',
    comment: '커사원 잘했네.',
    isBlindWriter: false,
  },
];

export const 질문 = () => {
  return (
    <FeedCard
      {...defaultProps}
      title='CSS 질문 있습니다!'
      content='Flexbox container 안의 자식 item이 container의 width를 넘어가는데 왜 그런지 아시나요?'
      isQuestion
    >
      <FeedCard.Comment>
        {QURESTION_COMMENTS.map((comment) => (
          <FeedCard.CommentItem key={comment.id} name={comment.name} comment={comment.comment} />
        ))}
      </FeedCard.Comment>
    </FeedCard>
  );
};

export const 댓글한개 = () => {
  return (
    <FeedCard {...defaultProps}>
      <FeedCard.Comment>
        {[
          {
            id: 1,
            name: 'Evan Kim',
            comment: 'LGTM!',
          },
        ].map((comment) => (
          <FeedCard.CommentItem key={comment.id} name={comment.name} comment={comment.comment} />
        ))}
      </FeedCard.Comment>
    </FeedCard>
  );
};

const 당근_배경 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/ab298948-935c-41e9-801f-420ba4482a10';
const 노트북_당근 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/33e150c1-e8f9-4d02-bf32-1fe1f1e7cc8b';
const 폰배경_당근 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/0b168abb-8f7f-4562-874a-b179a1ddd012';

const IMAGES = [당근_배경, 노트북_당근, 폰배경_당근];
const IMAGES_COMMENTS = [
  {
    id: 1,
    name: '이화정',
    comment: '너무 귀여워요!! 당근 너무 좋아요',
    isBlindWriter: false,
    memberId: 0,
  },
  {
    id: 2,
    name: '민솔',
    comment: '배고파요...',
    isBlindWriter: false,
    memberId: 0,
  },
];

export const 이미지와함께 = () => {
  return (
    <FeedCard {...defaultProps} title='이번에 당근 리브랜딩' content='너무 귀엽지 않나요? 당근이 배경화면 공유합니다'>
      <FeedCard.Image>
        {IMAGES.map((image) => (
          <FeedCard.ImageItem key={image} src={image} height={200} />
        ))}
      </FeedCard.Image>
      <FeedCard.Comment>
        {IMAGES_COMMENTS.map((comment) => (
          <FeedCard.CommentItem key={comment.id} name={comment.name} comment={comment.comment} />
        ))}
      </FeedCard.Comment>
    </FeedCard>
  );
};

export const 제목겁나길때 = () => {
  return (
    <FeedCard
      {...defaultProps}
      title='제목이 겁나 길어서 두 줄로 줄바꿈 될 뿐만 아니라, 말줄임표까지 생기게 하는게 제 목표에요. 당근이는 귀엽지만, 그래도 춘식이에 비하면 그냥 토끼옷을 입은 강아지일 뿐이에요.'
    >
      <FeedCard.Comment>
        {COMMENTS.map((comment) => (
          <FeedCard.CommentItem key={comment.id} name={comment.name} comment={comment.comment} />
        ))}
      </FeedCard.Comment>
    </FeedCard>
  );
};

export const 제목없을때 = () => {
  return (
    <FeedCard {...defaultProps} title=''>
      <FeedCard.Comment>
        {COMMENTS.map((comment) => (
          <FeedCard.CommentItem key={comment.id} name={comment.name} comment={comment.comment} />
        ))}
      </FeedCard.Comment>
    </FeedCard>
  );
};

export const 내용겁나길때 = () => {
  return (
    <FeedCard
      {...defaultProps}
      title='제목이 겁나 길어서 두 줄로 줄바꿈 될 뿐만 아니라, 말줄임표까지 생기게 하는게 제 목표에요. 당근이는 귀엽지만, 그래도 춘식이에 비하면 그냥 토끼옷을 입은 강아지일 뿐이에요.'
      content={`내용도 겁나 길어서 두 줄로 줄바꿈 될 뿐만 아니라, 말줄임표까지 생기게 하는게 제 목표에요. 당근이는 귀엽지만, 그래도 춘식이에 비하면 그냥 토끼옷을 입은 강아지일 뿐이에요.\n
      제목이 겁나 길어서 두 줄로 줄바꿈 될 뿐만 아니라, 말줄임표까지 생기게 하는게 제 목표에요. 당근이는 귀엽지만, 그래도 춘식이에 비하면 그냥 토끼옷을 입은 강아지일 뿐이에요.
            `}
    >
      <FeedCard.Comment>
        {COMMENTS.map((comment) => (
          <FeedCard.CommentItem key={comment.id} name={comment.name} comment={comment.comment} />
        ))}
      </FeedCard.Comment>
    </FeedCard>
  );
};
