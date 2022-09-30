import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { colors } from '@/styles/colors';

import ProjectUploadPage from '.';

export default {
  component: ProjectUploadPage,
  decorators: [
    (Story) => (
      <StyledContainer>
        <Story />
      </StyledContainer>
    ),
  ],
} as ComponentMeta<typeof ProjectUploadPage>;

const Template: ComponentStory<typeof ProjectUploadPage> = (args) => <ProjectUploadPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';

const StyledContainer = styled.div`
  background-color: ${colors.black100};
  width: 100%;
  height: 100%;
`;
