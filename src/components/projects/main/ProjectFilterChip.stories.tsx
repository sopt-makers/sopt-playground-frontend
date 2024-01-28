import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import ProjectFilterChip from './ProjectFilterChip';

const meta = {
  component: ProjectFilterChip,
} satisfies Meta<typeof ProjectFilterChip>;
export default meta;

export const 기본 = () => {
  const [checked, onChange] = useState<boolean>(false);
  return (
    <ProjectFilterChip checked={checked} onCheckedChange={onChange}>
      창업 중
    </ProjectFilterChip>
  );
};
