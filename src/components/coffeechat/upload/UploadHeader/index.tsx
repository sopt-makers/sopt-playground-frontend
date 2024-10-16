import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Callout } from '@sopt-makers/ui';

import { COFFEECHAT_MOBILE_MEDIA_QUERY } from '@/components/coffeechat/mediaQuery';

interface UploadHeaderProp {
  uploadType: string;
}

export default function UploadHeader({ uploadType }: UploadHeaderProp) {
  return (
    <header>
      <Title>커피챗 {uploadType}</Title>
      <Callout type='information'>커피챗 오픈에 필요한 필수 항목이 모두 입력 되었는지 꼼꼼하게 확인해주세요!</Callout>
    </header>
  );
}

const Title = styled.h1`
  margin-bottom: 20px;
  color: ${colors.gray10};
  ${fonts.HEADING_32_B};

  @media ${COFFEECHAT_MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_24_B};
  }
`;
