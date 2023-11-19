import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
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
      <X>
        <DetailSlotBox initial={{ x: '100%' }} animate={{ x: isDetailOpen ? '0%' : '100%' }} transition={{ bounce: 0 }}>
          {detailSlot}
        </DetailSlotBox>
      </X>
    </Container>
  );
};

export default MobileCommunityLayout;

const Container = styled.div`
  position: relative;
`;

const ListSlotBox = styled.div`
  position: relative;
`;

const X = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
`;

const DetailSlotBox = styled(m.div)`
  background-color: ${colors.background};
  width: 100%;
  height: 100%;
  height: ${layoutCSSVariable.contentAreaHeight};
`;
