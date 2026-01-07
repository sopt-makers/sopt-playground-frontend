import styled from '@emotion/styled';

interface AskTabContentProps {
  memberId: string;
}

const AskTabContent = ({ memberId }: AskTabContentProps) => {
  return <Container></Container>;
};

export default AskTabContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
