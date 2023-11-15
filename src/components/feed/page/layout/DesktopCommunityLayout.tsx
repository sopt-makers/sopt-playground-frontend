import styled from '@emotion/styled';
import { m } from 'framer-motion';
import { FC, ReactNode } from 'react';

import { layoutCSSVariable } from '@/components/layout/utils';

interface DesktopCommunityLayoutProps {
  isDetailOpen: boolean;
  listSlot: ReactNode;
  detailSlot: ReactNode;
}

const DETAIL_SLOT_WIDTH = 560;

const DesktopCommunityLayout: FC<DesktopCommunityLayoutProps> = ({ isDetailOpen, listSlot, detailSlot }) => {
  return (
    <Container>
      <ListSlot>{listSlot}</ListSlot>
      <DetailSlot
        initial={{ width: 0 }}
        animate={{ width: isDetailOpen ? DETAIL_SLOT_WIDTH : 0 }}
        transition={{ bounce: 0 }}
      >
        <DetailSlotSticky>
          <DetailSlotInner>{detailSlot}</DetailSlotInner>
        </DetailSlotSticky>
      </DetailSlot>
    </Container>
  );
};

export default DesktopCommunityLayout;

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
`;

const ListSlot = styled.div`
  flex: 1 1 0;
  max-width: 560px;
`;

const DetailSlot = styled(m.div)`
  position: relative;
  align-self: stretch;
  max-width: 560px;
`;

const DetailSlotSticky = styled(m.div)`
  position: sticky;
  top: ${layoutCSSVariable.globalHeaderHeight};
  width: 100%;
  height: ${layoutCSSVariable.contentAreaHeight};
  overflow: hidden;
`;

const DetailSlotInner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${DETAIL_SLOT_WIDTH}px;
  min-width: ${DETAIL_SLOT_WIDTH}px;
`;
