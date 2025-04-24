import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const Warning =
  '타인을 비난하거나 욕설, 차별하는 글 작성 시 이용 제재 및 내부 절차에 따라 익명을 식별하여 징계위원회를 열 수 있습니다.';

export default function BlindWriterWarning() {
  return (
    <WarningBoxWrapper>
      <WarningBox>{Warning}</WarningBox>
    </WarningBoxWrapper>
  );
}

const WarningBox = styled.article`
  display: flex;
  align-items: center;
  border: 1px solid rgb(240 66 81 / 50%);
  border-radius: 10px;
  background: rgb(240 66 81 / 10%);
  padding: 14px 18px;

  ${textStyles.SUIT_13_M};

  width: 100%;
  max-width: 358px;
  color: ${colors.gray30};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 24px;
  }
`;

const WarningBoxWrapper = styled.section`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: center;
  }
`;
