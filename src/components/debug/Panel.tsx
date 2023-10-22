import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as Collapsible from '@radix-ui/react-collapsible';
import { colors } from '@sopt-makers/colors';
import { FC, ReactNode, useState } from 'react';

import { textStyles } from '@/styles/typography';

const ARROW_DOWN_SYMBOL = `\u25bc`;
const ARROW_UP_SYMBOL = `\u25b2`;

interface PanelProps {
  title: ReactNode;
  children?: ReactNode;
}

const Panel: FC<PanelProps> = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} css={rootStyle}>
      <Collapsible.Trigger css={disclosureButtonStyle}>
        <Title>{title}</Title>
        <span>{open ? ARROW_UP_SYMBOL : ARROW_DOWN_SYMBOL}</span>
      </Collapsible.Trigger>
      <Collapsible.Content css={collapsibleContentStyle}>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
};

const rootStyle = css`
  padding: 0 15px;
`;

const disclosureButtonStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: ${colors.success};
  cursor: pointer;
  padding: 8px 16px;
  width: 100%;
  color: ${colors.gray20};
`;

const collapsibleContentStyle = css`
  padding: 5px 0 0;
  overflow: hidden;

  &[data-state='open'] {
    padding: 0;
    animation: slide-down 200ms ease-out;
  }

  &[data-state='closed'] {
    animation: slide-up 200ms ease-out;
  }

  @keyframes slide-down {
    from {
      height: 0;
    }

    to {
      height: var(--radix-collapsible-content-height);
    }
  }

  @keyframes slide-up {
    from {
      height: var(--radix-collapsible-content-height);
    }

    to {
      height: 0;
    }
  }
`;

const Title = styled.div`
  ${textStyles.SUIT_17_SB}
`;

export default Panel;
