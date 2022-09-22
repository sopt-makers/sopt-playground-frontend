import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProjectToast from '@/components/projects/upload/Toast';

export default {
  component: ProjectToast,
} as ComponentMeta<typeof ProjectToast>;

const Template: ComponentStory<typeof ProjectToast> = (args) => <ProjectToast {...args} />;

export const Default = Template.bind({});
Default.storyName = '기본';

export const Duration2000 = Template.bind({});
Default.args = { duration: 2000 };
Default.storyName = 'duration 2000';
