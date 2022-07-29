import { ComponentMeta } from '@storybook/react';
import { Controller, useForm } from 'react-hook-form';
import ImageUploader from '.';

export default {
  component: ImageUploader,
} as ComponentMeta<typeof ImageUploader>;

export const Default = () => {
  const { control } = useForm<{ image: string }>();

  return <Controller name='image' control={control} render={({ field }) => <ImageUploader {...field} />} />;
};
Default.args = {};
Default.storyName = '기본';
