import styled from '@emotion/styled';
import React, { FC } from 'react';

import ErrorMessage from '@/components/common/Input/ErrorMessage';
import Select from '@/components/common/Select';
import { categoryLabel } from '@/components/projects/upload/form/constants';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface CategoryFieldProps {
  value: string | undefined;
  onChange: (value: string) => void;
  isError?: boolean;
  errorMessage?: string;
}
const CategoryField: FC<CategoryFieldProps> = ({ value, onChange, isError, errorMessage }) => {
  return (
    <StyledCategoryField>
      <StyledSelect value={value} onChange={(e) => onChange(e.target.value)} placeholder='선택' error={isError}>
        {Object.keys(categoryLabel).map((category) => (
          <option key={category} value={category}>
            {categoryLabel[category as keyof typeof categoryLabel]}
          </option>
        ))}
      </StyledSelect>
      <StyledErrorMessage message={errorMessage} />
    </StyledCategoryField>
  );
};

export default CategoryField;

const StyledCategoryField = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled(Select)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 160px;
    ${textStyles.SUIT_14_M}
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin: 10px 0;
`;
