import styled from '@emotion/styled';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import ImageUploader from '@/components/common/ImageUploader';
import Text from '@/components/common/Text';
import FormTitle from '@/components/projects/upload/FormTitle';
import { ProjectUploadForm } from '@/pages/projects/upload';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const ProjectImageSection: FC = () => {
  const { control } = useFormContext<ProjectUploadForm>();

  return (
    <StyledContainer>
      <FormTitle essential>로고 이미지</FormTitle>
      <StyledDescription>가로 300px 세로 300px 권장합니다. 예외 규격은 잘릴 수 있습니다.</StyledDescription>
      <Controller name='logoImage' control={control} render={({ field }) => <StyledLogoImageUploader {...field} />} />
      <StyledTitle essential>썸네일 이미지</StyledTitle>
      <StyledDescription>
        16:9 비율로 가로 368px 세로208px을 권장합니다.
        <MobileDescription>웹페이지에서 등록을 권장합니다.</MobileDescription>
      </StyledDescription>
      <Controller name='thumbnailImage' control={control} render={({ field }) => <StyledImageUploaer {...field} />} />
      <StyledTitle>프로젝트 이미지</StyledTitle>
      <StyledDescription>
        10MB 이내로 가로 1200px, 세로는 675px 사이즈로 제작해주세요.{' '}
        <MobileDescription>웹페이지에서 등록을 권장합니다.</MobileDescription>
      </StyledDescription>
      <Controller name='projectImage' control={control} render={({ field }) => <StyledImageUploaer {...field} />} />
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

const MobileDescription = styled.p`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
  }
`;

const StyledLogoImageUploader = styled(ImageUploader)`
  width: 104px;
  height: 104px;
`;

const StyledImageUploaer = styled(ImageUploader)`
  width: 369px;
  height: 208px;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    max-width: 369px;
  }
`;
