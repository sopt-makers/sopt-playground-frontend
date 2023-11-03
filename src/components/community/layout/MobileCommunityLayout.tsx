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
      <DetailSlotBox initial={{ x: '100%' }} animate={{ x: isDetailOpen ? '0%' : '100%' }} transition={{ bounce: 0 }}>
        {detailSlot}
      </DetailSlotBox>
    </Container>
  );
};

export default MobileCommunityLayout;

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const ListSlotBox = styled.div`
  position: relative;
`;

const DetailSlotBox = styled(m.div)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background-color: ${colors.background};
  height: ${layoutCSSVariable.contentAreaHeight};
`;
