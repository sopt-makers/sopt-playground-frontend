import styled from '@emotion/styled';
import { FC } from 'react';

import Text from '@/components/common/Text';
import useToast from '@/components/common/Toast/useToast';
import { ORIGIN } from '@/constants/env';
import { colors } from '@sopt-makers/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { copyToClipboard } from '@/utils';

const SignUpLink: FC = () => {
  const toast = useToast();
  const onCopy = () =>
    copyToClipboard(`${ORIGIN}/auth/verify`, {
      onSuccess: () => toast.show({ title: '링크 복사 완료', message: '링크가 클립보드에 저장되었습니다' }),
      onError: () => toast.show({ message: '다시 시도해주세요' }),
    });

  return <StyledContainer onClick={onCopy}>회원가입 링크 복사</StyledContainer>;
};

export default SignUpLink;

const StyledContainer = styled(Text)`
  cursor: pointer;
  text-decoration: underline;
  color: ${colors.gray100};

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;
