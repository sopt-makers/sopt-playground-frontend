import styled from '@emotion/styled';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { m } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { PropsWithChildren, ReactNode } from 'react';

const DropdownPortal = dynamic(() => import('@radix-ui/react-dropdown-menu').then((mod) => mod.Portal), {
  ssr: false,
});

interface FeedDropdownProps {
  trigger?: ReactNode;
}

const Base = ({ trigger, children }: PropsWithChildren<FeedDropdownProps>) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{trigger}</DropdownMenu.Trigger>
      <DropdownPortal>
        <StyledContent initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {children}
        </StyledContent>
      </DropdownPortal>
    </DropdownMenu.Root>
  );
};

const StyledContent = styled(m(DropdownMenu.Content))`
  border-radius: 12px;
  background-color: #252525;
  width: 208px;
`;

interface ItemProps {
  type?: 'default' | 'danger';
}
const Item = ({ type = 'default', children }: PropsWithChildren<ItemProps>) => {
  return (
    <StyledItem
      css={{
        color: type === 'danger' ? '#FF453A' : '#FFFFFF',
      }}
    >
      {children}
    </StyledItem>
  );
};

const StyledItem = styled(DropdownMenu.Item)`
  cursor: pointer;
  padding: 16px;

  :hover {
    outline: none;
  }
`;

export default Object.assign(Base, {
  Item,
  Seperator: DropdownMenu.Separator,
});
