import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { FC } from 'react';

import Select from '@/components/members/common/select/Select';
import { GENERATIONS } from '@/constants/generation';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface GenerationSelectProps {
  className?: string;
  value?: string;
  onChange?: (value?: string) => void;
  onClear?: () => void;
}
const GenerationSelect: FC<GenerationSelectProps> = ({ className, value, onChange, onClear }) => {
  return (
    <StyledSelect
      className={className}
      placeholder='기수'
      value={value}
      onChange={onChange}
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
  padding: 9px 26px 9px 22px;
  min-width: 104px;

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${colors.purple100};
      color: ${colors.white};
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 14px;
    padding: 18px;

    &[data-placeholder] {
      ${textStyles.SUIT_16_B};
    }
  }
`;
