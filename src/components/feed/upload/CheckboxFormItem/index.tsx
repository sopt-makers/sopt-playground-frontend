import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ReactNode } from 'react';

import { textStyles } from '@/styles/typography';

interface CheckboxFormItemProps {
  label: string;
  children: ReactNode;
}

export default function CheckboxFormItem({ children, label }: CheckboxFormItemProps) {
  return (
    <CheckboxWrapper>
      {children}
      <Label>{label}</Label>
    </CheckboxWrapper>
  );
}

const CheckboxWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const Label = styled.div`
  line-height: 20px;
  letter-spacing: -0.14px;
  color: ${colors.gray10};

  ${textStyles.SUIT_14_M}
`;
