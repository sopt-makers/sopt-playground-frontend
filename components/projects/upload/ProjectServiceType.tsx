import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useFormContext, useWatch } from 'react-hook-form';

import FormItem from '@/components/common/form/FormItem';
import FormTitle from '@/components/projects/upload/FormTitle';
import { ServiceType } from '@/components/projects/upload/types';
import { ProjectUploadForm } from '@/pages/projects/upload';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const ProjectServiceType = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<ProjectUploadForm>();
  const { serviceType } = useWatch({ control });

  return (
    <StyledContainer>
      <FormTitle essential description='복수 선택 가능'>
        서비스 형태
      </FormTitle>
      <FormItem errorMessage={errors.serviceType?.message}>
        <StyledContent>
          <StyledLabel checked={serviceType?.includes(ServiceType.WEB)}>
            <input type='checkbox' value={ServiceType.WEB} {...register('serviceType')} />
            <span>웹</span>
          </StyledLabel>
          <StyledLabel checked={serviceType?.includes(ServiceType.APP)}>
            <input type='checkbox' value={ServiceType.APP} {...register('serviceType')} />
            <span>앱</span>
          </StyledLabel>
        </StyledContent>
      </FormItem>
    </StyledContainer>
  );
};

export default ProjectServiceType;

const StyledContainer = styled.section`
  margin-top: 60px;
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 0;

  & > :last-child {
    margin: 0 0 0 10px;
  }
`;

const StyledLabel = styled.label<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, color 0.2s;
  border-radius: 100px;
  background-color: ${colors.black60};
  cursor: pointer;
  padding: 14px 0;
  width: 163px;
  height: 42px;
  color: ${colors.gray100};

  ${({ checked }) =>
    checked &&
    css`
      background-color: ${colors.purple100};
      color: ${colors.white};
    `}
  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 158px;
  }
`;
