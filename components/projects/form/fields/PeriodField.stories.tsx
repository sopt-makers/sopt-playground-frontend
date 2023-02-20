import { ComponentMeta, ComponentStory } from '@storybook/react';

import PeriodField from '@/components/projects/form/fields/PeriodField';

export default {
  component: PeriodField,
} as ComponentMeta<typeof PeriodField>;

const Template: ComponentStory<typeof PeriodField> = (args) => <PeriodField {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  value: {
    startAt: '2022-10',
    endAt: '2023-01',
  },
};
