import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC, ReactNode } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import MenuEntryIcons from '@/components/feed/list/MenuEntryIcons/MenuEntryIcons';
import { zIndex } from '@/styles/zIndex';
import WordChainEntry from '@/components/wordchain/WordchainEntry/WordChainEntry';

interface MobileCommunityLayoutProps {
  isDetailOpen: boolean;
  listSlot: ReactNode;
  detailSlot: ReactNode;
}

const MobileCommunityLayout: FC<MobileCommunityLayoutProps> = ({ listSlot, detailSlot, isDetailOpen }) => {
  return (
    <Container>
      <StyledMenuEntryIcons />
      <WordChainWrapper>
        <WordChainEntry />
      </WordChainWrapper>
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

const WordChainWrapper = styled.div`
  margin: 0 auto;
  padding: 0 20px;
`;

const Container = styled.div`
  position: relative;
`;

const StyledMenuEntryIcons = styled(MenuEntryIcons)`
  margin: 36px 0 10px;
`;

const ListSlotBox = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${zIndex.헤더};
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
