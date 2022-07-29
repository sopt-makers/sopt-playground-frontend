import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import TextArea from '@/components/common/TextArea';
import FormTitle from '@/components/project/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/project/upload';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const ProjectDetail: FC = () => {
  const { control } = useFormContext<ProjectUploadForm>();

  return (
    <StyledContaeinr>
      <FormTitle essential>프로젝트 설명</FormTitle>
      <RHFControllerFormItem
        css={css`
          margin: 14px 0 0;
          min-height: 170px;
        `}
        control={control}
        name='detail'
        component={StyledTextArea}
        count
        maxCount={500}
        placeholder='프로젝트에 대해 설명해주세요'
      />
    </StyledContaeinr>
  );
};

export default ProjectDetail;

const StyledContaeinr = styled.section`
  margin: 84px 0 0;
`;

const StyledTextArea = styled(TextArea)`
  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M};
  }
`;
