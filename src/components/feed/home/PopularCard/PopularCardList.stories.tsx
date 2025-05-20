import type { ComponentMeta, ComponentStory } from '@storybook/react';

import PopularCardList from './PopularCardList';

export default {
  component: PopularCardList,
} as ComponentMeta<typeof PopularCardList>;

const Template: ComponentStory<typeof PopularCardList> = (args) => <PopularCardList />;

export const Default = Template.bind({});
Default.args = {};
