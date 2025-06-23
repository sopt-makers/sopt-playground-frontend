import styled from '@emotion/styled';
import { TextField } from '@sopt-makers/ui';

import { MAX_LENGTH } from '@/components/feed/upload/voteModal/constants';
import IconTrash from '@/public/icons/icon-trash-filled.svg';

interface VoteTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  isRemovable: boolean;
  onRemove: () => void;
}

const VoteTextField = ({ value, onChange, isRemovable, onRemove }: VoteTextFieldProps) => {
  const isOverMaxLength = value.length > MAX_LENGTH;
  return (
    <StyledVoteTextField>
      <StyledTextField
        placeholder='응답을 입력해 주세요'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        isError={isOverMaxLength}
        errorMessage='최대 40자까지만 입력할 수 있어요'
      />
      {isRemovable && (
        <TrashButton type='button' onClick={onRemove}>
          <StyledIconTrash />
        </TrashButton>
      )}
    </StyledVoteTextField>
  );
};

export default VoteTextField;

const StyledVoteTextField = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const TrashButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
`;

const StyledIconTrash = styled(IconTrash)`
  width: 28px;
  height: 28px;
`;
