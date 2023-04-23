import { ComponentMeta, ComponentStory } from '@storybook/react';

import CareerSection from '@/components/members/detail/CareerSection';

export default {
  component: CareerSection,
} as ComponentMeta<typeof CareerSection>;

const Template: ComponentStory<typeof CareerSection> = (args) => <CareerSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  careers: [
    { companyName: '당근마켓', isCurrent: true, title: 'FE Developer', startDate: '2023-04', endDate: null },
    { companyName: '토스', isCurrent: false, title: 'FE Developer', startDate: '2022-04', endDate: '2023-03' },
  ],
  links: [
    { id: -1, title: 'Github', url: 'https://playground.sopt.org/members/8' },
    { id: -1, title: '블로그', url: 'https://playground.sopt.org/members/8' },
  ],
  skill: 'React, TypeScript',
};
Default.storyName = '기본';
