import styled from '@emotion/styled';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import Input from '@/components/common/Input';
import FormTitle from '@/components/projects/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/projects/upload/legacy';
import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const ProjectName: FC = () => {
  const { control } = useFormContext<ProjectUploadForm>();
  return (
    <>
      <FormTitle typography='SUIT_24_SB'>프로젝트</FormTitle>
      <StyledDivider />
      <FormTitle essential>프로젝트 이름</FormTitle>
      <RHFControllerFormItem name='name' control={control} component={StyledInput} placeholder='프로젝트' />
    </>
  );
};

export default ProjectName;

const StyledDivider = styled.hr`
  margin: 36px 0 28px;
  border: none;
  background-color: ${legacyColors.black60};
  width: 100%;
  height: 1.5px;
`;

const StyledInput = styled(Input)`
  margin-top: 9px;
  width: 340px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    max-width: 340px;
  }
`;
