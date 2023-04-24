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
    { companyName: '네이버', isCurrent: false, title: 'FE Developer', startDate: '2021-04', endDate: '2022-03' },
  ],
  links: [
    { id: -1, title: 'Github', url: 'https://playground.sopt.org/members/8' },
    { id: -1, title: '블로그', url: 'https://playground.sopt.org/members/8' },
  ],
  skill: 'React, TypeScript',
};
Default.storyName = '기본';

export const JoblessWithTwoCareers = Template.bind({});
JoblessWithTwoCareers.args = {
  careers: [
    { companyName: '당근마켓', isCurrent: false, title: 'FE Developer', startDate: '2023-03', endDate: '2023-04' },
    { companyName: '토스', isCurrent: false, title: 'FE Developer', startDate: '2022-04', endDate: '2023-02' },
  ],
  links: [
    { id: -1, title: 'Github', url: 'https://playground.sopt.org/members/8' },
    { id: -1, title: '블로그', url: 'https://playground.sopt.org/members/8' },
  ],
  skill: 'React, TypeScript',
};
JoblessWithTwoCareers.storyName = '무직 상태(경력 2개 이상)';

export const JoblessWithCareer = Template.bind({});
JoblessWithCareer.args = {
  careers: [
    { companyName: '당근마켓', isCurrent: false, title: 'FE Developer', startDate: '2023-03', endDate: '2023-04' },
  ],
  links: [
    { id: -1, title: 'Github', url: 'https://playground.sopt.org/members/8' },
    { id: -1, title: '블로그', url: 'https://playground.sopt.org/members/8' },
  ],
  skill: 'React, TypeScript',
};
JoblessWithCareer.storyName = '무직 상태(경력 1개)';

export const New = Template.bind({});
New.args = {
  careers: [{ companyName: '당근마켓', isCurrent: true, title: 'FE Developer', startDate: '2023-03', endDate: null }],
  links: [
    { id: -1, title: 'Github', url: 'https://playground.sopt.org/members/8' },
    { id: -1, title: '블로그', url: 'https://playground.sopt.org/members/8' },
  ],
  skill: 'React, TypeScript',
};
New.storyName = '신입';
