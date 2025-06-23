import styled from '@emotion/styled';
import { TextArea } from '@sopt-makers/ui';

import { MAX_LENGTH } from '@/components/feed/upload/voteModal/constants';
import IconTrash from '@/public/icons/icon-trash-filled.svg';

interface VoteTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  isRemovable: boolean;
  onRemove: () => void;
}

const VoteTextArea = ({ value, onChange, isRemovable, onRemove }: VoteTextAreaProps) => {
  const isOverMaxLength = value.length > MAX_LENGTH;
  return (
    <StyledVoteTextArea>
      <StyledTextArea
        placeholder='응답을 입력해 주세요'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        isError={isOverMaxLength}
        errorMessage='최대 40자까지만 입력할 수 있어요'
        maxHeight={52}
      />
      {isRemovable && (
        <TrashButton type='button' onClick={onRemove}>
          <StyledIconTrash />
        </TrashButton>
      )}
    </StyledVoteTextArea>
  );
};

export default VoteTextArea;

const StyledVoteTextArea = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;

const StyledTextArea = styled(TextArea)`
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
