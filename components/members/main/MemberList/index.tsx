import { css } from '@emotion/react';
import styled from '@emotion/styled';
import uniq from 'lodash/uniq';
import Link from 'next/link';
import { FC } from 'react';

import { useGetMemberOfMe, useGetMemberProfile } from '@/apiHooks/members';
import Text from '@/components/common/Text';
import MemberCard from '@/components/members/main/MemberCard';
import MemberRoleMenu from '@/components/members/main/MemberRoleMenu';
import MemberRoleDropdown from '@/components/members/main/MemberRoleMenu/MemberRoleDropdown';
import useMemberRoleMenu from '@/components/members/main/MemberRoleMenu/useMemberRoleMenu';
import { LATEST_GENERATION } from '@/constants/generation';
import { playgroundLink } from '@/constants/links';
import useMediaQuery from '@/hooks/useMediaQuery';
import { colors } from '@/styles/colors';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const MemberList: FC = () => {
  const { menuValue: filter, onSelect } = useMemberRoleMenu();
  const { data: memberProfileData } = useGetMemberProfile({
    filter,
  });
  const { data: memberOfMeData } = useGetMemberOfMe();
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);

  const profiles = memberProfileData?.map((member) => ({
    ...member,
    isActive: member.activities.map(({ generation }) => generation).includes(LATEST_GENERATION),
    part: uniq(member.activities.map(({ part }) => part)).join(' / '),
  }));
  const hasProfile = !!memberOfMeData?.hasProfile;

  return (
    <StyledContainer hasProfile={hasProfile}>
      <StyledContent>
        {memberOfMeData && !hasProfile && (
          <IntroducePanel>
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
              <Link href={playgroundLink.projectUpload()} passHref legacyBehavior>
                <UploadButton>프로젝트 업로드</UploadButton>
              </Link>
              <Link href={playgroundLink.memberUpload()} passHref legacyBehavior>
                <ProfileButton>프로필 추가</ProfileButton>
              </Link>
            </ButtonContainer>
          </IntroducePanel>
        )}

        <StyledMain hasProfile={hasProfile}>
          {!hasProfile && <StyledDivider />}
          {!isMobile ? (
            <StyledMemberRoleMenu value={filter} onSelect={onSelect} />
          ) : (
            <StyledMemberRoleDropdown value={filter} onSelect={onSelect} />
          )}
          {/* TODO(@jun): 로딩 추가 */}
          <StyledCardWrapper>
            {profiles?.map((profile) => (
              <Link key={profile.id} href={playgroundLink.memberDetail(profile.id)} passHref>
                <MemberCard
                  name={profile.name}
                  part={profile.part}
                  isActiveGeneration={profile.isActive}
                  introduction={profile.introduction}
                  image={profile.profileImage}
                />
              </Link>
            ))}
          </StyledCardWrapper>
        </StyledMain>
      </StyledContent>
    </StyledContainer>
  );
};

export default MemberList;

const StyledContainer = styled.div<{ hasProfile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ hasProfile }) => !hasProfile && `margin-top: 120px;`}

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ hasProfile }) => !hasProfile && `margin-top: 45px;`}
  }
`;

const StyledContent = styled.div`
  width: 100%;
  max-width: 1000px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const IntroducePanel = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 92px;
  border-radius: 42px;
  background-color: ${colors.black80};
  padding: 59px 64px;
  width: 100%;
  height: 208px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
    margin-bottom: 56px;
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

const StyledMain = styled.main<{ hasProfile?: boolean }>`
  display: flex;
  position: relative;
  column-gap: 30px;

  ${({ hasProfile }) => hasProfile && `margin: 90px 0`};

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }
`;

const StyledDivider = styled.div`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
    margin: 23.5px 0 32.5px;
    border: 0.5px solid ${colors.black80};
    width: 100%;
  }
`;

const IPHONE_XR = 414;
const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: start;
  justify-items: center;

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px 8px;

    & > div {
      width: 100%;
    }
  }
  @media screen and (max-width: ${IPHONE_XR}px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledMemberRoleMenu = styled(MemberRoleMenu)`
  min-width: 225px;
`;

const StyledMemberRoleDropdown = styled(MemberRoleDropdown)`
  margin-bottom: 16px;
  max-width: 505px;
`;
