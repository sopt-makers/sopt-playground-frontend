import { useGetCoffeechatDetail } from '@/api/endpoint/coffeechat/getCoffeechatDetail';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconMail } from '@sopt-makers/icons';
import ProfileIcon from 'public/icons/icon-profile.svg';

interface OpenerProfileProps {
  memberId: string;
}

export default function OpenerProfile({ memberId }: OpenerProfileProps) {
  const { data: openerProfile } = useGetCoffeechatDetail(memberId);

  return (
    <>
      {openerProfile && (
        <OpenerProfileSection>
          <ProfileImageBox>
            {openerProfile.profileImage ? (
              <ProfileImage src={openerProfile.profileImage} alt='프로필 이미지' />
            ) : (
              <ProfileIcon />
            )}
          </ProfileImageBox>
          <ProfileInfoBox>
            <ProfileHeader>
              <Name>{openerProfile.name}</Name>
              <Career>{openerProfile.career}</Career>
            </ProfileHeader>
            <Company>
              {openerProfile.organization && openerProfile.organization}
              {openerProfile.memberCareerTitle && ' | ' + openerProfile.memberCareerTitle}
            </Company>
            <InfoWrapper>
              <PhoneInfo>
                <PhoneIcon /> <>{openerProfile.phone}</>
              </PhoneInfo>
              <MailInfo>
                <MailIcon /> <>{openerProfile.email}</>
              </MailInfo>
            </InfoWrapper>
          </ProfileInfoBox>
        </OpenerProfileSection>
      )}
    </>
  );
}

const InfoWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  color: ${colors.gray300};
  ${fonts.BODY_13_M};

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 4px;
    ${fonts.BODY_13_M};
  }
`;

const PhoneInfo = styled.div`
  display: flex;
  gap: 4px;
`;

const MailInfo = styled.div`
  display: flex;
  gap: 4px;
`;

const ProfileHeader = styled.header`
  display: flex;
  gap: 11px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 8px;
  }
`;

const Company = styled.p`
  overflow-wrap: break-word;
  word-wrap: break-word;
  color: ${colors.gray200};
  ${fonts.BODY_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_14_M};
  }
`;

const Name = styled.h1`
  color: ${colors.white};
  ${fonts.HEADING_28_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_24_B};
  }
`;

const Career = styled.h2`
  color: ${colors.gray100};
  ${fonts.BODY_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_14_M};
  }
`;

const MailIcon = styled(IconMail)`
  width: 20px;
  height: 20px;
`;

// TODO: 폰 아이콘 mds에 반영되면 반영 필요
const PhoneIcon = styled(IconMail)`
  width: 20px;
  height: 20px;
`;

const OpenerProfileSection = styled.section`
  display: flex;
  gap: 28px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 24px;
  }
`;

const ProfileImageBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background: ${colors.gray700};
  width: 134px;
  height: 134px;
  overflow: hidden;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 21px;
    width: 120px;
    height: 120px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow-wrap: break-word;
  word-wrap: break-word;
`;
