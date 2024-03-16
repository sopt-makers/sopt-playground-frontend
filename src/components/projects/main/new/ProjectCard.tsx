import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Flex, Stack } from '@toss/emotion-utils';
import { m } from 'framer-motion';
import React, { PropsWithChildren } from 'react';

const MEMBER_CIRCLE_WIDTH = 30;

interface MemberType {
  id: string;
  profileImage: string;
}

interface ProjectCardProps {
  image: string;
  title: string;
  serviceType: string[];
  summary: string;
  isAvailable?: boolean;
  isFounding?: boolean;
  memberList: MemberType[];
}

const ProjectCard = ({
  image,
  title,
  serviceType,
  summary,
  isAvailable = false,
  isFounding = false,
  memberList,
}: ProjectCardProps) => {
  return (
    <StyledCard
      whileHover={{
        y: -8,
      }}
    >
      <Image src={image} alt='프로젝트_이미지' />
      <Stack gutter={4}>
        <Flex align='center' css={{ gap: 6 }}>
          <h1
            css={css`
              ${fonts.HEADING_18_B}
            `}
          >
            {title}
          </h1>
          <Flex align='center'>
            {serviceType.map((service, index) => {
              return (
                <React.Fragment key={service}>
                  <ServiceType>{service}</ServiceType>
                  {index !== serviceType.length - 1 && <ServiceType>∙</ServiceType>}
                </React.Fragment>
              );
            })}
          </Flex>
        </Flex>
        <Summary>{summary}</Summary>
      </Stack>
      <Footer justify='space-between'>
        {(isAvailable || isFounding) && (
          <Flex align='center' css={{ gap: 6, width: '100%' }}>
            {isAvailable && <Status>서비스 이용 가능</Status>}
            {isFounding && <Status>창업 중</Status>}
          </Flex>
        )}
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
      </Footer>
    </StyledCard>
  );
};

export default ProjectCard;

const StyledCard = styled(m.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid ${colors.gray700};
  border-radius: 20px;
  cursor: pointer;
  padding: 14px;
  width: 352px;
`;

const Image = styled(m.img)`
  flex: none;
  border-radius: 8px;
  width: 100%;
  height: 192px;
  object-fit: cover;
`;

const ServiceType = styled.span`
  ${fonts.LABEL_12_SB};

  color: ${colors.gray400};
`;

const Summary = styled.div`
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  color: ${colors.gray50};
  ${fonts.BODY_14_R};
`;

const Footer = styled(Flex)``;

const Status = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Flex css={{ gap: 4 }} align='center'>
      <IconCircleSuccess />
      <StatusText>{children}</StatusText>
    </Flex>
  );
};

const StatusText = styled.span`
  color: ${colors.gray100};
  ${fonts.LABEL_12_SB}
`;

const IconCircleSuccess = () => (
  <svg width='5' height='6' viewBox='0 0 5 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='2.5' cy='3' r='2.5' fill='#16BF81' />
  </svg>
);

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
`;
