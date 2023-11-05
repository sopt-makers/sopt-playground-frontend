import { colors } from '@sopt-makers/colors';
import { Meta, StoryObj } from '@storybook/react';
import { Flex, Stack } from '@toss/emotion-utils';
import { useState } from 'react';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';

import FeedImageSlider from './FeedImageSlider';

const meta = {
  component: FeedImageSlider,
} satisfies Meta<typeof FeedImageSlider>;
export default meta;

type Story = StoryObj<typeof meta>;

const 당근데탑큰것 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/37aeca19-f53c-4a96-a42a-a6bfe1cc5f5b';
const 주우재먹방 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/906c09a2-6c30-4022-ae36-681f54c490e0';
const 사과점수 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/b47c137d-b2d6-4cc0-a1c3-583f253d8728';
const 노트북당근 =
  'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/33e150c1-e8f9-4d02-bf32-1fe1f1e7cc8b';

const IMAGES = [주우재먹방, 당근데탑큰것, 노트북당근, 사과점수];

export const 기본 = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Stack>
      <Text typography='SUIT_16_SB' color={colors.gray10}>
        모바일도 대응이 되어있어요!
      </Text>
      <Button variant='primary' onClick={() => setOpened(true)}>
        이미지 슬라이더 열기
      </Button>
      <FeedImageSlider opened={opened} onClose={() => setOpened(false)} images={IMAGES} />
    </Stack>
  );
};

export const 이미지한개 = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Stack>
      <Text typography='SUIT_16_SB' color={colors.gray10}>
        모바일도 대응이 되어있어요!
      </Text>
      <Button variant='primary' onClick={() => setOpened(true)}>
        이미지 슬라이더 열기
      </Button>
      <FeedImageSlider opened={opened} onClose={() => setOpened(false)} images={[주우재먹방]} />
    </Stack>
  );
};
