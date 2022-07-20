import Switch from '@/components/common/Switch';
import Text from '@/components/common/Text';
import FormTitle from '@/components/project/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/project/upload';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

const ProjectStatus: FC = () => {
  const { register } = useFormContext<ProjectUploadForm>();
  return (
    <StyledContainer>
      <FormTitle essential>프로젝트 현재 상태</FormTitle>
      <StyledWrapper>
        <Switch {...register('status.isAvailable')} />
        <StyledSubTitle>현재 이 서비스를 이용할 수 있나요?</StyledSubTitle>
      </StyledWrapper>
      <StyledWrapper>
        <Switch {...register('status.isFounding')} />
        <StyledSubTitle>현재 이 프로젝트로 창업을 진행하고 있나요?</StyledSubTitle>
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

  & > span {
    margin-left: 8px;
  }
`;
