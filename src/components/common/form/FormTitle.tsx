import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { Typography } from '@/styles/typography';
import { fonts } from '@sopt-makers/fonts';

export interface FormTitleProps extends HTMLAttributes<HTMLDivElement> {
  essential?: boolean;
  description?: string;
  typography?: Typography;
  breakPoint?: string;
}

const FormTitle: FC<PropsWithChildren<FormTitleProps>> = ({
  essential,
  typography = 'SUIT_18_SB',
  description,
  children,
  breakPoint = MOBILE_MEDIA_QUERY,
  ...props
}) => {
  return (
    <StyledTitle {...props}>
      <Label breakPoint={breakPoint}>
        <>{children}</>
        {essential && <Essential>*</Essential>}
      </Label>
      {description && <Descripiton breakPoint={breakPoint}>{description}</Descripiton>}
    </StyledTitle>
  );
};

export default FormTitle;

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.h2<{ breakPoint: string }>`
  display: flex;
  gap: 4px;
  color: ${colors.white};
  ${fonts.LABEL_16_SB};
  margin-bottom: 8px;

  @media ${({ breakPoint }) => breakPoint} {
    ${fonts.LABEL_14_SB};
  }
`;

const Essential = styled.p`
  margin: 0 0 0 4px;
  color: ${colors.secondary};
`;

const Descripiton = styled.p<{ breakPoint: string }>`
  color: ${colors.gray300};
  ${fonts.LABEL_14_SB};

  @media ${({ breakPoint }) => breakPoint} {
    ${fonts.LABEL_12_SB};
  }
`;
