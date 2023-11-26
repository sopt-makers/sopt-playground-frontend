import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

import Text from '@/components/common/Text';
import { textStyles, Typography } from '@/styles/typography';

export interface FormTitleProps extends HTMLAttributes<HTMLDivElement> {
  essential?: boolean;
  description?: string;
  typography?: Typography;
}

const FormTitle: FC<PropsWithChildren<FormTitleProps>> = ({
  essential,
  typography = 'SUIT_18_SB',
  description,
  children,
  ...props
}) => {
  return (
    <StyledTitle {...props}>
      <Text typography={typography}>{children}</Text>
      {essential && <Essential>*</Essential>}
      {description && <Description>{description}</Description>}
    </StyledTitle>
  );
};

export default FormTitle;

const StyledTitle = styled.div`
  display: flex;
`;

const Essential = styled(Text)`
  margin: 0 0 0 4px;
  color: ${colors.secondary};
  ${textStyles.SUIT_16_M};
`;

const Description = styled(Text)`
  align-self: center;
  margin: 0 0 0 10px;
  color: ${colors.gray10};
`;
