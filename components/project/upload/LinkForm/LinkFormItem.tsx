import Select from '@/components/common/Select';
import { LinkFormProps } from '@/components/project/upload/LinkForm';
import { Link, LINK_TYPES } from '@/components/project/upload/LinkForm/constants';
import styled from '@emotion/styled';
import { ChangeEvent, FC } from 'react';
import { useForm } from 'react-hook-form';
import IconDelete from '@/public/icons/icon-delete.svg';
import Input from '@/components/common/Input';

type LinkForm = Omit<Link, 'key'>;

interface LinkFormItem extends Omit<LinkFormProps, 'links' | 'onCreate'> {
  link: Link;
}

const LinkFormItem: FC<LinkFormItem> = ({ link, onChange, onDelete }) => {
  const { register } = useForm<LinkForm>();

  const _onChange = (e: ChangeEvent<any>, key: keyof LinkForm) => {
    onChange({
      ...link,
      [key]: e.target.value,
    });
  };

  return (
    <StyledLi>
      <StyledSelect
        placeholder='선택'
        {...register('type', {
          onChange: (e) => _onChange(e, 'type'),
        })}
      >
        {LINK_TYPES.map(({ type, label }) => (
          <option key={type} value={type}>
            {label}
          </option>
        ))}
      </StyledSelect>
      <StyledInput
        placeholder='https://'
        {...register('url', {
          onChange: (e) => _onChange(e, 'url'),
        })}
      />
      <IconDeleteWrapper>
        <IconDelete onClick={() => onDelete(link.key)} />
      </IconDeleteWrapper>
    </StyledLi>
  );
};

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

export default LinkFormItem;
