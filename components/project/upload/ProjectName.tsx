import FormItem from '@/components/common/form/FormItem';
import Input from '@/components/common/Input';
import FormTitle from '@/components/project/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/project/upload';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

const ProjectName: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProjectUploadForm>();
  return (
    <>
      <FormTitle typography='SUIT_24_SB'>프로젝트</FormTitle>
      <StyledDivider />
      <FormTitle essential>프로젝트 이름</FormTitle>
      <FormItem errorMessage={errors.name?.message}>
        <StyledInput placeholder='프로젝트' error={!!errors.name} {...register('name')} />
      </FormItem>
    </>
  );
};

export default ProjectName;

const StyledDivider = styled.hr`
  margin: 36px 0 28px;
  border: none;
  background-color: ${colors.black60};
  width: 100%;
  height: 1.5px;
`;

const StyledInput = styled(Input)`
  margin-top: 9px;
  width: 340px;
`;
