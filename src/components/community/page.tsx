import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { m } from 'framer-motion';
import { FC } from 'react';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';

import { layoutCSSVariable } from '@/components/layout/utils';

const CommunityPage: FC = () => {
  const [category, setCategory] = useQueryParam('category', withDefault(StringParam, ''));
  const [feed, setFeed] = useQueryParam('feed', withDefault(StringParam, ''));
  const [tag, setTag] = useQueryParam('tag', withDefault(StringParam, ''));

  return (
    <Container>
      <ListSlot>
        <button onClick={() => setFeed('asdf')}>SET FEED </button>
        <button onClick={() => setFeed('')}>UNSET FEED </button>
      </ListSlot>
      <DetailSlot initial={{ width: 0 }} animate={{ width: feed !== '' ? 560 : 0 }} transition={{ bounce: 0 }}>
        <DetailSlotInner>{feed}</DetailSlotInner>
      </DetailSlot>
    </Container>
  );
};

export default CommunityPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${layoutCSSVariable.contentAreaHeight};
`;

const ListSlot = styled.div`
  flex: 1 1 0;
  background-color: ${colors.green400};
  max-width: 560px;
  height: 100%;
  overflow-y: scroll;
`;

const DetailSlot = styled(m.div)`
  position: relative;
  background-color: ${colors.blue500};
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
  min-width: 560px;
  overflow-y: scroll;
`;
