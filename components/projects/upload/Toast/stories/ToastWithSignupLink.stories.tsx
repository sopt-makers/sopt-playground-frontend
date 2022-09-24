import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProjectToast from '@/components/projects/upload/Toast';
import SignupLink from '@/components/projects/upload/SignupLink';

const ToastWithSignupLink = ({ duration }: { duration?: number }) => {
  return (
    <>
      <ProjectToast duration={duration} />
      <SignupLink />
    </>
  );
};

export default {
  component: ToastWithSignupLink,
} as ComponentMeta<typeof ToastWithSignupLink>;

const Template: ComponentStory<typeof ToastWithSignupLink> = (args) => <ToastWithSignupLink {...args} />;

export const Default = Template.bind({});
Default.storyName = '기본';

export const Duration2000 = Template.bind({});
Duration2000.args = { duration: 2000 };
Duration2000.storyName = 'duration 2000';
