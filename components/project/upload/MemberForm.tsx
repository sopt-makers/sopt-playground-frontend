import styled from '@emotion/styled';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { FC } from 'react';
import IconDelete from '@/public/icons/icon-delete.svg';

interface MemeberFormProps {
  onChange?: () => void;
  onDelete?: () => void;
}

const MemberForm: FC<MemeberFormProps> = ({ onChange, onDelete }) => {
  return (
    <Container>
      <StyledMemberSearch placeholder='SOPT 멤버 검색' />
      <StyledSelect placeholder='역할'>
        <option value='역할1'>역할1</option>
        <option value='역할2'>역할2</option>
        <option value='역할3'>역할3</option>
        <option value='역할4'>역할4</option>
        <option value='역할5'>역할5</option>
      </StyledSelect>
      <Input placeholder='어떤 역할을 맡았는지 적어주세요' />
      <IconDeleteWrapper>
        <IconDelete />
      </IconDeleteWrapper>
    </Container>
  );
};

export default MemberForm;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledMemberSearch = styled(Input)`
  width: 163px;
`;

const StyledSelect = styled(Select)`
  margin: 0 10px;
`;

const IconDeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 14px 0 4px;
  cursor: pointer;
  min-width: 42px;
  min-height: 42px;
`;
