import { Meta, StoryObj } from '@storybook/react';

import ProjectCategorySelect from './ProjectCategorySelect';

const meta = {
  component: ProjectCategorySelect,
} satisfies Meta<typeof ProjectCategorySelect>;
export default meta;

export const 기본 = () => {
  return (
    <ProjectCategorySelect placeholder='프로젝트 전체'>
      <ProjectCategorySelect.Item value='APPJAM'>앱잼</ProjectCategorySelect.Item>
      <ProjectCategorySelect.Item value='SOPTKATON'>솝커톤</ProjectCategorySelect.Item>
    </ProjectCategorySelect>
  );
};
