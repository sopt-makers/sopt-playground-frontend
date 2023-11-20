import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

interface MobileCommunityLayoutProps {
  listSlot: ReactNode;
}

const MobileCommunityLayout: FC<MobileCommunityLayoutProps> = ({ listSlot }) => {
  return (
    <Container>
      <ListSlotBox>{listSlot}</ListSlotBox>
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
