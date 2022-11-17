import { ComponentMeta, ComponentStory } from '@storybook/react';

import AboutMakers from '@/components/makers/AboutMakers';

export default {
  component: AboutMakers,
} as ComponentMeta<typeof AboutMakers>;

const Template: ComponentStory<typeof AboutMakers> = (args) => <AboutMakers {...args} />;

export const Basic = Template.bind({});
Basic.storyName = '기본';
