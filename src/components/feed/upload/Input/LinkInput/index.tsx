import styled from '@emotion/styled';
import { TextField } from '@sopt-makers/ui';
import { ChangeEvent, KeyboardEvent } from 'react';

interface LinkInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | null;
  isError: boolean;
}

const LinkInput = ({ onChange, value, isError }: LinkInputProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <StyledTextField
      errorMessage='올바른 링크를 입력해 주세요'
      labelText='아티클 링크'
      placeholder='ex. https://playground.sopt.org'
      required
      onChange={onChange}
      value={value ?? ''}
      isError={isError}
      onKeyDown={handleKeyDown}
    />
  );
};

const StyledTextField = styled(TextField)<{ isError: boolean }>`
  margin-bottom: ${({ isError }) => (isError ? 0 : '24px')};
  width: 100%;
`;

export default LinkInput;
