import { css } from '@emotion/react';
import styled from '@emotion/styled';
import uniq from 'lodash/uniq';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';

import { useGetMemberOfMe, useGetMemberProfile } from '@/api';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import MemberCard from '@/components/members/main/MemberCard';
import MemberRoleMenu, { MenuValue } from '@/components/members/main/MemberRoleMenu';
import MemberRoleDropdown from '@/components/members/main/MemberRoleMenu/MemberRoleDropdown';
import useMemberRoleMenu from '@/components/members/main/MemberRoleMenu/useMemberRoleMenu';
import { LATEST_GENERATION } from '@/constants/generation';
import { playgroundLink } from '@/constants/links';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useMediaQuery from '@/hooks/useMediaQuery';
import { colors } from '@/styles/colors';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const PAGE_LIMIT = 30;

const MemberList: FC = () => {
  const { logClickEvent } = useEventLogger();

  const { menuValue: filter, onSelect } = useMemberRoleMenu();
  const { data: memberOfMeData } = useGetMemberOfMe();
  const router = useRouter();
  const { ref, isVisible } = useIntersectionObserver();
  const { data: memberProfileData, fetchNextPage } = useGetMemberProfile({
    limit: PAGE_LIMIT,
    queryKey: router.asPath,
  });

  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);
  const handleSelect = (value: MenuValue) => {
    onSelect(value);
    const url = new URL(window.location.href);
    url.searchParams.set('filter', value.toString());
    if (value === MenuValue.ALL) {
      url.searchParams.delete('filter');
    }
    router.push(url);
  };

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible, fetchNextPage]);

  const profiles = memberProfileData?.pages.map((members) =>
    members.map((member) => ({
      ...member,
      isActive: member.activities.map(({ generation }) => generation).includes(LATEST_GENERATION),
      part: uniq(member.activities.map(({ part }) => part)).join(' / '),
    })),
  );
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
            <StyledMemberRoleMenu value={filter} onSelect={handleSelect} />
          ) : (
            <StyledMemberRoleDropdown value={filter} onSelect={handleSelect} />
          )}
          {/* TODO(@jun): 로딩 추가 */}
          <StyledCardWrapper>
            {profiles?.map((profiles, index) => (
              <React.Fragment key={index}>
                {profiles.map((profile) => (
                  <Link
                    key={profile.id}
                    href={playgroundLink.memberDetail(profile.id)}
                    onClick={() => logClickEvent('memberCard', { id: profile.id, name: profile.name })}
                  >
                    <MemberCard
                      name={profile.name}
                      part={profile.part}
                      isActiveGeneration={profile.isActive}
                      introduction={profile.introduction}
                      image={profile.profileImage}
                    />
                  </Link>
                ))}
              </React.Fragment>
            ))}
            <Target ref={ref} />
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

  ${({ hasProfile }) =>
    hasProfile &&
    css`
      margin: 90px 0;
    `};

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

const Target = styled.div``;
