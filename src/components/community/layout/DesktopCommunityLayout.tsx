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
        <DetailSlotInner>{detailSlot}</DetailSlotInner>
      </DetailSlot>
    </Container>
  );
};

export default DesktopCommunityLayout;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${layoutCSSVariable.contentAreaHeight};
`;

const ListSlot = styled.div`
  flex: 1 1 0;
  max-width: 560px;
  height: 100%;
`;

const DetailSlot = styled(m.div)`
  position: relative;
  width: 100%;
  max-width: 560px;
  height: 100%;
  overflow: hidden;
`;

const DetailSlotInner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 560px;
  min-width: ${DETAIL_SLOT_WIDTH}px;
`;
