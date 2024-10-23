import { Meta } from '@storybook/react';

import ProfileSection from '@/components/members/detail/ProfileSection';

export default {
  component: ProfileSection,
} as Meta<typeof ProfileSection>;

export const Default = {
  args: {
    profile: {
      name: '정도영',
      introduction: '안녕하시오와',
      profileImage:
        'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//dev/image/project/dded5fe2-1264-4449-bbff-65b21a6de01f-77208067.jpeg',
      birthday: '1998-02-14',
      isPhonelind: true,
      phone: '010-1234-5678',
      email: 'byebye@naver.com',
      soptActivities: [
        {
          generation: 30,
          part: 'iOS',
          team: null,
          projects: [],
        },
      ],

      allowOfficial: false,
      isCoffeeChatActivate: false,
      coffeeChatBio: null,
      isMine: false,
    },
  },
  name: 'Default',
};
