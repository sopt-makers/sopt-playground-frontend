import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { DEFAULT_LINK, LINK_TITLES } from '@/components/project/upload/LinkForm/constants';
import { ProjectUploadForm } from '@/pages/project/upload';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import { FC } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import IconDelete from '@/public/icons/icon-delete.svg';

const LinkForm: FC = () => {
  const { control, register } = useFormContext<ProjectUploadForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  return (
    <ul>
      {fields.map((field, index) => (
        <StyledLi key={field.id}>
          <StyledSelect placeholder='선택' {...register(`links.${index}.title`)}>
            {LINK_TITLES.map(({ title, label }) => (
              <option key={title} value={title}>
                {label}
              </option>
            ))}
          </StyledSelect>
          <Controller
            control={control}
            name={`links.${index}.url`}
            render={({ field }) => <StyledInput placeholder='https://' {...field} />}
          />
          <IconDeleteWrapper>
            <IconDelete onClick={() => remove(index)} />
          </IconDeleteWrapper>
        </StyledLi>
      ))}
      <StyledButton type='button' onClick={() => append(DEFAULT_LINK)}>
        + 추가
      </StyledButton>
    </ul>
  );
};

export default LinkForm;

const StyledLi = styled.li`
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const StyledSelect = styled(Select)`
  width: 200px;
`;

const StyledInput = styled(Input)`
  margin-left: 10px;
  width: 365px;
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

const StyledButton = styled.button`
  align-self: start;
  margin: 8px 0 0 20px;
  cursor: pointer;
  color: ${colors.gray100};

  ${textStyles.SUIT_16_M};
`;
