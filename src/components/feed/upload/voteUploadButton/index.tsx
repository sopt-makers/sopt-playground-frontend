import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconCheckSquare } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';

interface VoteUploadButtonProps {
  onClick: () => void;
  isDisabled: boolean;
}

export default function VoteUploadButton({ onClick, isDisabled }: VoteUploadButtonProps) {
  return (
    <StyledButton type='button' onClick={onClick} LeftIcon={IconCheckSquare} size='sm' disabled={isDisabled}>
      투표
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  border-radius: 21px;
  background-color: ${colors.gray700};
  padding: 6px 12px;
  color: ${colors.gray10};
  ${fonts.BODY_13_M};

  &:not(:disabled):hover {
    background-color: ${colors.gray600};
    color: ${colors.white};
  }

  &:not(:disabled):active {
    background-color: ${colors.gray500};
  }
`;
