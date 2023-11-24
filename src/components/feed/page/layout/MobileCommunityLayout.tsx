import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC, ReactNode } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

interface MobileCommunityLayoutProps {
  isDetailOpen: boolean;
  listSlot: ReactNode;
  detailSlot: ReactNode;
}

const MobileCommunityLayout: FC<MobileCommunityLayoutProps> = ({ listSlot, detailSlot, isDetailOpen }) => {
  return (
    <Container>
      <ListSlotBox>{listSlot}</ListSlotBox>
      {isDetailOpen && (
        <Overlay>
          <RemoveScroll>
            <DetailSlot>{detailSlot}</DetailSlot>
          </RemoveScroll>
        </Overlay>
      )}
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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  overflow: hidden;
`;

const DetailSlot = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: ${colors.background};
  width: 100vw;
`;
