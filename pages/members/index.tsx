import { css } from '@emotion/react';
import styled from '@emotion/styled';
import uniq from 'lodash/uniq';
import Link from 'next/link';
import { FC } from 'react';

import { useGetMemberOfMe, useGetMemberProfile } from '@/apiHooks/members';
import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import Text from '@/components/common/Text';
import MemberCard from '@/components/members/main/MemberCard';
import MemberRoleMenu from '@/components/members/main/MemberRoleMenu';
import MemberRoleDropdown from '@/components/members/main/MemberRoleMenu/MemberRoleDropdown';
import useMemberRoleMenu from '@/components/members/main/MemberRoleMenu/useMemberRoleMenu';
import { LATEST_GENERATION } from '@/constants/generation';
import useMediaQuery from '@/hooks/useMediaQuery';
import { colors } from '@/styles/colors';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { setLayout } from '@/utils/layout';

const UserPage: FC = () => {
  // const { menuValue, onSelect } = useUserRoleMenu(); TODO: 서버 필터스펙 개발 이후 주석 해제
  const { data: memberProfileData } = useGetMemberProfile();
  const { data: memberOfMeData } = useGetMemberOfMe();
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);

  const profiles = memberProfileData?.map((member) => ({
    ...member,
    isActive: member.activities.map(({ generation }) => generation).includes(LATEST_GENERATION),
    part: uniq(member.activities.map(({ part }) => part)).join(' / '),
  }));

  if (!memberProfileData) {
    return null;
  }

  return (
    <AuthRequired>
      <StyledContainer>
        <StyledContent>
          <IntroducePannel>
            <LeftContainer>
              <StyledImage src='/icons/icon-doublestar.svg' alt='' />
              <TextContainer>
                <Text typography={isMobile ? 'SUIT_22_R' : 'SUIT_20_R'}>{`${
                  memberOfMeData?.name ?? ''
                }님, 안녕하세요!`}</Text>
                <Text typography={isMobile ? 'SUIT_22_B' : 'SUIT_24_B'}>내 프로필도 등록해보시겠어요?</Text>
              </TextContainer>
            </LeftContainer>
            <ButtonContainer>
              <Link href='/projects/upload' passHref>
                <UploadButton>프로젝트 업로드</UploadButton>
              </Link>
              <Link href='/members/upload' passHref>
                <ProfileButton>프로필 추가</ProfileButton>
              </Link>
            </ButtonContainer>
          </IntroducePannel>

          <StyledMain>
            <StyledDivider />
            {/* {!isMobile ? (
              <UserRoleMenu value={menuValue} onSelect={onSelect} />
            ) : (
              <StyledUserRoleDropdown value={menuValue} onSelect={onSelect} />
            )} */}
            <StyledCardWrapper>
              {profiles?.map((profile) => (
                <a key={profile.id} href={`/members/${profile.id}`}>
                  <MemberCard
                    name={profile.name}
                    part={profile.part}
                    isActiveGeneration={profile.isActive}
                    introduction={profile.introduction}
                    image={profile.profileImage}
                  />
                </a>
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
  margin: 90px 0;

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
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-items: start;
  justify-items: center;

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px 8px;
    margin-top: 32.5px;

    & > div {
      width: 100%;
    }
  }
  @media screen and (max-width: 375px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

// const StyledUserRoleDropdown = styled(UserRoleDropdown)`
//   position: absolute;
//   top: 32px;
//   padding: inherit;
//   height: auto;

//   & > li {
//     width: 100%;
//   }
// `;
