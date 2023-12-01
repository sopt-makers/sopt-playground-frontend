import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import Panel from '@/components/debug/Panel';
import { ActionBox, ActionButton } from '@/components/debug/styles';
import { playgroundLink } from '@/constants/links';

const NavigationPanel: FC = () => {
  return (
    <Panel title='주요 페이지 이동'>
      <PanelContent>
        <ActionBox>
          <Link href={playgroundLink.feedList()} passHref legacyBehavior>
            <ActionButton variant='primary'>홈</ActionButton>
          </Link>
          <Link href={playgroundLink.login()} passHref legacyBehavior>
            <ActionButton variant='primary'>로그인</ActionButton>
          </Link>
        </ActionBox>
      </PanelContent>
    </Panel>
  );
};

export default NavigationPanel;

const PanelContent = styled.div`
  display: flex;
  gap: 10px;
  padding-bottom: 15px;
  width: 100%;
`;
