import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { m } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
interface MobileCommunityLayoutProps {
  isDetailOpen: boolean;
  listSlot: ReactNode;
  detailSlot: ReactNode;
}

const MobileCommunityLayout: FC<MobileCommunityLayoutProps> = ({ isDetailOpen, listSlot, detailSlot }) => {
  return (
    <Container>
      <ListSlotBox>{listSlot}</ListSlotBox>
      <FullLayer>
        <DetailSlotBox initial={{ x: '100%' }} animate={{ x: isDetailOpen ? '0%' : '100%' }} transition={{ bounce: 0 }}>
          {isDetailOpen ? <RemoveScroll>{detailSlot}</RemoveScroll> : null}
        </DetailSlotBox>
      </FullLayer>
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

const FullLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  overflow: hidden;
`;

const DetailSlotBox = styled(m.div)`
  background-color: ${colors.background};
  width: 100%;
  height: 100%;
`;
