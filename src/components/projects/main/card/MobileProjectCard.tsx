import ResizedImage from '@/components/common/ResizedImage';
import ProjectCardMemberList, { MemberType } from '@/components/projects/main/card/ProjectCardMemberList';
import ProjectCardStatus from '@/components/projects/main/card/ProjectCardStatus';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Flex, Stack } from '@toss/emotion-utils';
import { Separated } from '@toss/react';

interface MobileProjectCardProps {
  logoImage: string;
  title: string;
  serviceType: string[];
  summary: string;
  isAvailable?: boolean;
  isFounding?: boolean;
  memberList: MemberType[];
}

const MobileProjectCard = ({
  logoImage,
  title,
  serviceType,
  summary,
  isAvailable,
  isFounding,
  memberList,
}: MobileProjectCardProps) => {
  return (
    <Stack gutter={12} css={{ padding: '16px 0' }}>
      <Flex css={{ gap: 12 }} align='center'>
        <Image width={40} height={40} src={logoImage} alt='프로젝트_썸네일_이미지' />
        <Flex align='center' css={{ gap: 5 }}>
          <Title>{title}</Title>
          <Separated with={<ServiceType>∙</ServiceType>}>
            {serviceType.map((service) => (
              <ServiceType key={service}>{service}</ServiceType>
            ))}
          </Separated>
        </Flex>
      </Flex>
      <Stack gutter={6}>
        <Summary>{summary}</Summary>
        <Footer justify='space-between'>
          {(isAvailable || isFounding) && (
            <Flex align='center' css={{ gap: 6, width: '100%' }}>
              {isAvailable && <ProjectCardStatus>서비스 이용 가능</ProjectCardStatus>}
              {isFounding && <ProjectCardStatus>창업 중</ProjectCardStatus>}
            </Flex>
          )}
          <ProjectCardMemberList memberList={memberList} />
        </Footer>
      </Stack>
    </Stack>
  );
};

const Image = styled(ResizedImage)`
  flex-shrink: 0;
  border-radius: 8px;
  width: 40px;
  height: 40px;
`;

const Title = styled.h1`
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: ${colors.white};
  ${fonts.HEADING_18_B}
`;

const ServiceType = styled.h2`
  color: ${colors.gray400};
  ${fonts.LABEL_12_SB};
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
  ${fonts.BODY_13_R};
`;

const Footer = styled(Flex)``;

export default MobileProjectCard;
