import Select from '@/components/common/Select';
import { Link, LINK_TYPES } from '@/components/project/upload/LinkForm/constants';
import LinkFormItem from '@/components/project/upload/LinkForm/LinkFormItem';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import { FC, PropsWithChildren } from 'react';

export interface LinkFormProps {
  links: Link[];
  onCreate: () => void;
  onChange: (link: Link) => void;
  onDelete: (linkKey: number) => void;
}

const LinkForm: FC<LinkFormProps> = ({ links, onCreate, onChange, onDelete }) => {
  return (
    <StyledUl>
      {links.map((link) => (
        <LinkFormItem key={link.key} link={link} onChange={onChange} onDelete={onDelete}></LinkFormItem>
      ))}
      <StyledButton onClick={onCreate}>+ 추가</StyledButton>
    </StyledUl>
  );
};

export default LinkForm;

const StyledUl = styled.ul``;

const StyledButton = styled.button`
  align-self: start;
  margin: 8px 0 0 20px;
  cursor: pointer;
  color: ${colors.gray100};

  ${textStyles.SUIT_16_M};
`;
