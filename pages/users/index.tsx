import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import Text from '@/components/common/Text';
import UserCard from '@/components/users/main/UserCard';
import UserRoleMenu from '@/components/users/main/UserRoleMenu';
import UserRoleDropdown from '@/components/users/main/UserRoleMenu/UserRoleDropdown';
import useUserRoleMenu from '@/components/users/main/UserRoleMenu/useUserRoleMenu';
import useMediaQuery from '@/hooks/useMediaQuery';
import { colors } from '@/styles/colors';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { setLayout } from '@/utils/layout';

const CARDS = [
  {
    name: '유예린',
    role: '디자인',
    description: '행복을 주는 UI/UX 디자이너',
    image: '',
    generation: 30,
  },
  {
    name: '이준호',
    role: '웹',
    description: '웃음을 주는 웹 개발자',
    image: '',
    generation: 28,
  },
  {
    name: '이정연',
    role: 'PM',
    description: '행복을 주는 당근',
    image: '',
    generation: 30,
  },
  {
    name: '박건영',
    role: '인프라',
    description: '커비를 조아해요',
    image: '',
    generation: 29,
  },
];

const UserPage: FC = () => {
  const { menuValue, onSelect } = useUserRoleMenu();
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);

  return (
    <AuthRequired>
      <StyledContainer>
        <StyledContent>
          <IntroducePannel>
            <LeftContainer>
              <StyledImage src='/icons/icon-doublestar.svg' alt='' />
              <TextContainer>
                <Text typography={isMobile ? 'SUIT_22_R' : 'SUIT_20_R'}>이정연님, 안녕하세요!</Text>
                <Text typography={isMobile ? 'SUIT_22_B' : 'SUIT_24_B'}>내 프로필도 등록해보시겠어요?</Text>
              </TextContainer>
            </LeftContainer>
            <ButtonContainer>
              <Link href='/projects/upload' passHref>
                <UploadButton>프로젝트 업로드</UploadButton>
              </Link>
              <Link href='/users/upload' passHref>
                <ProfileButton>프로필 추가</ProfileButton>
              </Link>
            </ButtonContainer>
          </IntroducePannel>

          <StyledMain>
            <StyledDivider />
            {!isMobile ? (
              <UserRoleMenu value={menuValue} onSelect={onSelect} />
            ) : (
              <StyledUserRoleDropdown value={menuValue} onSelect={onSelect} />
            )}
            <StyledCardWrapper>
              {CARDS.map((card, index) => (
                <UserCard
                  key={index}
                  name={card.name}
                  role={card.role}
                  generation={card.generation}
                  description={card.description}
                  image={card.image}
                />
              ))}
            </StyledCardWrapper>
          </StyledMain>
        </StyledContent>
      </StyledContainer>
    </AuthRequired>
  );
};

setLayout(UserPage, (page) => (
  <>
    <Header />
    {page}
  </>
));

export default UserPage;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 45px;
  }
`;

const StyledContent = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const IntroducePannel = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 42px;
  background-color: ${colors.black80};
  padding: 59px 64px;
  width: 100%;
  height: 208px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
    background-color: ${colors.black100};
    padding: 0;
    height: auto;
  }
`;

const StyledImage = styled.img`
  width: 84px;
  height: 84px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-left: 20px;
    width: 40px;
    height: 40px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 20px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: row-reverse;
    justify-content: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: center;
    margin-top: 24px;
  }
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  padding: 15px 0;
  width: 160px;

  ${textStyles.SUIT_14_SB}
`;

const UploadButton = styled.a`
  ${buttonStyle}

  background-color: ${colors.black60};
  color: ${colors.gray30};
`;

const ProfileButton = styled.a`
  ${buttonStyle}

  background-color: ${colors.purpledim100};
  color: ${colors.purple40};
`;

const StyledMain = styled.main`
  display: flex;
  justify-content: space-around;
  margin-top: 90px;

  @media ${MOBILE_MEDIA_QUERY} {
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 23px;
    padding: 0 20px;
  }
`;

const StyledDivider = styled.div`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
    border: 0.5px solid ${colors.black80};
    width: 100%;
  }
`;

const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-items: center;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-rows: repeat(auto-fit, minmax(163px, auto));
    grid-gap: 12px 8px;
    margin-top: 102px;

    & > div {
      width: 100%;
    }
  }
  @media screen and (max-width: 375px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledUserRoleDropdown = styled(UserRoleDropdown)`
  position: absolute;
  top: 32px;
  padding: inherit;
  height: auto;

  & > li {
    width: 100%;
  }
`;
