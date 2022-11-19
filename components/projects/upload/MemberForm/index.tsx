// @ts-nocheck
// FIXME: react-hook-form의 타입이 옵셔널해서 맞춰지지 않아 임시로 주석처리(selectedMembers)
import styled from '@emotion/styled';
import _debounce from 'lodash/debounce';
import React, { FC, useState } from 'react';
import { Controller, useFieldArray, UseFieldArrayProps, useFormContext, useWatch } from 'react-hook-form';

import { MemberRole } from '@/api/projects/type';
import FormItem from '@/components/common/form/FormItem';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Text from '@/components/common/Text';
import useGetMembersByNameQuery from '@/components/projects/upload/hooks/useGetMembersByNameQuery';
import { DEFAULT_MEMBER, MemeberFormType } from '@/components/projects/upload/MemberForm/constants';
import MemberSearch from '@/components/projects/upload/MemberForm/MemberSearch';
import useMediaQuery from '@/hooks/useMediaQuery';
import { ProjectUploadForm } from '@/pages/projects/upload';
import IconTrash from '@/public/icons/icon-trash.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberFormProps {
  name: UseFieldArrayProps<ProjectUploadForm, 'members' | 'releaseMembers', 'id'>['name'];
}

const MemberForm: FC<MemberFormProps> = ({ name }) => {
  const {
    formState: { errors },
    control,
    register,
    setValue,
  } = useFormContext<ProjectUploadForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { members, releaseMembers } = useWatch({
    control,
  });
  const [searchName, setSearchName] = useState<string>('');
  const { data: membersData } = useGetMembersByNameQuery({
    name: searchName,
  });

  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);

  // MEMO: 모바일 뷰를 위한 변수,함수들 입니다.
  // 기존 데스크탑과 멤버 추가 방식과 UI가 아예 달라서 이를 분기처리하는 로직과, 수정상태인지 여부인 isEdit를 이용해야 하기 때문에 아래와 같은 로직들이 필요합니다.
  const selectedMembers: MemeberFormType[] = (name === 'members' ? members : releaseMembers) ?? [];
  const onEdit = (index: number) => {
    setValue(`${name}.${index}.isEdit`, true);
  };
  const onAppend = () => {
    append({ ...DEFAULT_MEMBER, isTeamMember: name === 'members' });
  };
  const onComplete = (index: number) => {
    if (!(selectedMembers[index].memberRole || selectedMembers[index].memberDescription)) {
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
    <>
      {!isMobile ? (
        <Container>
          {fields.map((field, index) => (
            <MemberItemWrapper key={field.id}>
              <FormItem errorMessage={errors.members?.[index]?.searchedMember.message}>
                <Controller
                  control={control}
                  name={`${name}.${index}.searchedMember`}
                  render={({ field: { value, onChange, name } }) => (
                    <MemberSearchWrapper>
                      <MemberSearch
                        error={!!errors.members?.[index]?.searchedMember}
                        members={membersData ?? []}
                        onSearch={_debounce(
                          (e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value),
                          300,
                        )}
                        value={value}
                        onChange={onChange}
                        name={name}
                      />
                    </MemberSearchWrapper>
                  )}
                />
              </FormItem>
              <FormItem errorMessage={errors.members?.[index]?.memberRole?.message}>
                <StyledSelect
                  error={!!errors.members?.[index]?.memberRole}
                  placeholder='역할'
                  {...register(`${name}.${index}.memberRole`)}
                >
                  {Object.values(MemberRole).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </StyledSelect>
              </FormItem>
              <Controller
                control={control}
                name={`${name}.${index}.memberDescription`}
                render={({ field }) => (
                  <StyledInputFormItem errorMessage={errors.members?.[index]?.memberDescription?.message}>
                    <Input
                      error={!!errors.members?.[index]?.memberDescription}
                      placeholder='어떤 역할을 맡았는지 적어주세요'
                      {...field}
                    />
                  </StyledInputFormItem>
                )}
              />
              <IconDeleteWrapper>
                <IconTrash onClick={() => remove(index)} />
              </IconDeleteWrapper>
            </MemberItemWrapper>
          ))}
          <MemberAddButton type='button' onClick={onAppend}>
            + 추가
          </MemberAddButton>
        </Container>
      ) : (
        <MobileContainer>
          {selectedMembers.map((selectedMember, memberIndex) => (
            <>
              {!selectedMember.isEdit ? (
                <MobileMemberItem key={selectedMember.memberId} onClick={() => onEdit(memberIndex)}>
                  <Text typography='SUIT_12_M' color={colors.gray100}>
                    {selectedMember.memberName}
                  </Text>
                  <Text style={{ marginLeft: '29px' }} typography='SUIT_12_M' color={colors.gray100}>
                    {selectedMember.memberRole}
                  </Text>
                  <Text style={{ marginLeft: '40px' }} typography='SUIT_12_M' color={colors.gray100}>
                    {selectedMember.memberDescription}
                  </Text>
                </MobileMemberItem>
              ) : (
                <MobileMemberApplyForm>
                  <MobileMemberSelect>
                    <Controller
                      control={control}
                      name={`${name}.${memberIndex}.searchedMember`}
                      render={({ field: { value, onChange, name } }) => (
                        <MemberSearch
                          value={value}
                          onChange={onChange}
                          name={name}
                          members={membersData ?? []}
                          onSearch={_debounce(
                            (e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value),
                            300,
                          )}
                        />
                      )}
                    />
                    <FormItem errorMessage={errors.members?.[memberIndex]?.memberRole?.message}>
                      <MobileSelect
                        placeholder='역할'
                        error={!!errors.members?.[memberIndex]?.memberRole}
                        {...register(`${name}.${memberIndex}.memberRole`)}
                      >
                        {Object.values(MemberRole).map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </MobileSelect>
                    </FormItem>
                  </MobileMemberSelect>
                  <Controller
                    control={control}
                    name={`${name}.${memberIndex}.memberDescription`}
                    render={({ field }) => (
                      <MobileDescription placeholder='어떤 역할을 맡았는지 적어주세요' {...field} />
                    )}
                  />
                  <MobileApplyFormFooter>
                    <IconTrash onClick={() => onRemove(memberIndex)} />
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
        </MobileContainer>
      )}
    </>
  );
};

export default MemberForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-top: 10px;

    @media ${MOBILE_MEDIA_QUERY} {
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

const MemberSearchWrapper = styled.div`
  width: 163px;
`;

const MemberItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledSelect = styled(Select)`
  margin: 0 10px;
  min-width: 200px;

  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 158px;
  }
`;

const StyledInputFormItem = styled(FormItem)`
  width: 100% !important;

  & > input {
    ${textStyles.SUIT_14_M};

    border-width: 1px;
  }
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
const MobileContainer = styled.div``;
const MobileMemberApplyForm = styled.div`
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 12px;
`;

const MobileMemberSelect = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const MobileSelect = styled(Select)`
  ${textStyles.SUIT_14_M};

  border: 1px solid ${colors.black40};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 158px;
  }
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
