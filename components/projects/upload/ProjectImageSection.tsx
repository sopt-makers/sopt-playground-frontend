// presigned-url https://allardqjy.medium.com/using-pre-signed-urls-to-upload-files-to-amazon-s3-from-reactjs-5b15c94b66df
import styled from '@emotion/styled';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import ImageUploader from '@/components/common/ImageUploader';
import Text from '@/components/common/Text';
import FormTitle from '@/components/projects/upload/FormTitle';
import useScreenSize from '@/hooks/useScreenSize';
import { ProjectUploadForm } from '@/pages/projects/upload';
import { colors } from '@/styles/colors';

const ProjectImageSection: FC = () => {
  const { control } = useFormContext<ProjectUploadForm>();
  const { isMobile } = useScreenSize();

  return (
    <StyledContainer>
      <FormTitle essential>로고 이미지</FormTitle>
      <StyledDescription>가로 300px 세로 300px 권장합니다. 예외 규격은 잘릴 수 있습니다.</StyledDescription>
      <Controller name='logoImage' control={control} render={({ field }) => <ImageUploader {...field} />} />
      <StyledTitle essential>썸네일 이미지</StyledTitle>
      <StyledDescription>
        16:9 비율로 가로 368px 세로208px을 권장합니다.{isMobile && <p>웹페이지에서 등록을 권장합니다.</p>}
      </StyledDescription>
      <Controller
        name='thumbnailImage'
        control={control}
        render={({ field }) => <ImageUploader width={isMobile ? '100%' : 368} height={208} {...field} />}
      />
      <StyledTitle>프로젝트 이미지</StyledTitle>
      <StyledDescription>
        10MB 이내로 가로 1200px, 세로는 675px 사이즈로 제작해주세요.{' '}
        {isMobile && <span>웹페이지에서 등록을 권장합니다.</span>}
      </StyledDescription>
      <Controller
        name='projectImage'
        control={control}
        render={({ field }) => <ImageUploader width={isMobile ? '100%' : 368} height={208} {...field} />}
      />
    </StyledContainer>
  );
};

export default ProjectImageSection;

const StyledContainer = styled.section`
  margin: 84px 0 0;
`;

const StyledDescription = styled(Text)`
  display: block;
  margin: 12px 0 18px;
  color: ${colors.gray100};
`;

const StyledTitle = styled(FormTitle)`
  margin: 60px 0 0;
`;
