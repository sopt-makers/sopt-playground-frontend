import styled from '@emotion/styled';
import React, { FC } from 'react';

import ErrorMessage from '@/components/common/Input/ErrorMessage';
import Select from '@/components/common/Select';
import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const categoryLabel = {
  APPJAM: '앱잼',
  SOPKATHON: '솝커톤',
  SOPTERM: '솝텀 프로젝트',
  STUDY: '스터디',
  JOINTSEMINAR: '합동 세미나',
  ETC: '기타',
} as const;

interface CategoryFieldProps {
  value: string | null;
  onChange: (value: string | null) => void;
  isError?: boolean;
  errorMessage?: string;
}
const CategoryField: FC<CategoryFieldProps> = ({ value, onChange, isError, errorMessage }) => {
  return (
    <StyledCategoryField>
      <StyledDescription>기수는 SOPT 공식 활동을 기준으로 선택해주세요</StyledDescription>
      <StyledSelect value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder='선택' error={isError}>
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

const StyledDescription = styled(Text)`
  margin: 14px 0 18px;
  color: ${colors.gray100};
  ${textStyles.SUIT_14_M};
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
