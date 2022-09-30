import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import Checkbox from '@/components/common/Checkbox';
import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';
import FormTitle from '@/components/projects/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/projects/upload';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const ProjectPeriod = () => {
  const {
    control,
    resetField,
    formState: { errors },
  } = useFormContext<ProjectUploadForm>();
  const { period } = useWatch<ProjectUploadForm>({
    control,
  });

  useEffect(() => {
    resetField('period.endAt');
  }, [resetField, period?.isOngoing]);

  return (
    <StyledContainer>
      <FormTitle essential>프로젝트 기간</FormTitle>
      <StyledContent>
        <DateFormWrapper>
          <RHFControllerFormItem
            style={{ width: '163px' }}
            error={!!errors.period?.startAt}
            errorMessage={errors.period?.startAt?.message}
            control={control}
            name='period.startAt'
            component={Input}
            placeholder='YYYY.MM'
          />
        </DateFormWrapper>
        {!period?.isOngoing && (
          <StyledEndAtWrapper>
            <StyledText>{'-'}</StyledText>
            <DateFormWrapper>
              <RHFControllerFormItem
                style={{ width: '163px' }}
                error={!!errors.period?.endAt}
                errorMessage={errors.period?.endAt?.message}
                control={control}
                name='period.endAt'
                component={Input}
                placeholder='YYYY.MM'
              />
            </DateFormWrapper>
          </StyledEndAtWrapper>
        )}
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
  align-items: flex-start;
  margin: 20px 0 0;
`;

const DateFormWrapper = styled.div`
  & > input {
    width: 163px;
    @media ${MOBILE_MEDIA_QUERY} {
      width: 100%;
      ${textStyles.SUIT_14_M}
    }
  }
`;

const StyledEndAtWrapper = styled.div`
  display: flex;
  align-items: center;
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
