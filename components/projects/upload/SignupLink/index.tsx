import { FC, useContext } from 'react';
import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { colors } from '@/styles/colors';
import { copyToClipboard } from '@/utils';
import { ToastContext } from '@/components/projects/upload/ToastProvider/context';

const SignupLink: FC = () => {
  const { showToast } = useContext(ToastContext);
  const onCopy = () =>
    copyToClipboard(
      '회원가입 링크',
      () => showToast('링크가 클립보드에 저장되었습니다'),
      () => showToast('다시 시도해주세요'),
    );

  return <StyledContainer onClick={onCopy}>회원가입 링크 복사</StyledContainer>;
};

export default SignupLink;

const StyledContainer = styled(Text)`
  cursor: pointer;
  text-decoration: underline;
  color: ${colors.gray100};

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;
