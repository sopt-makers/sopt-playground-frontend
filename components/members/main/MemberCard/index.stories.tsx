import { ComponentMeta, ComponentStory } from '@storybook/react';

import NewMemberCard from '.';

export default {
  component: NewMemberCard,
  parameters: {},
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof NewMemberCard>;

const Template: ComponentStory<typeof NewMemberCard> = (args) => <NewMemberCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: '박건영',
  imageUrl:
    'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/45a0271c-895c-427b-9ff2-a2efb4daa7ce-1679161408215.jpg',
  belongs: 'Google',
  badges: [
    { content: '29기 웹', isActive: false },
    { content: '2기 메이커스', isActive: true },
  ],
  intro: '안녕하세요!',
};
Default.storyName = '기본';
