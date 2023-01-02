import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '@/styles/colors';

const MemberCardSkeleton: React.FC = () => {
  return (
    <Skeleton.Card>
      <Skeleton.Header />
      <Skeleton.Content>
        <Skeleton.Name />
        <Skeleton.Part />
        <Skeleton.Introduction />
      </Skeleton.Content>
    </Skeleton.Card>
  );
};

export default MemberCardSkeleton;

const loading = keyframes`
  0% {
    background-color: hsl(200, 20%, 70%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
`;
const Skeleton = {
  Card: styled.div`
    position: relative;
    border-radius: 30px;
    background-color: ${colors.gray100};
    cursor: progress;
    width: 235px;
    height: 370px;
  `,
  Header: styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    border-radius: 30px 30px 0 0;
    background: rgb(255 255 255 / 10%);
    background-color: rgb(255 255 255 / 5%);
    width: 100%;
    height: 234px;
    overflow: hidden;
    animation: ${loading} 1s linear infinite alternate;
  `,
  Content: styled.div`
    padding: 19px 27px 30px;
  `,
  Name: styled.div`
    transition: background-color 0.3s;
    border-radius: 8px;
    background: rgb(255 255 255 / 10%);
    width: 40px;
    height: 24px;
    animation: ${loading} 1s linear infinite alternate;
  `,
  Part: styled.div`
    transition: background-color 0.3s;
    margin-top: 12px;
    border-radius: 8px;
    background: rgb(255 255 255 / 10%);
    width: 60px;
    height: 16px;
    animation: ${loading} 1s linear infinite alternate;
  `,
  Introduction: styled.div`
    transition: background-color 0.3s;
    margin-top: 12px;
    border-radius: 8px;
    background: rgb(255 255 255 / 10%);
    width: 100%;
    height: 16px;
    animation: ${loading} 1s linear infinite alternate;
  `,
};
