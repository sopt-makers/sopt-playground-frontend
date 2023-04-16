import styled from '@emotion/styled';
import { omit } from 'lodash-es';
import { FC } from 'react';

import { getMembersSearchByName } from '@/api/members';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import MemberSearch from '@/components/projects/form/fields/member/MemberSearch';
import { MemberSearchContext } from '@/components/projects/form/fields/member/MemberSearchContext';
import { MemberRoleInfo } from '@/components/projects/upload/MemberForm/constants';
import IconTrash from '@/public/icons/icon-trash.svg';

export type Value = {
  memberId: number | undefined;
  memberRole: string | undefined;
  memberDescription: string | undefined;
};

interface MemberFieldProps {
  className?: string;
  value: Value;
  onChange: (value: Value) => void;
  onRemove: () => void;
  // TODO: Error 추가
}

const MemberField: FC<MemberFieldProps> = ({ className, value, onChange, onRemove }) => {
  const searchMember = async (name: string) => {
    const members = await getMembersSearchByName(name);
    return members.map((member) => omit(member, 'hasProfile'));
  };

  return (
    <StyledMemberField className={className}>
      <MemberSearchContext.Provider
        value={{
          searchMember,
          // TODO: 실제 API로 변경
          getMemberById: async () => {
            return new Promise((resolve, reject) => {
              resolve({ id: 3, generation: 30, name: '이준호', profileImage: '' });
              reject(undefined);
            });
          },
        }}
      >
        <MemberSearch placeholder='SOPT 멤버 검색' value={value} onChange={onChange} />
      </MemberSearchContext.Provider>
      <Select
        placeholder='역할'
        value={value.memberRole ?? ''}
        onChange={(e) => onChange({ ...value, memberRole: e.target.value })}
      >
        {Object.entries(MemberRoleInfo).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      <Input
        placeholder='어떤 역할을 맡았는지 적어주세요.'
        value={value.memberDescription}
        onChange={(e) =>
          onChange({
            ...value,
            memberDescription: e.target.value,
          })
        }
      />
      <IconDeleteWrapper>
        <IconTrash onClick={onRemove} />
      </IconDeleteWrapper>
    </StyledMemberField>
  );
};

export default MemberField;

const StyledMemberField = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const IconDeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 42px;
  min-height: 42px;
`;
