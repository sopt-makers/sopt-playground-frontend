import styled from '@emotion/styled';
import { Chip } from '@sopt-makers/ui';
import { Controller, useFormContext } from 'react-hook-form';

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

  return (
    <FormItem errorMessage={errorMessage}>
      <Controller
        name={field}
        control={control}
        render={({ field }) => (
          <ChipsWrapper>
            {chipList.map((chip) => (
              <div
                key={chip}
                onClick={() => {
                  if (isSingleSelect) {
                    field.onChange([chip]);
                  } else {
                    const newValue =
                      Array.isArray(field.value) && field.value.includes(chip)
                        ? field.value.filter((item) => item !== chip) // 이미 선택된 경우 제거
                        : [...(Array.isArray(field.value) ? field.value : []), chip]; // 복수 선택 모드일 경우 추가

                    field.onChange(newValue); // 배열 업데이트
                  }
                }}
              >
                <Responsive only='desktop'>
                  <Chip size='sm' active={Array.isArray(field.value) && field.value.includes(chip)}>
                    {chip}
                  </Chip>
                </Responsive>
                <Responsive only='mobile'>
                  <Chip size='md' active={Array.isArray(field.value) && field.value.includes(chip)}>
                    {chip}
                  </Chip>
                </Responsive>
              </div>
            ))}
          </ChipsWrapper>
        )}
      />

      {/* {chipList.map((chip) => {
          return (
            <div key={chip}>
              <Responsive only='desktop'>
                <Chip size='sm' active={true}>
                  {chip}
                </Chip>
              </Responsive>
              <Responsive only='mobile'>
                <Chip size='md' active={true}>
                  {chip}
                </Chip>
              </Responsive>
            </div>
          );
        })} */}
      {/* <Controller
          name={key}
          control={control}
          render={({ field }) => (
            <div>
              {chipList.map((chip) => (
                <Chip size='sm' active={true} onClick={() => {
                  const newValue = field.value.includes(chip)
                    ? field.value.filter((item) => item !== chip) // 이미 선택된 경우 제거
                    : [...field.value, chip]; // 새로 선택된 경우 추가
                  field.onChange(newValue); // 배열 업데이트
                }}>
                {chip}
              </Chip>
             
              ))}
            </div>
          )}
        /> */}
    </FormItem>
  );
}

const ChipsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
