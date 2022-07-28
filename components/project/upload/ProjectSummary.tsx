import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import Input from '@/components/common/Input';
import FormTitle from '@/components/project/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/project/upload';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

const ProjectSummary: FC = () => {
  const { control } = useFormContext<ProjectUploadForm>();
  return (
    <StyledContainer>
      <FormTitle essential>프로젝트 한줄 소개</FormTitle>
      <RHFControllerFormItem
        css={css`
          margin: 20px 0 0;
        `}
        control={control}
        name='summary'
        component={StyledInput}
        count
        maxCount={30}
        placeholder='프로젝트 한줄 소개'
      />
    </StyledContainer>
  );
};

export default ProjectSummary;

const StyledContainer = styled.section`
  margin: 60px 0 0;
`;

const StyledInput = styled(Input)`
  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }
`;
