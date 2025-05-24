import styled from '@emotion/styled';

const Hot = () => {
  return (
    <HotContianer>
      <div>질문글</div>
      <div>인기글</div>
      <div>솝티클</div>
    </HotContianer>
  );
};

export default Hot;

const HotContianer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 16px;
`;
