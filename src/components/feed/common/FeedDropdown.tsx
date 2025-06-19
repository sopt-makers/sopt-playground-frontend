import styled from '@emotion/styled';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { colors } from '@sopt-makers/colors';
import { m } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { PropsWithChildren, ReactNode } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const DropdownPortal = dynamic(() => import('@radix-ui/react-dropdown-menu').then((mod) => mod.Portal), {
  ssr: false,
});

interface FeedDropdownProps {
  trigger?: ReactNode;
  style?: React.CSSProperties;
}

const Base = ({ trigger, style, children }: PropsWithChildren<FeedDropdownProps>) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{trigger}</DropdownMenu.Trigger>
      <DropdownPortal>
        <StyledContent
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={style}
        >
          {children}
        </StyledContent>
      </DropdownPortal>
    </DropdownMenu.Root>
  );
};

const StyledContent = styled(m(DropdownMenu.Content))`
  position: relative;
  top: 10px;
  right: 36px;
  z-index: 100;
  border-radius: 12px;
  background-color: ${colors.gray700};
  min-width: 96px;

  @media ${MOBILE_MEDIA_QUERY} {
    right: 12px;
    min-width: 100px;
  }
`;

interface ItemProps extends DropdownMenu.DropdownMenuItemProps {
  type?: 'default' | 'danger';
}
const Item = ({ type = 'default', children, ...props }: PropsWithChildren<ItemProps>) => {
  return (
    <StyledItem
      css={{
        color: type === 'danger' ? '#FF453A' : '#FFFFFF',
      }}
      {...props}
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
