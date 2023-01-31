import styled from '@emotion/styled';
import { FC, useState } from 'react';

import Input, { InputProps } from '@/components/common/Input';
import SearchIcon from '@/public/icons/icon-member-search.svg';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface MemberSearchProps extends InputProps {
  onSearch?: (searchQuery: string) => void;
}
const MemberSearch: FC<MemberSearchProps> = ({ className, onSearch, ...props }) => {
  const [value, setValue] = useState<string>('');
  const handleSearch = () => {
    onSearch?.(value);
  };

  return (
    <StyledMemberSearch
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <StyledInput value={value} onChange={(e) => setValue(e.target.value)} {...props} />

      <StyledIcon onClick={handleSearch} src='/icons/icon-member-search.svg' alt='검색 아이콘' />
    </StyledMemberSearch>
  );
};

export default MemberSearch;

const StyledMemberSearch = styled.form`
  position: relative;
`;

const StyledInput = styled(Input)`
  border: 1px solid transparent;
  border-radius: 14px;
  background: ${colors.black80};
  padding: 18px 24px;
  padding-left: 56px;
  max-width: 330px;
  color: ${colors.gray80};

  ${textStyles.SUIT_16_B};
`;

const StyledIcon = styled(SearchIcon)`
  position: absolute;
  top: 18px;
  left: 24px;
  cursor: pointer;
  width: 18px;
  height: 18px;
`;
