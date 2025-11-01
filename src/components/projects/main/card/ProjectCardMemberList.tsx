import ResizedImage from '@/components/common/ResizedImage';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Flex } from '@toss/emotion-utils';
import { useState } from 'react';

const MEMBER_CIRCLE_WIDTH = 30;

export interface MemberType {
  id: number;
  profileImage?: string | null;
}

interface ProjectCardMemberListProps {
  memberList: MemberType[];
}

const ProjectCardMemberList = ({ memberList }: ProjectCardMemberListProps) => {
  return (
    <Flex align='center' css={{ gap: 8, width: '100%' }} justify='flex-end'>
      <Flex align='center' css={{ position: 'relative' }}>
        {memberList.slice(0, 3).map((member, index) => (
          <MemberCircle
            key={member.id}
            css={{ right: MEMBER_CIRCLE_WIDTH * index + index * -9 }}
            profileImage={member.profileImage}
          />
        ))}
      </Flex>
      <MemberLength>{`${memberList.length} members`}</MemberLength>
    </Flex>
  );
};

export default ProjectCardMemberList;

interface MemberCircleProps {
  className?: string;
  profileImage?: string | null;
}

const MemberCircle = ({ className, profileImage }: MemberCircleProps) => {
  return (
    <div
      className={className}
      css={{
        position: 'absolute',
        borderRadius: 30,
      }}
    >
      <Flex
        align='center'
        justify='center'
        css={{
          borderRadius: '100%',
          width: 30,
          height: 30,
          border: `2px solid ${colors.background}`,
        }}
      >
        {profileImage == null ? <DefaultProfileImage /> : <ProfileImage src={profileImage} />}
      </Flex>
    </div>
  );
};

const ProfileImage = ({ src }: { src: string }) => {
  const [isError, setIsError] = useState<boolean>(false);

  return isError ? (
    <DefaultProfileImage />
  ) : (
    <Profile width={26} height={26} src={src} alt='' onError={() => setIsError(true)} />
  );
};

const Profile = styled(ResizedImage)`
  border-radius: 100%;
  width: 26px;
  height: 26px;
  object-fit: cover;
`;

const DefaultProfileImage = () => (
  <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='30' height='30' rx='15' fill='#2C2D2E' />
    <g filter='url(#filter0_b_237_2250)'>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M11.5713 11.7806C11.5713 13.6718 13.0966 15.1873 14.9999 15.1873C16.9025 15.1873 18.4285 13.6718 18.4285 11.7806C18.4285 9.88952 16.9025 8.37402 14.9999 8.37402C13.0966 8.37402 11.5713 9.88952 11.5713 11.7806ZM20.7144 19.4928C20.7144 17.502 18.082 17.004 15.0001 17.004C11.9014 17.004 9.28577 17.5192 9.28577 19.5115C9.28577 21.5023 11.9181 22.0003 15.0001 22.0003C18.0988 22.0003 20.7144 21.4851 20.7144 19.4928Z'
        fill='#606265'
      />
    </g>
    <defs>
      <filter
        id='filter0_b_237_2250'
        x='3.03523'
        y='2.12361'
        width='23.9295'
        height='26.127'
        filterUnits='userSpaceOnUse'
        color-interpolation-filters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feGaussianBlur in='BackgroundImageFix' stdDeviation='3.12521' />
        <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_237_2250' />
        <feBlend mode='normal' in='SourceGraphic' in2='effect1_backgroundBlur_237_2250' result='shape' />
      </filter>
    </defs>
  </svg>
);

const MemberLength = styled.span`
  white-space: nowrap;
  color: ${colors.white};
  ${fonts.LABEL_12_SB};

  ${MOBILE_MEDIA_QUERY} {
    ${fonts.LABEL_11_SB};
  }
`;
