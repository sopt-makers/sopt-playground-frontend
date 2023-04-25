import { ComponentMeta, ComponentStory } from '@storybook/react';

import CareerItem from '@/components/members/detail/CareerSection/CareerItem';

export default {
  component: CareerItem,
} as ComponentMeta<typeof CareerItem>;

const Template: ComponentStory<typeof CareerItem> = (args) => <CareerItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  career: {
    companyName: '당근마켓',
    isCurrent: false,
    title: 'FE Developer',
    startDate: '2023-03',
    endDate: '2023-04',
  },
};
Default.storyName = '기본';

export const Current = Template.bind({});
Current.args = {
  career: { companyName: 'LINE PLUS', isCurrent: true, title: 'FE Developer', startDate: '2023-03', endDate: null },
};
Current.storyName = '재직 중';
