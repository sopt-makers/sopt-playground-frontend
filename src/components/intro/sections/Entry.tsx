import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import { playgroundLink } from '@/constants/links';
import { textStyles } from '@/styles/typography';

interface EntryProps {}

const Entry: FC<EntryProps> = ({}) => {
  return (
    <Container>
      <Title>
        3,000여 명의 SOPT 구성원들과
        <br />
        <Highlight>연결</Highlight>되는 경험을 하고 싶다면
      </Title>
      <RegisterLink href={playgroundLink.login()}>
        지금 회원가입하고 SOPT 구성원 보러가기
        <StyledArrowIcon />
      </RegisterLink>
    </Container>
  );
};

export default Entry;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 146px;
  min-height: 700px;
`;

const Title = styled.h2`
  margin-top: 200px;
  text-align: center;
  line-height: 136%;

  ${textStyles.SUIT_60_B};
`;

const RegisterLink = styled(Link)`
  display: flex;
  gap: 6px;
  align-items: center;
  transition: 0.3s background-color;
  margin-top: 50px;
  border: 1px solid #5ddbff;
  border-radius: 10px;
  padding: 13px 20px;

  ${textStyles.SUIT_20_R}

  &:hover {
    background-color: rgb(93 219 255 / 15%);
  }
`;

const Highlight = styled.span`
  color: #5ddbff;
`;

const StyledArrowIcon = styled(ArrowIcon)``;

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={34} height={34} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.975 13.175c-1.036 1.036-2.924 1.036-3.96 0l-.426-.425-.85.85.425.425c.754.754 1.792 1.13 2.83 1.13L12.75 20.4l.85.85 5.244-5.244c0 1.038.377 2.076 1.131 2.83l.425.425.85-.85-.425-.425c-1.036-1.037-1.036-2.925 0-3.961l.425-.425-.85-.85-.425.425z'
        fill='#fff'
      />
      <circle cx={17} cy={17} r={11.521} transform='rotate(-45 17 17)' stroke='#fff' />
    </svg>
  );
}
