import type { ComponentMeta, ComponentStory } from '@storybook/react';

import PopularCard from './PopularCard';

export default {
  component: PopularCard,
} as ComponentMeta<typeof PopularCard>;

const Template: ComponentStory<typeof PopularCard> = (args) => <PopularCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  rank: 1,
  category: '자유',
  title: '여기는 제목입니다',
  profileImage: 'https://avatars.githubusercontent.com/u/90364711?v=4',
  name: '김솝트',
  hits: 432,
};
