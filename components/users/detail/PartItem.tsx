import styled from '@emotion/styled';
import AddIcon from 'public/icons/icon-add.svg';
import { FC, ReactChild } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

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
    <>
      <Container className='pc-only'>
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

      <Container className='mobile-only'>
        <Contents>
          <Thumbnail />
          <Title>
            <div className='year'>{year}</div>
            <div className='part'>{part}</div>
          </Title>
        </Contents>
        <Badges>
          {other && <Badge>{other.name}</Badge>}
          {appjam ? <Badge>{appjam.name}</Badge> : <EmptyBadge>앱잼 팀 등록하기</EmptyBadge>}
          {sopkathon ? <Badge>{sopkathon.name}</Badge> : <EmptyBadge>솝커톤 팀 등록하기</EmptyBadge>}
        </Badges>
      </Container>
    </>
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
  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
  }
`;

const Thumbnail = styled.div`
  border-radius: 14px;
  background: #000;
  width: 84px;
  height: 84px;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 60px;
    height: 60px;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60px;
  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: row;
    align-items: center;
    justify-content: start;
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 8px;
    margin-left: 14px;
    font-size: 16px;
  }
`;

const Badges = styled.div`
  display: flex;
  gap: 8px;
  @media ${MOBILE_MEDIA_QUERY} {
    flex-wrap: wrap;
    gap: 12px 8px;
    margin-top: 12px;
  }
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
  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
    width: fit-content;
    white-space: nowrap;
  }
`;

const EmptyBadgeContainer = styled(Badge)`
  border: 1px dashed #606265;
  border-radius: 13px;
  background: #2c2d2e;
  cursor: pointer;
`;

export default PartItem;
