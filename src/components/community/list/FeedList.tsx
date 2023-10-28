import styled from '@emotion/styled';
import { FC } from 'react';

import CategorySelect from '@/components/community/list/CategorySelect';
import { FeedDetailLink } from '@/components/community/queryParam';

interface FeedListProps {}

const FeedList: FC<FeedListProps> = ({}) => {
  return (
    <Container>
      <CategorySelect
        categories={[
          {
            id: 'part',
            name: '파트',
            hasAllCategory: false,
            tags: [
              { id: 'PM', name: '기획' },
              { id: 'WEB', name: '웹' },
              { id: 'SERVER', name: '서버' },
            ],
          },
          {
            id: 'sopt',
            name: 'SOPT활동',
            hasAllCategory: true,
            tags: [
              { id: 'SOPK', name: '솝커톤' },
              { id: 'APPJAM', name: '앱잼' },
            ],
          },
        ]}
      />
      <ListArea>
        <ListAreaInner>
          {[...new Array(100)].map((_, idx) => (
            <div key={idx} style={{ height: '80px' }}>
              <FeedDetailLink feedId={`feed${idx}`}>Feed {idx}</FeedDetailLink>
            </div>
          ))}
        </ListAreaInner>
      </ListArea>
    </Container>
  );
};

export default FeedList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ListArea = styled.div`
  position: relative;
  flex: 1 1 0;
`;

const ListAreaInner = styled.div`
  position: absolute;
  inset: 0;
  overflow-x: hidden;
  overflow-y: scroll;
`;
