import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { m } from 'framer-motion';
import { FC, ReactNode } from 'react';

import { layoutCSSVariable } from '@/components/layout/utils';
import WordChainEntry from '@/components/wordchain/WordchainEntry/WordChainEntry';

interface DesktopCommunityLayoutProps {
  isDetailOpen: boolean;
  listSlot: ReactNode;
  detailSlot: ReactNode;
}

const DETAIL_SLOT_WIDTH = 560;

const DesktopCommunityLayout: FC<DesktopCommunityLayoutProps> = ({ isDetailOpen, listSlot, detailSlot }) => {
  return (
    <div style={{ margin: '0 30px' }}>
      <WordChainWrapper>
        <WordChainEntry />
      </WordChainWrapper>
      <Container>
        <ListSlot isDetailOpen={isDetailOpen}>{listSlot}</ListSlot>
        <DetailSlot
          initial={{ width: isDetailOpen ? DETAIL_SLOT_WIDTH : 0 }}
          animate={{ width: isDetailOpen ? DETAIL_SLOT_WIDTH : 0 }}
          transition={{ bounce: 0 }}
        >
          <DetailSlotSticky>
            <DetailSlotInner isDetailOpen={isDetailOpen}>{detailSlot}</DetailSlotInner>
          </DetailSlotSticky>
        </DetailSlot>
      </Container>
    </div>
  );
};

export default DesktopCommunityLayout;

const WordChainWrapper = styled.div`
  margin: 0 auto;
  min-width: 0;
  max-width: 560px;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
`;

const ListSlot = styled.div<{ isDetailOpen: boolean }>`
  flex: 1 1 0;
  border-top: 1px solid ${colors.gray800};
  border-right: 1px solid ${colors.gray800};
  border-left: 1px solid ${colors.gray800};
  border-radius: ${({ isDetailOpen }) => (isDetailOpen ? '14px 0 0 0' : '14px 14px 0 0')};
  min-width: 0;
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

const DetailSlotInner = styled.div<{ isDetailOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid ${colors.gray800};
  border-right: 1px solid ${colors.gray800};
  border-radius: 0 14px 0 0;
  width: ${DETAIL_SLOT_WIDTH}px;
  min-width: ${DETAIL_SLOT_WIDTH}px;
`;
