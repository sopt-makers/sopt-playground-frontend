import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconAlertTriangle, IconBirthdaySecondary, IconMail, IconPhone, IconUser, IconUserX } from '@sopt-makers/icons';
import { Flex } from '@toss/emotion-utils';
import dayjs from 'dayjs';
import { uniq } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import EditIcon from 'public/icons/icon-edit.svg';

import { ProfileDetail } from '@/api/endpoint_LEGACY/members/type';
import ResizedImage from '@/components/common/ResizedImage';
import Responsive from '@/components/common/Responsive';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import FeedDropdown from '@/components/feed/common/FeedDropdown';
import { useBlockMember } from '@/components/members/hooks/useBlockMember';
import { useReportMember } from '@/components/members/hooks/useReportMember';
import { DEFAULT_DATE } from '@/components/members/upload/constants';
import IconCoffee from '@/public/icons/icon-coffee.svg';
import IconMore from '@/public/icons/icon-dots-vertical.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { safeParseInt } from '@/utils';

interface ProfileSectionProps {
  profile: ProfileDetail;
  memberId: string;
}

const convertBirthdayFormat = (birthday?: string) => {
  // FIXME: 서버쪽에 YYYY-MM-DD 형태로 무조건 업로드시 전송해줘야 하는 이슈가 있어서,
  // 생년월일을 보내지 않았을 경우에 DEFAULT_DATE를 전송하도록 임시처리 해 두었습니다. 이를 클라에서 보여주기 위해 대응합니다.
  if (birthday) {
    const isDefaultDay = dayjs(birthday).isSame(dayjs(DEFAULT_DATE));
    return isDefaultDay ? '' : dayjs(birthday).format('YYYY.MM.DD');
  }
  return '';
};

const ContactSection = ({ profile }: { profile: ProfileDetail }) => {
  return (
    <ContactWrapper>
      {(profile.birthday || profile.phone) && (
        <ContactTopWrapper>
          {profile.birthday && (
            <ContactItem>
              <StyledIconBirth />
              <div>{convertBirthdayFormat(profile.birthday)}</div>
            </ContactItem>
          )}
          {profile.phone && (
            <Link passHref href={`tel:${profile.phone}`} legacyBehavior>
              <ContactItem style={{ cursor: 'pointer' }}>
                <StyledIconPhone />
                <div className='phone'>{profile.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}</div>
              </ContactItem>
            </Link>
          )}
        </ContactTopWrapper>
      )}
      <div>
        {profile.email && (
          <Link passHref href={`mailto:${profile.email}`} legacyBehavior>
            <ContactItem style={{ cursor: 'pointer' }}>
              <StyledIconMail />
              <div className='email'>{profile.email}</div>
            </ContactItem>
          </Link>
        )}
      </div>
    </ContactWrapper>
  );
};

const ProfileSection = ({ profile, memberId }: ProfileSectionProps) => {
  const router = useRouter();
  const { logClickEvent } = useEventLogger();

  const { handleReportMember } = useReportMember();
  const { handleBlockMember } = useBlockMember();

  return (
    <ProfileSectionWrapper>
      <DefaultWrapper>
        <div>
          <ImageSection>
            {profile.profileImage ? (
              <ProfileImage src={profile.profileImage} height={171} />
            ) : (
              <EmptyProfileImage>
                <Responsive only='desktop'>
                  <IconUser style={{ width: 130, height: 130, color: `${colors.gray400}`, paddingTop: '20px' }} />
                </Responsive>
                <Responsive only='mobile'>
                  <IconUser style={{ width: 60, height: 60, color: `${colors.gray400}`, paddingTop: '10px' }} />
                </Responsive>
              </EmptyProfileImage>
            )}
            {profile.isCoffeeChatActivate && (
              <IconContainer>
                <IconCoffee />
              </IconContainer>
            )}
          </ImageSection>
          <ProfileContents>
            <NameWrapper>
              <div className='name'>{profile.name}</div>
              <div className='part'>{uniq(profile.soptActivities.map(({ part }) => part)).join('/')}</div>
            </NameWrapper>
            <div className='intro'>{profile.introduction}</div>
            <Responsive only='desktop' asChild>
              <ContactSection profile={profile} />
            </Responsive>
          </ProfileContents>
        </div>
        {profile.isMine ? (
          <EditButton
            onClick={() => {
              router.push(playgroundLink.memberEdit());
              logClickEvent('editProfile');
            }}
          >
            <EditIcon style={{ width: '20px', height: '20px' }} />
          </EditButton>
        ) : (
          <MoreIconContainer>
            <FeedDropdown trigger={<StyledIconMore />}>
              <FeedDropdown.Item
                onClick={() => {
                  handleReportMember(safeParseInt(memberId) ?? undefined);
                }}
              >
                <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
                  <IconAlertTriangle css={{ width: '20px', height: '20px' }} />
                  신고
                </Flex>
              </FeedDropdown.Item>
              <FeedDropdown.Item
                type='danger'
                onClick={() => {
                  handleBlockMember(safeParseInt(memberId) ?? undefined);
                }}
              >
                <Flex align='center' css={{ gap: '10px' }}>
                  <IconUserX css={{ width: '20px', height: '20px' }} /> 차단
                </Flex>
              </FeedDropdown.Item>
            </FeedDropdown>
          </MoreIconContainer>
        )}
      </DefaultWrapper>
      <Responsive only='mobile' asChild>
        <ContactSection profile={profile} />
      </Responsive>
    </ProfileSectionWrapper>
  );
};

export default ProfileSection;

const DefaultWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & > div:first-child {
    display: flex;
    position: relative;
    gap: 33px;
    align-items: center;
    width: 100%;
    letter-spacing: -0.01em;
    font-weight: 500;
  }
`;
const ProfileSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${MOBILE_MEDIA_QUERY} {
    gap: 20px;
    align-items: flex-start;
  }
`;

const EmptyProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 36px;
  background: ${colors.gray900};
  width: 171px;
  height: 171px;
  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 20px;
    width: 78px;
    min-width: 78px;
    height: 78px;
  }
`;

const ProfileImage = styled(ResizedImage)`
  border-radius: 36px;
  width: 171px;
  height: 171px;
  object-fit: cover;
  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 20px;
    width: 100px;
    height: 100px;
  }
`;

const ProfileContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 128px;

  .intro {
    color: #c0c5c9;
    ${fonts.BODY_16_M}

    @media ${MOBILE_MEDIA_QUERY} {
      margin-top: 8px;

      ${fonts.BODY_14_M}
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    height: auto;
  }
`;

const EditButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #2c2d2e;
  cursor: pointer;
  width: 40px;
  height: 40px;

  svg {
    width: 26.05px;
    height: auto;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    top: 5px;
    width: 32px;
    height: 32px;

    svg {
      width: 19.26px;
    }
  }
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  .name {
    ${fonts.HEADING_32_B}
    @media ${MOBILE_MEDIA_QUERY} {
      ${fonts.HEADING_24_B}
    }
  }

  .part {
    color: #808388;
    ${fonts.BODY_16_M}

    @media ${MOBILE_MEDIA_QUERY} {
      ${fonts.BODY_14_M}
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    flex-direction: column;
    gap: 0;
    align-items: flex-start;
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  line-height: 100%;
  color: #808388;
  font-size: 14px;

  & > div {
    display: flex;
    gap: 12px;
    align-items: center;

    @media ${MOBILE_MEDIA_QUERY} {
      gap: 7px;
    }
  }

  .phone {
    @media ${MOBILE_MEDIA_QUERY} {
      margin: 0;
      border: 0;
      padding: 0;
    }
  }

  .email {
    max-width: 140px;
    overflow: visible;
  }

  svg {
    width: 20px;
    height: auto;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 6px;
    margin-top: 0;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const IconContainer = styled.div`
  display: flex;
  position: absolute;
  top: -8px;
  right: -8px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${colors.blue400};
  padding: 5px;
  width: 32px;
  height: 32px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 3px;
    width: 22px;
    height: 22px;

    & > svg {
      width: 15px;
      height: 15px;
    }
  }
`;

const MoreIconContainer = styled.div`
  position: relative;
  width: auto;
  height: 171px;
  text-align: right;

  @media ${MOBILE_MEDIA_QUERY} {
    align-self: baseline;
    height: auto;
  }
`;

const StyledIconMore = styled(IconMore)`
  cursor: pointer;
  padding-top: 12px;
  width: 24px;
  height: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 4px;
  }
`;

const StyledIconPhone = styled(IconPhone)`
  width: 20px;
  height: 20px;
  color: ${colors.gray300};
`;

const StyledIconMail = styled(IconMail)`
  width: 20px;
  height: 20px;
  color: ${colors.gray300};
`;

const StyledIconBirth = styled(IconBirthdaySecondary)`
  width: 20px;
  height: 20px;
  color: ${colors.gray300};
`;

const ContactTopWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const ContactItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
