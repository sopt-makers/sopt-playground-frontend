import React from 'react';
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

import FormItem, { FormItemProps } from '@/components/common/form/FormItem';

type RHFControllerFormItemProps<
  T extends React.ElementType,
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> = {
  component: T;
} & FormItemProps &
  UseControllerProps<TFieldValues, TFieldPath> &
  Omit<React.ComponentProps<T>, 'onChange' | 'value'>;

/**
 * React-Hook-Form의 Controller를 통해 래핑된 FormItem 입니다.
 * 기존의 라이브러리나 직접 제작한 컴포넌트인 경우, register가 아닌 Controller 방식으로 접근해야 하는데, 이를 위해 만들었습니다.
 *
 */
const RHFControllerFormItem = <
  T extends React.ElementType,
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
>({
  component: Component,
  name,
  control,
  rules,
  shouldUnregister,
  error,
  errorMessage,
  defaultValue,
  style,
  ...props
}: RHFControllerFormItemProps<T, TFieldValues, TFieldPath>) => {
  const {
    field,
    fieldState,
    formState: { errors },
  } = useController({ name, control, rules, shouldUnregister, defaultValue });

  return (
    <FormItem style={style}>
      <Component
        {...({
          error: error || !!fieldState.error,
          maxLength: props.maxCount,
          isError: !!errors?.[name],
          errorMessage: errors?.[name]?.message,
          ...field,
          ...props,
        } as React.ComponentProps<T>)}
      />
    </FormItem>
  );
};

export default RHFControllerFormItem;
