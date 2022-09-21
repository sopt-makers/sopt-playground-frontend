import { FC } from 'react';
import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { colors } from '@/styles/colors';
import { copyToClipboard } from '@/utils';
import { Toast } from '@/components/projects/upload/types';

interface ProjectSignupLinkProps {
  setToast: (toast: Toast) => void;
}

const ProjectSignupLink: FC<ProjectSignupLinkProps> = ({ setToast }) => {
  const copySignupLink = () =>
    copyToClipboard(
      '회원가입 링크',
      () => setToast({ isActive: true, message: '링크가 클립보드에 저장되었습니다' }),
      () => setToast({ isActive: true, message: '다시 시도해주세요' }),
    );

  return <StyledContainer onClick={copySignupLink}>회원가입 링크 복사</StyledContainer>;
};

export default ProjectSignupLink;

const StyledContainer = styled(Text)`
  cursor: pointer;
  text-decoration: underline;
  color: ${colors.gray100};

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;
