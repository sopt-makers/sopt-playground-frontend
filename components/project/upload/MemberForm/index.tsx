import styled from '@emotion/styled';
import { FC } from 'react';
import { textStyles } from '@/styles/typography';
import { colors } from '@/styles/colors';
import { Controller, useFieldArray, useFormContext, UseFieldArrayProps } from 'react-hook-form';
import { ProjectUploadForm } from '@/pages/project/upload';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { Role } from '@/api/project/types';
import IconDelete from '@/public/icons/icon-delete.svg';
import { DEFAULT_MEMBER } from '@/components/project/upload/MemberForm/constants';

interface MemberFormProps {
  name: UseFieldArrayProps<ProjectUploadForm, 'members' | 'releaseMembers' | `releaseMembers.${string}`, 'id'>['name'];
}

const MemberForm: FC<MemberFormProps> = ({ name }) => {
  const { control, register } = useFormContext<ProjectUploadForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <Container>
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
      <MemberAddButton type='button' onClick={() => append({ ...DEFAULT_MEMBER, isTeamMember: name === 'members' })}>
        + 추가
      </MemberAddButton>
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
