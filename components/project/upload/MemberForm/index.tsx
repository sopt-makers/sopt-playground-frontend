import styled from '@emotion/styled';
import { FC } from 'react';
import { Member } from '@/components/project/upload/MemberForm/useMemberForm';
import MemberFormItem from '@/components/project/upload/MemberForm/MemberFormItem';
import { textStyles } from '@/styles/typography';
import { colors } from '@/styles/colors';

interface MemeberFormProps {
  members: Member[];
  onCreate: () => void;
  onDelete: (memberKey: number) => void;
  onChange: (member: Member) => void;
}

const MemberForm: FC<MemeberFormProps> = ({ members, onCreate, onDelete, onChange }) => {
  return (
    <Container>
      {members.map((member) => (
        <MemberFormItem key={member.key} member={member} onDelete={onDelete} onChange={onChange} />
      ))}
      <MemberAddButton onClick={onCreate}>+ 추가</MemberAddButton>
    </Container>
  );
};

export default MemberForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MemberAddButton = styled.button`
  align-self: start;
  margin: 18px 20px;
  cursor: pointer;
  color: ${colors.gray100};

  ${textStyles.SUIT_16_M};
`;
