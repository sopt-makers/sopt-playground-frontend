import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProjectToast from '@/components/projects/upload/Toast';
import SignupLink from '@/components/projects/upload/SignupLink';
import { RecoilRoot } from 'recoil';

const ToastWithSignupLink = ({ duration }: { duration?: number }) => {
  return (
    <RecoilRoot>
      <ProjectToast duration={duration} />
      <SignupLink />
    </RecoilRoot>
  );
};

export default {
  component: ToastWithSignupLink,
} as ComponentMeta<typeof ToastWithSignupLink>;

const Template: ComponentStory<typeof ToastWithSignupLink> = (args) => <ToastWithSignupLink {...args} />;

export const Default = Template.bind({});
Default.storyName = '기본';

export const Duration2000 = Template.bind({});
Default.args = { duration: 2000 };
Default.storyName = 'duration 2000';
