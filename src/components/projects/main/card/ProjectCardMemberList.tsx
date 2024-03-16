import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Flex } from '@toss/emotion-utils';

const MEMBER_CIRCLE_WIDTH = 30;

export interface MemberType {
  id: string;
  profileImage: string;
}

interface ProjectCardMemberListProps {
  memberList: MemberType[];
}

const ProjectCardMemberList = ({ memberList }: ProjectCardMemberListProps) => {
  return (
    <Flex align='center' css={{ gap: 8 }}>
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
  profileImage: string;
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
      <img
        css={{
          borderRadius: 30,
          width: 30,
          height: 30,
          border: `2px solid ${colors.background}`,
          objectFit: 'cover',
        }}
        src={profileImage}
        alt='프로젝트_멤버_프로필'
      />
    </div>
  );
};

const MemberLength = styled.span`
  white-space: nowrap;
  color: ${colors.white};
  ${fonts.LABEL_12_SB};

  ${MOBILE_MEDIA_QUERY} {
    ${fonts.LABEL_11_SB};
  }
`;
