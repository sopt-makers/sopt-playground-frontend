import { css } from '@emotion/react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { colors } from '@sopt-makers/colors';
import { FC, ReactNode, useState } from 'react';

const ARROW_DOWN_SYMBOL = `\u25bc`;
const ARROW_UP_SYMBOL = `\u25b2`;

interface PanelProps {
  title: ReactNode;
  children?: ReactNode;
}

const Panel: FC<PanelProps> = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger css={disclosureButtonStyle}>
        <span>{title}</span>
        <span>{open ? ARROW_UP_SYMBOL : ARROW_DOWN_SYMBOL}</span>
      </Collapsible.Trigger>
      <Collapsible.Content css={collapsibleContentStyle}>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
};

const disclosureButtonStyle = css`
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
  border-radius: 5px;
  background-color: ${colors.blue40};
  cursor: pointer;
  padding: 8px 16px;
  width: calc(100% - 30px);
  color: ${colors.black60};
`;

const collapsibleContentStyle = css`
  margin: 8px 15px;
  padding: 5px 0 0;
  overflow: hidden;

  &[data-state='open'] {
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

export default Panel;
