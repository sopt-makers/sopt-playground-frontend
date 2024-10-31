import { Meta } from '@storybook/react';

import GroupSection from './index';

export default {
  component: GroupSection,
} as Meta<typeof GroupSection>;

export const Default = {
  args: {
    profile: {
      name: '홍길동',
    },
    meetingList: [
      {
        id: 1,
        category: '스터디',
        imageUrl:
          'https://wsrv.nl/?url=https%3A%2F%2Fs3.ap-northeast-2.amazonaws.com%2Fsopt-makers-internal%2F%2Fdev%2Fimage%2Fproject%2F08e783ca-e3bd-4144-9b29-fcf543ab3b27-tossfeed-thumbnail.png&h=168&output=webp',
        isActiveMeeting: true,
        isMeetingLeader: false,
        mendDate: '2025-12-25T00:00:00',
        mstartDate: '2024-12-25T00:00:00',
        title: '스터디 테스트 ~',
      },
    ],
  },
  name: 'Default',
};
