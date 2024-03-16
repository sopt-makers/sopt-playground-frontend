import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Flex, Stack } from '@toss/emotion-utils';
import { m } from 'framer-motion';
import { Separated } from '@toss/react';
import ProjectCardMemberList, { MemberType } from '@/components/projects/main/card/ProjectCardMemberList';
import ProjectCardStatus from '@/components/projects/main/card/ProjectCardStatus';

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
        <Flex align='center'>
          <h1
            css={css`
              ${fonts.HEADING_18_B}

              margin-right: 6px;
            `}
          >
            {title}
          </h1>
          <Separated with={<ServiceType>∙</ServiceType>}>
            {serviceType.map((service) => (
              <ServiceType key={service}>{service}</ServiceType>
            ))}
          </Separated>
        </Flex>
        <Summary>{summary}</Summary>
      </Stack>
      <Footer justify='space-between'>
        {(isAvailable || isFounding) && (
          <Flex align='center' css={{ gap: 6, width: '100%' }}>
            {isAvailable && <ProjectCardStatus>서비스 이용 가능</ProjectCardStatus>}
            {isFounding && <ProjectCardStatus>창업 중</ProjectCardStatus>}
          </Flex>
        )}
        <ProjectCardMemberList memberList={memberList} />
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
