import styled from '@emotion/styled';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import Switch from '@/components/common/Switch';
import Text from '@/components/common/Text';
import FormTitle from '@/components/projects/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/projects/upload';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

const ProjectStatus: FC = () => {
  const { register } = useFormContext<ProjectUploadForm>();
  return (
    <StyledContainer>
      <FormTitle>프로젝트 현재 상태</FormTitle>
      <StyledWrapper>
        <StyledSubTitle>현재 이 서비스를 이용할 수 있나요?</StyledSubTitle>
        <Switch {...register('status.isAvailable')} />
      </StyledWrapper>
      <StyledWrapper>
        <StyledSubTitle>현재 이 프로젝트로 창업을 진행하고 있나요?</StyledSubTitle>
        <Switch {...register('status.isFounding')} />
      </StyledWrapper>
    </StyledContainer>
  );
};

export default ProjectStatus;

const StyledContainer = styled.section`
  margin: 60px 0 0;
`;

const StyledSubTitle = styled(Text)`
  color: ${colors.gray100};
  ${textStyles.SUIT_14_M};
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 18px 0 0;

  & > label {
    margin-left: 8px;
  }
`;
