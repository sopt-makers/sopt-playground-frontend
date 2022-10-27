import styled from '@emotion/styled';
import AddIcon from 'public/icons/icon-add.svg';
import { FC, ReactChild } from 'react';

type PartItemProps = {
  imgSrc: string;
  year: string;
  part: string;
  appjam?: {
    id: number;
    name: string;
  };
  sopkathon?: {
    id: number;
    name: string;
  };
  other?: {
    id: number;
    name: string;
  };
};

const PartItem: FC<PartItemProps> = (project) => {
  const { year, part, appjam, sopkathon, other } = project;
  return (
    <Container>
      <Thumbnail />
      <Contents>
        <Title>
          <div className='year'>{year}</div>
          <div className='part'>{part}</div>
        </Title>
        <Badges>
          {other && <Badge>{other.name}</Badge>}
          {appjam ? <Badge>{appjam.name}</Badge> : <EmptyBadge>앱잼 팀 등록하기</EmptyBadge>}
          {sopkathon ? <Badge>{sopkathon.name}</Badge> : <EmptyBadge>솝커톤 팀 등록하기</EmptyBadge>}
        </Badges>
      </Contents>
    </Container>
  );
};

const EmptyBadge: FC<{ children: ReactChild }> = ({ children }) => {
  return (
    <EmptyBadgeContainer>
      <AddIcon />
      {children}
    </EmptyBadgeContainer>
  );
};

const Container = styled.div`
  display: flex;
  gap: 29px;
  align-items: center;
`;

const Thumbnail = styled.div`
  border-radius: 14px;
  background: #000;
  width: 84px;
  height: 84px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60px;
`;

const Title = styled.div`
  display: flex;
  gap: 11px;
  line-height: 100%;
  letter-spacing: -0.01em;
  font-size: 18px;

  .year {
    color: #fff;
    font-weight: 700;
  }

  .part {
    color: #ced1d2;
    font-weight: 500;
  }
`;

const Badges = styled.div`
  display: flex;
  gap: 8px;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  border-radius: 13px;
  background: #8040ff;
  padding: 6px 14px;
  line-height: 100%;
  letter-spacing: -0.01em;
  font-size: 14px;
  font-weight: 500;
`;

const EmptyBadgeContainer = styled(Badge)`
  border: 1px dashed #606265;
  border-radius: 13px;
  background: #2c2d2e;
  cursor: pointer;
`;

export default PartItem;
