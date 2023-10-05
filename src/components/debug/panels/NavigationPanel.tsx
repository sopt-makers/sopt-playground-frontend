import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import Button from '@/components/common/Button';
import Panel from '@/components/debug/Panel';
import { playgroundLink } from '@/constants/links';
import { textStyles } from '@/styles/typography';

const NavigationPanel: FC = () => {
  return (
    <Panel title='주요 페이지 이동'>
      <PanelContent>
        <Link href={playgroundLink.memberList()} passHref legacyBehavior>
          <StyledButton variant='primary'>홈</StyledButton>
        </Link>
        <Link href={playgroundLink.login()} passHref legacyBehavior>
          <StyledButton variant='primary'>로그인</StyledButton>
        </Link>
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

const StyledButton = styled(Button)`
  width: 100%;
  line-height: 100%;

  ${textStyles.SUIT_16_M}
`;
