import styled from '@emotion/styled';
import * as Accordion from '@radix-ui/react-accordion';
import { m } from 'framer-motion';
import { FC, PropsWithChildren, useState } from 'react';

import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

enum AccordionOpenState {
  OPEN = 'open',
  CLOSED = '',
}

interface FormAccordionProps {
  title: string;
  description?: string;
  required?: boolean;
}
const FormAccordion: FC<PropsWithChildren<FormAccordionProps>> = ({ description, title, required, children }) => {
  const [value, setValue] = useState<AccordionOpenState>(AccordionOpenState.CLOSED);

  return (
    <StyledRoot
      type='single'
      defaultValue='closed'
      value={value}
      onValueChange={(value) => setValue(value as AccordionOpenState)}
      collapsible
    >
      <StyledItem value='open'>
        <StyledHeader>
          <StyledTitleWrapper>
            <Text typography='SUIT_18_SB'>{title}</Text>
            {required && <Essential>*</Essential>}
          </StyledTitleWrapper>
          <StyledTrigger>{value === AccordionOpenState.OPEN ? '- 접기' : '+ 펼치기'}</StyledTrigger>
        </StyledHeader>
        <Text mt={8} typography='SUIT_14_M' color={colors.gray80}>
          {description}
        </Text>
        <StyledContent
          variants={{
            open: { height: 'auto' },
            closed: { height: 0 },
          }}
          animate={value === AccordionOpenState.OPEN ? 'open' : 'closed'}
          transition={{ ease: 'easeOut', duration: 0.3 }}
        >
          {children}
        </StyledContent>
      </StyledItem>
    </StyledRoot>
  );
};

export default FormAccordion;

const StyledRoot = styled(Accordion.Root)`
  border-bottom: 1px solid ${colors.black60};
  padding-bottom: 16px;
`;

const StyledItem = styled(Accordion.Item)`
  overflow: hidden;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Essential = styled(Text)`
  margin: 0 0 0 4px;
  color: ${colors.purple100};
  ${textStyles.SUIT_16_M};
`;

const StyledContent = m(styled(Accordion.Content)`
  &[data-state='open'] {
    padding-top: 30px;
  }
`);

const StyledTrigger = styled(Accordion.Trigger)`
  cursor: pointer;
  color: ${colors.gray60};
  ${textStyles.SUIT_15_SB};
`;
