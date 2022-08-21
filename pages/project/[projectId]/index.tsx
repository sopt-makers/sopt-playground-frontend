import useGetProjectQuery from '@/components/project/upload/hooks/useGetProjectQuery';
import MemberIcon from '@/public/icons/icon-member.svg';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import useScreenSize from '@/hooks/useScreenSize';
import { TABLET_MEDIA_QUERY } from '@/styles/mediaQuery';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { projectId } = router.query;

  const { data } = useGetProjectQuery({ id: projectId as string });
  const { isTablet } = useScreenSize();

  // TODO: remove after test
  useEffect(() => {
    console.log(data);
  }, [data]);

  const startAt = dayjs(data?.start_at).format('YYYY-MM');
  const endAt = data?.end_at ? dayjs(data.end_at).format('YYYY-MM') : '';
  const mainImage = data?.images[0];

  const navigateToLink = (url: string) => {
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <Container>
      <Header>
        {!isTablet && (
          <ServiceTypeWrapper>
            {data?.service_type.map((type) => (
              <ServiceType key={type}>{type}</ServiceType>
            ))}
          </ServiceTypeWrapper>
        )}
        <ServiceInfoWrapper>
          <LogoImageWrapper>
            <LogoImage src={data?.logo_image} alt={data?.name} />
          </LogoImageWrapper>
          <InfoWrapper>
            <Name>{data?.name}</Name>
            <Description>{data?.summary}</Description>
            <StartEndAtWrapper>
              <StartEndAt>{startAt}</StartEndAt>
              {endAt ? <StartEndAt> - {endAt}</StartEndAt> : <InProgress>진행 중</InProgress>}
            </StartEndAtWrapper>
            {isTablet && (
              <ServiceTypeWrapper>
                {data?.service_type.map((type) => (
                  <ServiceType key={type}>{type}</ServiceType>
                ))}
              </ServiceTypeWrapper>
            )}
          </InfoWrapper>
        </ServiceInfoWrapper>
      </Header>

      {mainImage && (
        <MainImageWrapper>
          <MainImage src={mainImage} alt={data?.name} />
        </MainImageWrapper>
      )}

      <ProjectDetailContainer>
        <DetailContainer>
          <DetailTitle>Project Overview</DetailTitle>
          <DetailWrapper>{data?.detail}</DetailWrapper>
          <LinksWrapper>
            {data?.links.map((link) => (
              <LinkBox key={link.url} onClick={() => navigateToLink(link.url)}>
                <LinkIcon />
                {link.title}
              </LinkBox>
            ))}
          </LinksWrapper>
        </DetailContainer>

        <MemberWrapper>
          <MemberInfoWrapper>
            {data?.generation && <Info>{data.generation}기</Info>}
            <Info>{data?.category}</Info>
          </MemberInfoWrapper>
          <MemberList>
            {data?.users.map((user) => (
              <MemberItem key={user.user_id}>
                <MemberRole>{user.role}</MemberRole>
                <MemberName>
                  <MemberIcon />
                  {user.user.name}
                </MemberName>
              </MemberItem>
            ))}
          </MemberList>
        </MemberWrapper>
      </ProjectDetailContainer>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
`;
const Header = styled.section`
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-bottom: 66px;

  @media ${TABLET_MEDIA_QUERY} {
    margin-bottom: 24px;
  }
`;
const ServiceTypeWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: 194px;

  @media ${TABLET_MEDIA_QUERY} {
    gap: 8px;
    margin: 0;
  }
`;
const ServiceType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2000px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%);
  background-color: white;
  padding: 6px 12px;
  color: ${colors.black40};
  ${textStyles.SUIT_12_B};

  @media ${TABLET_MEDIA_QUERY} {
    font-size: 12px;
  }
`;
const ServiceInfoWrapper = styled.div`
  display: flex;
  gap: 44px;
  align-items: center;

  @media ${TABLET_MEDIA_QUERY} {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
    padding: 28px 20px 0;
  }
`;
const LogoImageWrapper = styled.div`
  flex-shrink: 0;
  border-radius: 20px;
  width: 150px;
  height: 150px;
  overflow: hidden;

  @media ${TABLET_MEDIA_QUERY} {
    width: 80px;
    height: 80px;
  }
`;
const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Name = styled.h2`
  margin-bottom: 18px;
  line-height: 100%;
  font-size: 44px;
  font-weight: 700;

  @media ${TABLET_MEDIA_QUERY} {
    margin-bottom: 12px;
    font-size: 24px;
  }
`;
const Description = styled.p`
  margin-bottom: 32px;
  line-height: 100%;
  font-size: 24px;
  font-weight: 400;

  @media ${TABLET_MEDIA_QUERY} {
    margin-bottom: 18px;
    font-size: 14px;
  }
`;
const StartEndAtWrapper = styled.div`
  @media ${TABLET_MEDIA_QUERY} {
    margin-bottom: 16px;
  }
`;
const StartEndAt = styled.span`
  display: inline-block;
  line-height: 100%;
  color: ${colors.gray60};
  font-size: 18px;
  font-weight: 500;

  @media ${TABLET_MEDIA_QUERY} {
    font-size: 12px;
  }
`;
const InProgress = styled.span`
  margin-left: 12px;
  line-height: 100%;
  color: white;
  font-size: 18px;
  font-weight: 800;

  @media ${TABLET_MEDIA_QUERY} {
    margin-left: 8px;
    font-size: 12px;
  }
`;
const MainImageWrapper = styled.section`
  margin-bottom: 54px;
  border-radius: 12px;
  width: 100%;
  height: 675px;
  overflow: hidden;

  @media ${TABLET_MEDIA_QUERY} {
    margin-bottom: 0;
    border-radius: 0;
    height: 210px;
  }
`;
const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ProjectDetailContainer = styled.section`
  display: flex;
  gap: 32px;
  padding-bottom: 200px;

  @media ${TABLET_MEDIA_QUERY} {
    flex-direction: column-reverse;
    gap: 0;
  }
`;
const DetailContainer = styled.div`
  border-radius: 12px;
  background: ${colors.black80};
  padding: 48px;
  width: 100%;
`;
const DetailTitle = styled.h3`
  margin-bottom: 32px;
  line-height: 100%;
  color: white;
  font-size: 18px;
  font-weight: 800;
`;
const DetailWrapper = styled.div`
  margin-bottom: 54px;
  white-space: pre-wrap; /* or pre-line */
`;
const LinksWrapper = styled.div`
  display: flex;
  gap: 32px;
`;
const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  line-height: 160%;
  color: ${colors.gray60};
  font-size: 14px;
  font-weight: 500;
`;
// TODO: change from div to img
const LinkIcon = styled.div`
  border-radius: 100%;
  background: ${colors.black60};
  width: 72px;
  height: 72px;
`;
const MemberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${colors.black80};
  padding: 48px 28px;
  height: fit-content;

  @media ${TABLET_MEDIA_QUERY} {
    border-radius: 0;
    padding: 24px 28px 36px;
  }
`;
const MemberInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 36px;

  @media ${TABLET_MEDIA_QUERY} {
    gap: 8px;
    margin-bottom: 28px;
  }
`;
const Info = styled.div`
  line-height: 100%;
  font-size: 18px;
  font-weight: 800;

  @media ${TABLET_MEDIA_QUERY} {
    font-size: 14px;
  }
`;
const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media ${TABLET_MEDIA_QUERY} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 26px;
  }
`;
const MemberItem = styled.div`
  border-left: 2px solid ${colors.purple80};
  padding-left: 20px;
`;
const MemberRole = styled.div`
  margin-bottom: 12px;
  line-height: 100%;
  color: ${colors.gray80};
  font-size: 14px;
  font-weight: 500;
`;
const MemberName = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
