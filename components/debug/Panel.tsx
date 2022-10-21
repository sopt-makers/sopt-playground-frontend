import { css } from '@emotion/react';
import { Disclosure } from '@headlessui/react';
import { FC, ReactNode } from 'react';

import { colors } from '@/styles/colors';

const ARROW_DOWN_SYMBOL = `\u25bc`;
const ARROW_UP_SYMBOL = `\u25b2`;

interface PanelProps {
  title: ReactNode;
  children?: ReactNode;
}

const Panel: FC<PanelProps> = ({ title, children }) => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button css={disclosureButtonStyle} as='div'>
            <span>{title}</span>
            <span>{open ? ARROW_UP_SYMBOL : ARROW_DOWN_SYMBOL}</span>
          </Disclosure.Button>
          <Disclosure.Panel css={disclosurePanelStyle}>
            <>{children}</>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const disclosureButtonStyle = css`
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
  border-radius: 5px;
  background-color: ${colors.purple60};
  cursor: pointer;
  padding: 8px 16px;
  color: ${colors.black60};

  &:hover {
    color: ${colors.purple80};
  }
`;

const disclosurePanelStyle = css`
  margin: 8px 15px;
  padding: 5px 0 0;
`;

export default Panel;
