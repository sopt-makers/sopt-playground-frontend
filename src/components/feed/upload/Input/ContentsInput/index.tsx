import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import TextareaAutosize from 'react-textarea-autosize';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function ContentsInput() {
  const handleWriteContents = () => {
    // TODO: 콘텐츠 저장 로직 구현
  };

  return (
    <Contents placeholder='내용을 입력해주세요' maxLength={20000} spellCheck='false' onChange={handleWriteContents} />
  );
}

const Contents = styled(TextareaAutosize)`
  outline: none;
  background-color: transparent;
  width: 100%;
  resize: none;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  color: ${colors.gray10};

  ${textStyles.SUIT_16_R};

  ::placeholder {
    color: ${colors.gray600};
  }
  @media ${MOBILE_MEDIA_QUERY} {
    min-height: 80px;
  }
`;
