import Checkbox from '@/components/common/Checkbox';
import FormItem from '@/components/common/form/FormItem';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';

import FormTitle from '@/components/project/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/project/upload';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

const DATE_PATTERN = /^d{4}.(0[1-9]|1[0-2])/;

const ProjectPeriod = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ProjectUploadForm>();

  return (
    <StyledContainer>
      <FormTitle essential>프로젝트 기간</FormTitle>
      <StyledContent>
        <DateFormWrapper>
          <FormItem errorMessage={errors.period?.startAt?.message}>
            <Input
              placeholder='YYYY.MM'
              error={!!errors.period?.startAt}
              {...register('period.startAt', {
                pattern: DATE_PATTERN,
              })}
            />
          </FormItem>
        </DateFormWrapper>
        <StyledText>{'-'}</StyledText>
        <DateFormWrapper>
          <FormItem errorMessage={errors.period?.endAt?.message}>
            <Input
              error={!!errors.period?.endAt?.message}
              placeholder='YYYY.MM'
              {...register('period.endAt', {
                pattern: DATE_PATTERN,
              })}
            />
          </FormItem>
        </DateFormWrapper>
      </StyledContent>
      <CheckboxWrapper>
        <Controller
          name='period.isOngoing'
          control={control}
          render={({ field: { value, ...props } }) => <Checkbox checked={value} {...props} />}
        />
        <Text typography='SUIT_12_M' color={colors.gray100}>
          진행중
        </Text>
      </CheckboxWrapper>
    </StyledContainer>
  );
};

export default ProjectPeriod;

const StyledContainer = styled.section`
  margin: 60px 0 0;
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 0;
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
