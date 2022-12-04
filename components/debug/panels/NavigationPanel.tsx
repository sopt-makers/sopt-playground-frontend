import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import Button from '@/components/common/Button';
import Panel from '@/components/debug/Panel';
import { playgroundLink } from '@/constants/links';

const NavigationPanel: FC = () => {
  return (
    <Panel title='주요 페이지 이동'>
      <PanelContent>
        <Link href={playgroundLink.memberList()} passHref>
          <Button variant='primary'>홈</Button>
        </Link>
        <Link href={playgroundLink.login()} passHref>
          <Button variant='primary'>로그인</Button>
        </Link>
      </PanelContent>
    </Panel>
  );
};

export default NavigationPanel;

const PanelContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
`;
