import { Meta } from '@storybook/react';

import SoptActivitySection from '@/components/members/detail/SoptActivitySection';

const meta = {
  component: SoptActivitySection,
} satisfies Meta<typeof SoptActivitySection>;
export default meta;

export const Default = () => {
  return (
    <SoptActivitySection
      soptActivities={[
        {
          generation: 29,
          part: '웹',
          team: null,
          projects: [
            { id: 0, generation: 29, name: '너가소개서', category: 'APPJAM' },
            { id: 1, generation: 29, name: '산넘어산', category: 'SOPTERM' },
          ],
        },
        { generation: 30, part: '기획', team: '운영팀', projects: [] },
      ]}
    />
  );
};
