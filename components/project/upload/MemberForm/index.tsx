import styled from '@emotion/styled';
import { FC } from 'react';
import { Member } from '@/components/project/upload/MemberForm/useMemberForm';
import MemberFormItem from '@/components/project/upload/MemberForm/MemberFormItem';
import { textStyles } from '@/styles/typography';
import { colors } from '@/styles/colors';

export interface MemeberFormProps {
  members: Member[];
  onClickAdd: () => void;
  onChange: (member: Member) => void;
  onDelete: (memberKey: number) => void;
}

const MemberForm: FC<MemeberFormProps> = ({ members, onClickAdd, onChange, onDelete }) => {
  return (
    <Container>
      {members.map((member) => (
        <MemberFormItem key={member.key} member={member} onChange={onChange} onDelete={onDelete} />
      ))}
      <MemberAddButton onClick={onClickAdd}>+ 추가</MemberAddButton>
    </Container>
  );
};

export default MemberForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-top: 10px;
  }
`;

const MemberAddButton = styled.button`
  align-self: start;
  margin: 8px 0 0 20px;
  cursor: pointer;
  color: ${colors.gray100};

  ${textStyles.SUIT_16_M};
`;
