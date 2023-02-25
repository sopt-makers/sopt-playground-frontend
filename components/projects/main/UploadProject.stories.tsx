import { ComponentMeta, ComponentStory } from '@storybook/react';

import UploadProject from '@/components/projects/main/UploadProject';

export default {
  component: UploadProject,
} as ComponentMeta<typeof UploadProject>;

const Template: ComponentStory<typeof UploadProject> = (args) => <UploadProject {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
