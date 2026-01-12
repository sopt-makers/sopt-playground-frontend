import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

export default function AskReply() {
  return <Container>AskReply</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 12px;
  background-color: ${colors.gray900};
  padding: 12px 14px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
