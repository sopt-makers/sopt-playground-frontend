import { Meta } from '@storybook/react';

import ProjectForm from '@/components/projects/upload/form/ProjectForm';

export default {
  component: ProjectForm,
} as Meta<typeof ProjectForm>;

export const Basic = {
  args: {
    submitButtonContent: '프로젝트 등록하기',
  },
};

export const Default = () => {
  return <ProjectForm submitButtonContent='프로젝트 등록하기' />;
};
