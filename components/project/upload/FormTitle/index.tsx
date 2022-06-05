import styled from '@emotion/styled';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import Text from 'components/common/text';
import { colors } from 'styles/common/colors';
import { Typography } from 'styles/common/typography';

interface Props extends HTMLAttributes<HTMLDivElement> {
  essential?: boolean;
  typography?: Typography;
}

const FormTitle: FC<PropsWithChildren<Props>> = ({ essential, typography = 'SUIT_18_SB', children, ...props }) => {
  return (
    <StyledTitle {...props}>
      <Text typography={typography}>{children}</Text>
      {essential && (
        <Text typography='SUIT_16_M' color={colors.purple100}>
          *
        </Text>
      )}
    </StyledTitle>
  );
};

export default FormTitle;

const StyledTitle = styled.div`
  display: flex;
  gap: 4px;
`;
