import styled from '@emotion/styled';
import { Chip } from '@sopt-makers/ui';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { CoffeechatFormContent, CoffeechatFormPaths } from '@/components/coffeechat/upload/CoffeechatForm/types';
import FormItem from '@/components/common/form/FormItem';
import Responsive from '@/components/common/Responsive';

interface ChipFieldProps {
  field: CoffeechatFormPaths;
  errorMessage: string;
  chipList: readonly string[];
  isSingleSelect?: boolean;
}

export default function ChipField({ field, errorMessage, chipList, isSingleSelect = false }: ChipFieldProps) {
  const { control } = useFormContext<CoffeechatFormContent>();

  const isActive = (field: ControllerRenderProps<CoffeechatFormContent, CoffeechatFormPaths>, chip: string) => {
    return Array.isArray(field.value)
      ? isSingleSelect
        ? field.value[0] === chip
        : field.value.includes(chip)
      : field.value === chip;
  };

  return (
    <FormItem errorMessage={errorMessage}>
      <Controller
        name={field}
        control={control}
        render={({ field }) => (
          <ChipsWrapper {...field}>
            {chipList.map((chip) => (
              <div
                key={chip}
                onClick={() => {
                  if (isSingleSelect) {
                    field.onChange([chip]);
                  } else {
                    const newValue =
                      Array.isArray(field.value) && field.value.includes(chip)
                        ? field.value.filter((item) => item !== chip) // MEMO: 이미 선택된 경우 제거
                        : [...(Array.isArray(field.value) ? field.value : []), chip]; // MEMO: 복수 선택 모드일 경우 추가

                    field.onChange(newValue); // MEMO: 배열 업데이트
                  }
                }}
              >
                <Responsive only='desktop'>
                  <Chip size='sm' active={isActive(field, chip)}>
                    {chip}
                  </Chip>
                </Responsive>
                <Responsive only='mobile'>
                  <Chip size='sm' active={isActive(field, chip)}>
                    {chip}
                  </Chip>
                </Responsive>
              </div>
            ))}
          </ChipsWrapper>
        )}
      />
    </FormItem>
  );
}

const ChipsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
