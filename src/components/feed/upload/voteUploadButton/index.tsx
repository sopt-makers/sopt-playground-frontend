import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconCheckSquare } from '@sopt-makers/icons';

import { textStyles } from '@/styles/typography';

interface VoteUploadButtonProps {
  onClick: () => void;
}

export default function VoteUploadButton({ onClick }: VoteUploadButtonProps) {
  return (
    <Button type='button' onClick={onClick}>
      <StyledIconCheckSquare />
      투표
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  gap: 5px;
  align-items: center;
  border-radius: 21px;
  background-color: ${colors.gray700};
  padding: 6px 12px;
  color: ${colors.gray10};
  ${textStyles.SUIT_13_M};

  &:hover {
    background-color: ${colors.gray600};
  }

  &:active {
    background-color: ${colors.gray500};
  }
`;

const StyledIconCheckSquare = styled(IconCheckSquare)`
  width: 16px;
  height: 16px;
`;
