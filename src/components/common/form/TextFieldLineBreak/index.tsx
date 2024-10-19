import styled from '@emotion/styled';
import { fonts } from '@sopt-makers/fonts';
import { TextArea } from '@sopt-makers/ui';

interface TextFieldLineBreakProps {
  value: string;
  maxLength: number;
  fixedHeight: number;
  lineBreakPlaceholder: string[];
  isError?: boolean;
  errorMessage?: string;
}

export default function TextFieldLineBreak({
  value,
  maxLength,
  fixedHeight,
  lineBreakPlaceholder,
  isError = false,
  errorMessage,
}: TextFieldLineBreakProps) {
  return (
    <TextAreaWrapper>
      <TextArea
        value={value}
        maxLength={maxLength}
        fixedHeight={fixedHeight}
        isError={isError}
        errorMessage={errorMessage}
      />
      {!value && (
        <Placeholder>
          <p>ex.</p>
          {lineBreakPlaceholder.map((placeholder) => {
            return <p>{placeholder}</p>;
          })}
        </Placeholder>
      )}
    </TextAreaWrapper>
  );
}

const TextAreaWrapper = styled.div`
  position: relative;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 8px;
  left: 16px;
  color: #aaa;
  pointer-events: none;
  white-space: pre-wrap; /* 줄바꿈 인식 */

  ${fonts.BODY_16_M}
`;
