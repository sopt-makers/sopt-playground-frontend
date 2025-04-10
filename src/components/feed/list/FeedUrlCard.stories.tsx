import { Decorator, Meta } from '@storybook/react';
import { ComponentProps } from 'react';

import FeedUrlCard from '@/components/feed/list/FeedUrlCard';

type FeedUrlCardProps = ComponentProps<typeof FeedUrlCard>;

const meta: Meta<typeof FeedUrlCard> = {
  component: FeedUrlCard,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const withMaxWidth =
  (width: string): Decorator =>
  (Story, { args }) =>
    <div style={{ maxWidth: width }}>{Story(args)}</div>;

const baseArgs: FeedUrlCardProps = {
  title: '내가 26살에 메이커스 플레이그라운드 프론트엔드 개발자가 될 수 있었던 이유',
  description: '지우, 현정, 서영, 정교, 주민, 채현, 성희 화이팅 ~~!!',
  thumbnailUrl: '/icons/img/og_playground.jpeg',
  url: 'https://playground.sopt.org/',
};

export const 기본 = {
  args: baseArgs,
  decorators: [withMaxWidth('464px')],
  parameters: {
    docs: {
      description: {
        story:
          'FeedUrlCard의 기본 형태예요. 썸네일, 제목, 설명, 링크가 포함되어 있고, 화면 너비가 768px 이하일 때는 세로 정렬로 보여져요.',
      },
    },
  },
};

export const 디테일 = {
  args: {
    ...baseArgs,
    isDetailFeedCard: true,
  },
  decorators: [withMaxWidth('512px')],
  parameters: {
    docs: {
      description: {
        story: '상세 페이지에서 사용하는 FeedUrlCard예요. 반응형 여부와 관계없이 항상 세로 정렬로 보여져요.',
      },
    },
  },
};
