import styled from '@emotion/styled';
import { m } from 'framer-motion';
import { FC, ReactNode } from 'react';

import { layoutCSSVariable } from '@/components/layout/utils';

interface MobileCommunityLayoutProps {
  isDetailOpen: boolean;
  listSlot: ReactNode;
  detailSlot: ReactNode;
}

const MobileCommunityLayout: FC<MobileCommunityLayoutProps> = ({ isDetailOpen, listSlot, detailSlot }) => {
  return (
    <Container>
      <ListSlotBox>{listSlot}</ListSlotBox>
      <DetailSlotBox initial={{ x: '100%' }} animate={{ x: isDetailOpen ? '0%' : '100%' }} transition={{ bounce: 0 }}>
        {detailSlot}
      </DetailSlotBox>
    </Container>
  );
};

export default MobileCommunityLayout;

const Container = styled.div`
  position: relative;
  height: ${layoutCSSVariable.contentAreaHeight};
  overflow: hidden;
`;

const ListSlotBox = styled.div`
  position: absolute;
  inset: 0;
`;

const DetailSlotBox = styled(m.div)`
  position: absolute;
  inset: 0;
`;
