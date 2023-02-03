import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Responsive from '@/components/common/Responsive/Responsive';

export default {
  component: Responsive,
} as ComponentMeta<typeof Responsive>;

const Template: ComponentStory<typeof Responsive> = (args) => <Responsive {...args} />;

const X = styled.a``;

export const Basic = Template.bind({});
Basic.args = {
  children: <a className='AAAA'>AAAA</a>,
};
Basic.storyName = '기본';
