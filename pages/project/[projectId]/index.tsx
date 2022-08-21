import useGetProjectQuery from '@/components/project/upload/hooks/useGetProjectQuery';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import dayjs from 'dayjs';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { projectId } = router.query;

  const { data } = useGetProjectQuery({ id: projectId as string });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const startAt = dayjs(data?.start_at).format('YYYY-MM');
  const endAt = data?.end_at ? dayjs(data.end_at).format('YYYY-MM') : '';

  return (
    <Container>
      <Header>
        <ServiceTypeWrapper>
          {data?.service_type.map((type) => (
            <ServiceType key={type}>{type}</ServiceType>
          ))}
        </ServiceTypeWrapper>
        <ServiceInfoWrapper>
          <LogoImageWrapper>
            <LogoImage src={data?.logo_image} alt={data?.name} />
          </LogoImageWrapper>
          <InfoWrapper>
            <Name>{data?.name}</Name>
            <Description>{data?.summary}</Description>
            <div>
              <StartEndAt>{startAt}</StartEndAt>
              {endAt ? <StartEndAt> - {endAt}</StartEndAt> : <InProgress>진행 중</InProgress>}
            </div>
          </InfoWrapper>
        </ServiceInfoWrapper>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;
const ServiceTypeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 194px;
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
`;
const ServiceInfoWrapper = styled.div`
  display: flex;
  gap: 44px;
  align-items: center;
`;
const LogoImageWrapper = styled.div`
  flex-shrink: 0;
  border-radius: 20px;
  width: 150px;
  height: 150px;
  overflow: hidden;
`;
const LogoImage = styled.img`
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
`;
const Description = styled.p`
  margin-bottom: 32px;
  line-height: 100%;
  font-size: 24px;
  font-weight: 400;
`;
const StartEndAt = styled.span`
  display: inline-block;
  line-height: 100%;
  color: ${colors.gray60};
  font-size: 18px;
  font-weight: 500;
`;
const InProgress = styled.span`
  margin-left: 12px;
  line-height: 100%;
  color: white;
  font-size: 18px;
  font-weight: 800;
`;
