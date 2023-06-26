import { Meta } from '@storybook/react';
import { Controller, useForm } from 'react-hook-form';

import ImageUploader from '.';

export default {
  component: ImageUploader,
} as Meta<typeof ImageUploader>;

export const Default = {
  render: function Rendered() {
    const { control } = useForm<{ image: string }>();

    return <Controller name='image' control={control} render={({ field }) => <ImageUploader {...field} />} />;
  },

  args: {},
  name: '기본',
};
