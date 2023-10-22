import styled from '@emotion/styled';
import * as Collapsible from '@radix-ui/react-collapsible';
import { colors } from '@sopt-makers/colors';
import { AnimatePresence, m } from 'framer-motion';
import { FC, PropsWithChildren, useState } from 'react';

import Text from '@/components/common/Text';
import { textStyles } from '@/styles/typography';

interface FormAccordionProps {
  title: string;
  description?: string;
  required?: boolean;
}
const FormAccordion: FC<PropsWithChildren<FormAccordionProps>> = ({ description, title, required, children }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <StyledRoot open={open} onOpenChange={setOpen}>
      <StyledHeader>
        <StyledTitleWrapper>
          <Text typography='SUIT_18_SB'>{title}</Text>
          {required && <Essential>*</Essential>}
        </StyledTitleWrapper>
        <StyledTrigger>{open ? '- 접기' : '+ 펼치기'}</StyledTrigger>
      </StyledHeader>
      <Text mt={8} typography='SUIT_14_M' color={colors.gray80}>
        {description}
      </Text>
      <StyledDivder />
      <AnimatePresence initial={false}>
        {open && (
          <StyledContent
            forceMount
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </StyledContent>
        )}
      </AnimatePresence>
    </StyledRoot>
  );
};

export default FormAccordion;

const StyledRoot = styled(Collapsible.Root)`
  padding-bottom: 16px;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDivder = styled.div`
  margin-top: 16px;
  border: 0.5px solid ${colors.black60};
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Essential = styled(Text)`
  margin: 0 0 0 4px;
  color: ${colors.secondary};
  ${textStyles.SUIT_16_M};
`;

const StyledTrigger = styled(Collapsible.Trigger)`
  cursor: pointer;
  color: ${colors.gray60};
  ${textStyles.SUIT_15_SB};
`;

const StyledContent = m(styled(Collapsible.Content)`
  padding-top: 30px;
`);
