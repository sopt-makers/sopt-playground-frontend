import Checkbox from '@/components/common/Checkbox';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';
import { ProjectUploadForm } from '@/components/project/upload/constants';
import FormItem from '@/components/project/upload/FormItem';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

const DATE_PATTERN = /^d{4}.(0[1-9]|1[0-2])/;

const FormDateTerm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ProjectUploadForm>();

  return (
    <FormItem title='프로젝트 기간' essential>
      <Content>
        <DateFormWrapper>
          <Input
            placeholder='YYYY.MM'
            {...register('termDate.dateFrom', {
              pattern: DATE_PATTERN,
            })}
          />
          {errors.termDate?.dateFrom && <Text type='error'>{errors.termDate?.dateFrom?.message}</Text>}
        </DateFormWrapper>
        <StyledText>{'-'}</StyledText>
        <DateFormWrapper>
          <Input
            placeholder='YYYY.MM'
            {...register('termDate.dateTo', {
              pattern: DATE_PATTERN,
            })}
          />
          {errors.termDate?.dateTo && <Text type='error'>{errors.termDate?.dateTo?.message}</Text>}
        </DateFormWrapper>
      </Content>
      <CheckboxWrapper>
        <Controller
          name='termDate.isOngoing'
          control={control}
          render={({ field: { value, ...props } }) => <Checkbox checked={value} {...props} />}
        />
        <Text typography='SUIT_12_M' color={colors.gray100}>
          진행중
        </Text>
      </CheckboxWrapper>
    </FormItem>
  );
};

export default FormDateTerm;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const DateFormWrapper = styled.div`
  & > input {
    width: 163px;
  }
`;

const StyledText = styled(Text)`
  margin: 0 11px;
  color: ${colors.gray100};
  ${textStyles.SUIT_16_M};
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 13.25px 0 0;

  & > span {
    margin: 0 0 0 9.25px;
  }
`;
