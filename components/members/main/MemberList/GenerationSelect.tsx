import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { FC } from 'react';

import Select from '@/components/members/common/select/Select';
import { GENERATIONS } from '@/constants/generation';
import { colors } from '@/styles/colors';

interface GenerationSelectProps {
  value?: string;
  onChange?: (value?: string) => void;
  onClear?: () => void;
}
const GenerationSelect: FC<GenerationSelectProps> = ({ value, onChange, onClear }) => {
  return (
    <StyledSelect
      placeholder='기수'
      value={value}
      onChange={onChange}
      width={100}
      selected={!!value}
      allowClear
      onClear={onClear}
    >
      {GENERATIONS.map((generation) => (
        <Select.Item key={generation} value={generation}>{`${generation}기`}</Select.Item>
      ))}
    </StyledSelect>
  );
};

export default GenerationSelect;

const StyledSelect = styled(Select)<{ selected: boolean }>`
  transition: background-color 0.2s;
  border-radius: 20px;
  ${({ selected }) =>
    selected &&
    css`
      background-color: ${colors.purple100};
      color: ${colors.white};
    `}

  padding: 9px 20px;
  max-height: 40px;
`;
