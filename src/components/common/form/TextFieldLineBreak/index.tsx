import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { TextArea } from '@sopt-makers/ui';

interface TextFieldLineBreakProps {
  value: string;
  maxLength: number;
  fixedHeight: number;
  lineBreakPlaceholder: string[];
  isError?: boolean;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextFieldLineBreak({
  value,
  maxLength,
  fixedHeight,
  lineBreakPlaceholder,
  isError = false,
  errorMessage,
  onChange,
}: TextFieldLineBreakProps) {
  return (
    <TextAreaWrapper>
      <TextArea
        value={value}
        maxLength={maxLength}
        fixedHeight={fixedHeight}
        maxHeight={fixedHeight}
        isError={isError}
        errorMessage={errorMessage}
        onChange={onChange}
      />
      {!value && (
        <Placeholder>
          <p>ex.</p>
          {lineBreakPlaceholder.map((placeholder) => {
            return <p key={placeholder}>{placeholder}</p>;
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
  right: 16px;
  bottom: 8px;
  left: 16px;
  white-space: pre-wrap;
  color: ${colors.gray300};
  pointer-events: none;

  ${fonts.BODY_16_M}
`;
