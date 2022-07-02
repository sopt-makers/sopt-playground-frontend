import Input from '@/components/common/Input';
import FormTitle from '@/components/project/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/project/upload';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

const ProjectSummary: FC = () => {
  const { register } = useFormContext<ProjectUploadForm>();
  return (
    <StyledContainer>
      <FormTitle essential>프로젝트 한줄 소개</FormTitle>
      <StyledInput count maxCount={30} placeholder='프로젝트 한줄 소개' {...register('summary')} />
    </StyledContainer>
  );
};

export default ProjectSummary;

const StyledContainer = styled.section`
  margin: 60px 0 0;
`;

const StyledInput = styled(Input)`
  margin: 20px 0 0;
`;
