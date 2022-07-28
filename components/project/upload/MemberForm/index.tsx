import styled from '@emotion/styled';
import { FC } from 'react';
import { textStyles } from '@/styles/typography';
import { colors } from '@/styles/colors';
import { Controller, useFieldArray, useFormContext, UseFieldArrayProps, useWatch } from 'react-hook-form';
import { ProjectUploadForm } from '@/pages/project/upload';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { Role } from '@/api/project/types';
import IconDelete from '@/public/icons/icon-delete.svg';
import { DEFAULT_MEMBER, Member } from '@/components/project/upload/MemberForm/constants';
import useScreenSize from '@/hooks/useScreenSize';
import Text from '@/components/common/Text';

interface MemberFormProps {
  name: UseFieldArrayProps<ProjectUploadForm, 'members' | 'releaseMembers' | `releaseMembers.${string}`, 'id'>['name'];
}

const MemberForm: FC<MemberFormProps> = ({ name }) => {
  const { control, register, setValue } = useFormContext<ProjectUploadForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { members, releaseMembers } = useWatch({
    control,
  });

  // MEMO: 모바일 뷰를 위한 변수,함수들 입니다.
  // 기존 데스크탑과 멤버 추가 방식과 UI가 아예 달라서 이를 분기처리하는 로직과, 수정상태인지 여부인 isEdit를 이용해야 하기 때문에 아래와 같은 로직들이 필요합니다.
  const { isMobile } = useScreenSize();
  const selectedMembers: Member[] = name === 'members' ? members : releaseMembers;
  const onEdit = (index: number) => {
    setValue(`${name}.${index}.isEdit`, true);
  };
  const onAppend = () => {
    append({ ...DEFAULT_MEMBER, isTeamMember: name === 'members' });
  };
  const onComplete = (index: number) => {
    if (!(selectedMembers[index].userId || selectedMembers[index].role || selectedMembers[index].description)) {
      return;
    }
    setValue(`${name}.${index}.isEdit`, false);
  };
  const onRemove = (index: number) => {
    setValue(
      `${name}`,
      selectedMembers.filter((_, memberIndex) => memberIndex !== index),
    );
  };

  return (
    <Container>
      {!isMobile ? (
        <>
          {fields.map((field, index) => (
            <MemberItemWrapper key={field.id}>
              <Controller
                control={control}
                name={`${name}.${index}.userId`}
                render={({ field }) => <StyledMemberSearch placeholder='SOPT 멤버 검색' {...field} />}
              />
              <StyledSelect placeholder='역할' {...register(`${name}.${index}.role`)}>
                {Object.values(Role).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </StyledSelect>
              <Controller
                control={control}
                name={`${name}.${index}.description`}
                render={({ field }) => <Input placeholder='어떤 역할을 맡았는지 적어주세요' {...field} />}
              />
              <IconDeleteWrapper>
                <IconDelete onClick={() => remove(index)} />
              </IconDeleteWrapper>
            </MemberItemWrapper>
          ))}
          <MemberAddButton type='button' onClick={onAppend}>
            + 추가
          </MemberAddButton>
        </>
      ) : (
        <>
          {selectedMembers.map((selectedMember, memberIndex) => (
            <>
              {!selectedMember.isEdit ? (
                <MobileMemberItem key={selectedMember.userId} onClick={() => onEdit(memberIndex)}>
                  <Text typography='SUIT_12_M' color={colors.gray100}>
                    {selectedMember.userId}
                  </Text>
                  <Text style={{ marginLeft: '29px' }} typography='SUIT_12_M' color={colors.gray100}>
                    {selectedMember.role}
                  </Text>
                  <Text style={{ marginLeft: '40px' }} typography='SUIT_12_M' color={colors.gray100}>
                    {selectedMember.description}
                  </Text>
                </MobileMemberItem>
              ) : (
                <MobileMemberApplyForm>
                  <MobileMemberSelect>
                    <Controller
                      control={control}
                      name={`${name}.${memberIndex}.userId`}
                      render={({ field }) => <MobileSearch placeholder='SOPT 회원 검색' {...field} />}
                    />
                    <MobileSelect placeholder='역할' {...register(`${name}.${memberIndex}.role`)}>
                      {Object.values(Role).map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </MobileSelect>
                  </MobileMemberSelect>
                  <Controller
                    control={control}
                    name={`${name}.${memberIndex}.description`}
                    render={({ field }) => (
                      <MobileDescription placeholder='어떤 역할을 맡았는지 적어주세요' {...field} />
                    )}
                  />
                  <MobileApplyFormFooter>
                    <IconDelete onClick={() => onRemove(memberIndex)} />
                    <MobileCompleteButton type='button' onClick={() => onComplete(memberIndex)}>
                      완료
                    </MobileCompleteButton>
                  </MobileApplyFormFooter>
                </MobileMemberApplyForm>
              )}
            </>
          ))}
          <MobileAddButton type='button' onClick={onAppend}>
            추가하기
          </MobileAddButton>
        </>
      )}
    </Container>
  );
};

export default MemberForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-top: 10px;

    @media screen and (max-width: 375px) {
      margin-top: 12px;
    }
  }
`;

const MemberAddButton = styled.button`
  align-self: start;
  margin: 8px 0 0 20px;
  cursor: pointer;
  color: ${colors.gray100};

  ${textStyles.SUIT_16_M};
`;

const MemberItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledMemberSearch = styled(Input)`
  width: 163px;
`;

const StyledSelect = styled(Select)`
  margin: 0 10px;
  min-width: 200px;
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

// MEMO: Mobile view
const MobileMemberApplyForm = styled.div`
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 12px;
`;

const MobileMemberSelect = styled.div`
  display: flex;
  gap: 12px;
`;

const MobileSearch = styled(Input)`
  ${textStyles.SUIT_14_M};

  border: 1px solid ${colors.black40};
`;

const MobileSelect = styled(Select)`
  ${textStyles.SUIT_14_M};

  border: 1px solid ${colors.black40};
`;

const MobileDescription = styled(Input)`
  ${textStyles.SUIT_14_M};

  margin-top: 12px;
  border: 1px solid ${colors.black40};
`;

const MobileApplyFormFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 15px;
`;

const MobileCompleteButton = styled.button`
  border-radius: 4px;
  background-color: ${colors.black40};
  padding: 6.5px 30px;
  color: ${colors.gray100};

  ${textStyles.SUIT_14_M};
`;

const MobileAddButton = styled.button`
  margin-top: 12px;
  border: 1px solid ${colors.black40};
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 14px 20px;
  width: 100%;
`;

const MobileMemberItem = styled.div`
  display: flex;
  border-radius: 6px;
  background-color: ${colors.black40};
  padding: 15px 20px;
`;
