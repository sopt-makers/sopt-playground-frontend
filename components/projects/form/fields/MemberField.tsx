import styled from '@emotion/styled';
import { omit } from 'lodash-es';
import { FC, useState } from 'react';

import { getMembersSearchByName } from '@/api/members';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import MemberSearch from '@/components/projects/form/fields/member/MemberSearch';
import { Member, MemberSearchContext } from '@/components/projects/form/fields/member/MemberSearchContext';
import { MemberRoleInfo } from '@/components/projects/upload/MemberForm/constants';
import IconTrash from '@/public/icons/icon-trash.svg';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

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
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [selectedMember, setSelcetedMember] = useState<Member | undefined>();
  const searchMember = async (name: string) => {
    const members = await getMembersSearchByName(name);
    return members.map((member) => omit(member, 'hasProfile'));
  };

  const onSelectMember = (member: Member) => {
    onChange({
      ...value,
      memberId: Number(member.id),
    });
    setSelcetedMember(member);
  };

  const onClearMember = () => {
    onChange({
      ...value,
      memberId: undefined,
    });
    setSelcetedMember(undefined);
  };

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onClickEditComplete = () => {
    if (selectedMember === undefined) {
      // TODO: 필드 모두 채워주세요! 에러처리
      return;
    }
    setIsEdit(false);
  };

  return (
    <StyledMemberField className={className} onClick={onClickEdit}>
      {isEdit ? (
        <StyledMemberEditView>
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
            <MemberSearch
              selectedMember={selectedMember}
              placeholder='SOPT 멤버 검색'
              onSelect={onSelectMember}
              onClear={onClearMember}
            />
          </MemberSearchContext.Provider>
          <StyledSelect
            placeholder='역할'
            value={value.memberRole ?? ''}
            onChange={(e) => onChange({ ...value, memberRole: e.target.value })}
          >
            {Object.entries(MemberRoleInfo).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </StyledSelect>
          <StyledInput
            placeholder='어떤 역할을 맡았는지 적어주세요.'
            value={value.memberDescription}
            onChange={(e) =>
              onChange({
                ...value,
                memberDescription: e.target.value,
              })
            }
          />
          <StyledEditCompleteButton
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onClickEditComplete();
            }}
          >
            완료
          </StyledEditCompleteButton>
          <IconDeleteWrapper>
            <IconTrash onClick={onRemove} />
          </IconDeleteWrapper>
        </StyledMemberEditView>
      ) : (
        <StyledMemberView>
          <span className='name'>{selectedMember?.name}</span>
          <span>{value.memberRole}</span>
          <span>{value.memberDescription}</span>
        </StyledMemberView>
      )}
    </StyledMemberField>
  );
};

export default MemberField;

const StyledMemberField = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
`;

const StyledSelect = styled(Select)`
  border: 1px solid ${colors.black40};
  border-radius: 6px;
`;

const StyledInput = styled(Input)`
  flex: 1 1 330px;
  border: 1px solid ${colors.black40};
  border-radius: 6px;
`;

const StyledEditCompleteButton = styled.button`
  border-radius: 4px;
  background-color: ${colors.black40};
  padding: 12px 36px;
  white-space: nowrap;
  color: ${colors.gray100};

  ${textStyles.SUIT_14_M};
`;

const IconDeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 42px;
  min-height: 42px;
`;

const StyledMemberEditView = styled.div`
  display: flex;
  column-gap: 10px;
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 10px;
  width: 100%;
`;

const StyledMemberView = styled.div`
  display: flex;
  gap: 42px;
  border-radius: 6px;
  background-color: ${colors.black60};
  cursor: pointer;
  padding: 14px 30px;
  width: 100%;
  min-height: 42px;
  color: ${colors.gray100};

  ${textStyles.SUIT_14_M};

  & > .name {
    flex-basis: 105px;
  }
`;
