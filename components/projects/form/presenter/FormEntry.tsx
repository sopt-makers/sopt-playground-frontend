import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

export interface FormEntryProps {
  className?: string;
  title: string;
  children: ReactNode;
  required?: boolean;
  comment?: string;
  description?: ReactNode;
}

const FormEntry: FC<FormEntryProps> = ({ className, title, required, comment, children, description }) => {
  return (
    <StyledFormEntry className={className}>
      <TitleSlot>
        <Text typography='SUIT_18_SB'>{title}</Text>
        {required && <Essential>*</Essential>}
        {comment && <Comment>{comment}</Comment>}
      </TitleSlot>
      {description && <Description>{description}</Description>}

      {children}
    </StyledFormEntry>
  );
};

export default FormEntry;

const StyledFormEntry = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleSlot = styled.div`
  display: flex;
  margin-bottom: 9px;
`;

const Description = styled.div`
  margin-bottom: 18px;
  color: ${colors.gray80};
  ${textStyles.SUIT_14_M};
`;

const Essential = styled(Text)`
  margin: 0 0 0 4px;
  color: ${colors.purple100};
  ${textStyles.SUIT_16_M};
`;

const Comment = styled(Text)`
  align-self: center;
  margin: 0 0 0 10px;
  color: ${colors.purple100};
`;
