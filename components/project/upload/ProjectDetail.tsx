import TextArea from '@/components/common/TextArea';
import FormTitle from '@/components/project/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/project/upload';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

const ProjectDetail: FC = () => {
  const { register } = useFormContext<ProjectUploadForm>();

  return (
    <StyledContaeinr>
      <FormTitle essential>프로젝트 설명</FormTitle>
      <StyledTextArea placeholder='프로젝트에 대해 설명해주세요' {...register('detail')} />
    </StyledContaeinr>
  );
};

export default ProjectDetail;

const StyledContaeinr = styled.section`
  margin: 84px 0 0;
`;

const StyledTextArea = styled(TextArea)`
  margin: 14px 0 0;
  min-height: 170px;
`;
