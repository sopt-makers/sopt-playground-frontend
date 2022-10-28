import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import Header from '@/components/common/Header';
import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import { setLayout } from '@/utils/layout';

const UserPage: FC = () => {
  return (
    <StyledContainer>
      <IntroducePannel>
        <LeftContainer>
          <StyledImage src={'/icons/icon-doublestar.svg'} alt='' />
          <TextContainer>
            <Text typography='SUIT_28_R'>이정연님, 안녕하세요!</Text>
            <Text typography='SUIT_28_B'>내 프로필도 등록해보시겠어요?</Text>
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
    </StyledContainer>
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
  width: 100%;
`;

const IntroducePannel = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 42px;
  background-color: ${colors.black80};
  padding: 59px 64px;
  width: 100%;
  max-width: 1198px;
  height: 208px;
`;

const StyledImage = styled.img`
  width: 94px;
  height: 94px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-left: 20px;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  padding: 16px 0;
  width: 185px;

  ${textStyles.SUIT_16_SB}
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
