import styled from '@emotion/styled';

interface RecruitmentProps {
  term: number;
  deadlineDate: Date;
}

export default function RecruitmentBanner({ term }: RecruitmentProps) {
  return (
    <Container>
      <RecruitmentText>{`🚀 makers ${term}기를 모집해요`}</RecruitmentText>
      <Deadline>{`지원 마감까지 6일 03:12:01  >`}</Deadline>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  background: linear-gradient(164.77deg, #010101 19.93%, #185eff 141.3%), #000;
  padding: 25px 0 19px;
`;

const RecruitmentText = styled.div`
  color: #fff;
  font-size: 26px;
  font-weight: 700;
`;

const Deadline = styled.div`
  color: rgb(255 255 255 / 70%);
  font-size: 16px;
  font-weight: 500;
`;
