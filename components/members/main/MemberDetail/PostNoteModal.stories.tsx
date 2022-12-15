import { ComponentMeta, ComponentStory } from '@storybook/react';

import PostNoteModal from './PostNoteModal';

export default {
  component: PostNoteModal,
} as ComponentMeta<typeof PostNoteModal>;

const Template: ComponentStory<typeof PostNoteModal> = (args) => <PostNoteModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: '춘식이',
  profile: <img width={84} height={84} src={'/icons/icon-member.svg'} alt='profile' />,
};
Default.storyName = '기본';
