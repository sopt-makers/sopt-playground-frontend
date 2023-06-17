import styled from '@emotion/styled';

import AuthRequired from '@/components/auth/AuthRequired';
import WordchainChatting from '@/components/wordchain/WordchainChatting';
import { colors } from '@/styles/colors';

export default function WordchainPage() {
  return (
    <AuthRequired>
      <Container>
        <Title>SOPT와 함께하는 끝말잇기</Title>
        <StyledWordchainChatting />
        <Sidebar>Sidebar</Sidebar>
      </Container>
    </AuthRequired>
  );
}

const Container = styled.div`
  display: grid;
  grid:
    [row1-start] 'title title' min-content [row1-end]
    [row2-start] 'wordchainChatting sidebar' 728px [row2-end]
    / 790px 324px;
`;

const Title = styled.h1`
  grid-area: title;
`;

const Sidebar = styled.aside`
  grid-area: sidebar;
  background-color: ${colors.black80};
`;

const StyledWordchainChatting = styled(WordchainChatting)`
  grid-area: wordchainChatting;
`;
