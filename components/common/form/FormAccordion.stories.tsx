import { ComponentMeta, ComponentStory } from '@storybook/react';

import FormAccordion from './FormAccordion';

export default {
  component: FormAccordion,
} as ComponentMeta<typeof FormAccordion>;

const Template: ComponentStory<typeof FormAccordion> = (args) => <FormAccordion {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '나의 커리어',
  description: '나의 경력, 스킬 등을 작성해 볼 수 있어요.',
  children: (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra ultricies tellus. Sed commodo vel justo vel
      bibendum. Maecenas venenatis enim vel velit aliquet, a blandit libero tincidunt. Nunc sit amet neque eget sapien
      imperdiet commodo. Nam lobortis semper lobortis. Sed lobortis nunc ut augue molestie ultricies. Donec mollis,
      velit nec rhoncus molestie, justo ex bibendum dolor, at tristique ante tortor vitae purus. Morbi malesuada nisl
      sit amet risus rhoncus, ut auctor sapien imperdiet. Duis suscipit turpis eu eros cursus, vel convallis velit
      semper. Phasellus eget consectetur eros. Sed vel mauris venenatis, malesuada lorem eu, finibus neque. Quisque
      dignissim urna non lorem laoreet malesuada. Nam nec tincidunt eros. Donec ut ipsum et nibh vestibulum commodo in a
      massa. Pellentesque nec dapibus est, sit amet semper enim. Sed at mauris eget purus interdum gravida in sed
      mauris. Nulla facilisi. Vestibulum eu diam sapien. Morbi at purus et elit consectetur vehicula eget a velit. Donec
      sodales nisi sit amet posuere blandit. In nec massa libero. Praesent malesuada dolor vel ante hendrerit lobortis.
      Vestibulum ac arcu vitae purus sagittis posuere. Nullam interdum posuere pharetra. Phasellus id ultrices leo. In
      hac habitasse platea dictumst. Integer ac risus magna. Maecenas aliquam, sapien sit amet semper iaculis, felis ex
      aliquam arcu, a facilisis libero est non lectus. Etiam sed elit quis magna blandit faucibus vel sed mi. Sed at mi
      et sem luctus pulvinar. Sed non tortor non ex hendrerit consectetur vel in augue. In hac habitasse platea
      dictumst. Curabitur ornare enim sed est interdum, eu feugiat enim hendrerit. Sed bibendum dignissim nunc, eget
      bibendum dolor volutpat quis. Fusce facilisis lobortis ante. Sed eget massa a lectus lacinia vestibulum id vel
      ipsum. Fusce sit amet erat in velit ultricies ullamcorper. Suspendisse quis leo vitae augue pharetra sollicitudin.
      Integer euismod magna vel augue dignissim commodo. Duis tempor ante augue, non tempus ex gravida at. Maecenas
      consequat neque non nisl lacinia interdum. Nunc commodo, ipsum sit amet pretium euismod, mi massa eleifend nisl,
      ac volutpat felis velit in velit. Donec consectetur purus a sapien tincidunt, vel pellentesque massa hendrerit.
      Sed sit amet nulla euismod, pharetra nibh eu, dictum leo. Sed commodo consectetur dolor a lacinia
    </p>
  ),
};
Default.storyName = '기본';
