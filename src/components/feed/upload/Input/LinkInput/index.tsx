import styled from '@emotion/styled';
import { TextField } from '@sopt-makers/ui';
import { ChangeEvent } from 'react';

interface UrlInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | null;
  isError: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const UrlInput = ({ onChange, value, isError, onKeyDown }: UrlInputProps) => {
  return (
    <StyledTextField
      errorMessage='올바른 링크를 입력해 주세요'
      labelText='아티클 링크'
      placeholder='ex. https://playground.sopt.org'
      required
      onChange={onChange}
      value={value ?? ''}
      isError={isError}
      onKeyDown={onKeyDown}
    />
  );
};

const StyledTextField = styled(TextField)<{ isError: boolean }>`
  margin-bottom: ${({ isError }) => (isError ? 0 : '24px')};
  width: 100%;
`;

export default UrlInput;
