import styled from '@emotion/styled';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { ChangeEvent, FC } from 'react';
import IconDelete from '@/public/icons/icon-delete.svg';
import { Member } from '@/components/project/upload/MemberForm/useMemberForm';
import { useForm } from 'react-hook-form';
import { MemeberFormProps } from '@/components/project/upload/MemberForm';

type MemberForm = Omit<Member, 'key'>;

interface MemberFormItemProps extends Omit<MemeberFormProps, 'members' | 'onClickAdd'> {
  member: Member;
}

const MemberFormItem: FC<MemberFormItemProps> = ({ member, onChange, onDelete }) => {
  const { register } = useForm<MemberForm>();

  const _onChange = (e: ChangeEvent<any>, key: keyof MemberForm) => {
    onChange({
      ...member,
      [key]: e.target.value,
    });
  };

  return (
    <Container>
      <StyledMemberSearch
        placeholder='SOPT 멤버 검색'
        {...register('memberId', {
          onChange: (e) => _onChange(e, 'memberId'),
        })}
      />
      <StyledSelect
        placeholder='역할'
        {...register('role', {
          onChange: (e) => _onChange(e, 'role'),
        })}
      >
        <option value='역할1'>역할1</option>
        <option value='역할2'>역할2</option>
        <option value='역할3'>역할3</option>
        <option value='역할4'>역할4</option>
        <option value='역할5'>역할5</option>
      </StyledSelect>
      <Input
        placeholder='어떤 역할을 맡았는지 적어주세요'
        {...register('description', {
          onChange: (e) => _onChange(e, 'description'),
        })}
      />
      <IconDeleteWrapper>
        <IconDelete onClick={() => onDelete(member.key)} />
      </IconDeleteWrapper>
    </Container>
  );
};

export default MemberFormItem;

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
