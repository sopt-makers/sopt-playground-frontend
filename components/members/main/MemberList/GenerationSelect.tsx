import styled from '@emotion/styled';
import React, { FC } from 'react';

import Select from '@/components/members/common/select/Select';
import { GENERATIONS } from '@/constants/generation';
import SearchClearIcon from '@/public/icons/icon-search-clear.svg';

interface GenerationSelectProps {
  value?: string;
  onChange?: (value?: string) => void;
}
const GenerationSelect: FC<GenerationSelectProps> = ({ value, onChange }) => {
  return (
    <StyledSelect placeholder='기수' value={value} onChange={onChange}>
      {GENERATIONS.map((generation) => (
        <Select.Item key={generation} value={generation}>{`${generation}기`}</Select.Item>
      ))}
    </StyledSelect>
  );
};

export default GenerationSelect;

const StyledSelect = styled(Select)`
  border-radius: 20px;
  width: 100px;
`;
