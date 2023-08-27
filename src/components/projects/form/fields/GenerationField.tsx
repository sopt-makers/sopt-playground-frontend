import styled from '@emotion/styled';
import React, { FC } from 'react';

import Checkbox from '@/components/common/Checkbox';
import ErrorMessage from '@/components/common/Input/ErrorMessage';
import Select from '@/components/common/Select';
import Text from '@/components/common/Text';
import { GENERATIONS } from '@/constants/generation';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface GenerationFieldProps {
  value: string | null;
  defaultValue: string;
  onChange: (value: string | null) => void;
  errorMessage?: string;
}

const GenerationField: FC<GenerationFieldProps> = ({ value, defaultValue, onChange, errorMessage }) => {
  const handleCheckboxChange = () => {
    if (value === null) {
      onChange(defaultValue);
    } else {
      onChange(null);
    }
  };

  return (
    <StyledGenerationField>
      <StyledSelect
        width={236}
        placeholder='선택'
        value={value ?? defaultValue}
        onChange={(e) => onChange(e.target.value)}
        error={Boolean(errorMessage)}
      >
        <option value={defaultValue}>선택</option>
        {GENERATIONS.map((item) => (
          <option key={item} value={item}>
            {item}기
          </option>
        ))}
      </StyledSelect>
      <StyledCheckboxWrapper>
        <Checkbox checked={value === null} onChange={handleCheckboxChange} />
        <Text typography='SUIT_12_M' color={colors.gray100}>
          특정 기수 활동으로 진행하지 않았어요
        </Text>
      </StyledCheckboxWrapper>
      <StyledErrorMessage message={errorMessage} />
    </StyledGenerationField>
  );
};

export default GenerationField;

const StyledGenerationField = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled(Select)`
  width: 236px;

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}

    width: 160px;
  }
`;

const StyledCheckboxWrapper = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
  margin: 13px 0;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin: 10px 0;
`;
