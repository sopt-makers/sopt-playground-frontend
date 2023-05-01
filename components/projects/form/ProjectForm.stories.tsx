import { ComponentMeta, ComponentStory } from '@storybook/react';

import ProjectForm from '@/components/projects/form/ProjectForm';

export default {
  component: ProjectForm,
} as ComponentMeta<typeof ProjectForm>;

const Template: ComponentStory<typeof ProjectForm> = (args) => <ProjectForm {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  submitButtonContent: '프로젝트 등록하기',
};

export const Default = () => {
  return <ProjectForm submitButtonContent='프로젝트 등록하기' />;
};
