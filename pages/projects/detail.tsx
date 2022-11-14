import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import HeaderLayout from '@/components/layout/HeaderLayout';
import { getLinkInfo } from '@/components/projects/upload/constants';
import useGetProjectQuery from '@/components/projects/upload/hooks/useGetProjectQuery';
import MemberIcon from '@/public/icons/icon-member.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { setLayout } from '@/utils/layout';

const ProjectDetailPage: FC = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const { data } = useGetProjectQuery({ id: projectId as string });

  const startAt = dayjs(data?.startAt).format('YYYY-MM');
  const endAt = data?.endAt ? dayjs(data.endAt).format('YYYY-MM') : '';
  const mainImage = data?.images[0];

  const userNamesByRole = useMemo(() => new Map<string, string[]>(), []);
  // NOTE: Map 자료구조를 update하기 위해 임시 state를 하나 만든다. Map 자료구조를 만든 다음 해당 state를 변경시켜 rerendering을 발생시킨다.
  // 이렇게 한 이유는 React가 ES6 Map 자료구조가 변경되어도 rerender를 발생시키지 않기 때문이다.
  // 만약 Map이 변경되었을 때 rerender를 발생시키려면, Map을 state로 만들고
  const [_, rerender] = useState('');
  useEffect(() => {
    if (!data?.members) {
      return;
    }

    data.members.forEach((member) => {
      if (!userNamesByRole.has(member.memberRole)) {
        userNamesByRole.set(member.memberRole, [member.memberName]);
      } else {
        const names = userNamesByRole.get(member.memberRole)?.slice();
        if (names) {
          names.push(member.memberName);
          userNamesByRole.set(member.memberRole, names);
        }
      }
    });
    rerender('update');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <AuthRequired>
      <Container>
        <Header>
          <ServiceTypeWrapper>
            {data?.serviceType.map((type) => (
              <ServiceType key={type}>{type}</ServiceType>
            ))}
          </ServiceTypeWrapper>
          <ServiceInfoWrapper>
            <LogoImageWrapper>
              <LogoImage src={data?.logoImage} alt={data?.name} />
            </LogoImageWrapper>
            <InfoWrapper>
              <Name>{data?.name}</Name>
              <Description>{data?.summary}</Description>
              <StartEndAtWrapper>
                <StartEndAt>{startAt}</StartEndAt>
                {endAt ? <StartEndAt> - {endAt}</StartEndAt> : <InProgress>진행 중</InProgress>}
              </StartEndAtWrapper>
              <MobileServiceTypeWrapper>
                {data?.serviceType.map((type) => (
                  <ServiceType key={type}>{type}</ServiceType>
                ))}
              </MobileServiceTypeWrapper>
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
                <LinkBox key={link.linkUrl} href={link.linkUrl}>
                  <LinkIcon key={link.linkId} src={getLinkInfo(link.linkTitle).icon} alt='link_icon' />
                  {link.linkTitle}
                </LinkBox>
              ))}
            </LinksWrapper>
          </DetailContainer>

          <UserWrapper>
            <UserInfoWrapper>
              {data?.generation && <Info>{data.generation}기</Info>}
              <Info>{data?.category}</Info>
            </UserInfoWrapper>
            <UserList>
              {Array.from(userNamesByRole).map(([role, names], idx) => (
                <UserItem key={idx}>
                  <UserRole>{role}</UserRole>
                  <UserNameList>
                    {names.map((name, idx) => (
                      <UserName key={idx}>
                        <MemberIcon />
                        {name}
                      </UserName>
                    ))}
                  </UserNameList>
                </UserItem>
              ))}
            </UserList>
          </UserWrapper>
        </ProjectDetailContainer>

        <MobileLinksWrapper>
          {data?.links.map((link) => (
            <LinkBox key={link.linkUrl} href={link.linkUrl}>
              <LinkIcon key={link.linkId} src={getLinkInfo(link.linkTitle).icon} alt='link_icon' />
              {link.linkTitle}
            </LinkBox>
          ))}
        </MobileLinksWrapper>
      </Container>
    </AuthRequired>
  );
};

setLayout(ProjectDetailPage, HeaderLayout);

export default ProjectDetailPage;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-bottom: 40px;
  }
`;
const Header = styled.section`
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-bottom: 66px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 24px;
  }
`;
const ServiceTypeWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: 194px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const MobileServiceTypeWrapper = styled.div`
  display: none;
  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: 8px;
    align-items: center;
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

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 12px;
  }
`;
const ServiceInfoWrapper = styled.div`
  display: flex;
  gap: 44px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
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

  @media ${MOBILE_MEDIA_QUERY} {
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

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 12px;
    font-size: 24px;
  }
`;
const Description = styled.p`
  margin-bottom: 32px;
  line-height: 100%;
  font-size: 24px;
  font-weight: 400;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 18px;
    font-size: 14px;
  }
`;
const StartEndAtWrapper = styled.div`
  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 16px;
  }
`;
const StartEndAt = styled.span`
  display: inline-block;
  line-height: 100%;
  color: ${colors.gray60};
  font-size: 18px;
  font-weight: 500;

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 12px;
  }
`;
const InProgress = styled.span`
  margin-left: 12px;
  line-height: 100%;
  color: white;
  font-size: 18px;
  font-weight: 800;

  @media ${MOBILE_MEDIA_QUERY} {
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

  @media ${MOBILE_MEDIA_QUERY} {
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

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column-reverse;
    gap: 0;
    padding: 0;
  }
`;
const DetailContainer = styled.div`
  border-radius: 12px;
  background: ${colors.black80};
  padding: 48px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 36px 24px;
  }
`;
const DetailTitle = styled.h3`
  margin-bottom: 32px;
  line-height: 100%;
  color: white;
  font-size: 18px;
  font-weight: 800;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 24px;
    font-size: 16px;
  }
`;
const DetailWrapper = styled.div`
  margin-bottom: 54px;
  line-height: 180%;
  white-space: pre-wrap; /* or pre-line */
  font-size: 16px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
    font-size: 14px;
  }
`;
const LinksWrapper = styled.div`
  display: flex;
  gap: 32px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const MobileLinksWrapper = styled.div`
  display: none;
  @media ${MOBILE_MEDIA_QUERY} {
    gap: 32px 26px;
    padding: 48px 40px;
  }
`;
const LinkBox = styled.a`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  line-height: 160%;
  color: ${colors.gray60};
  font-size: 14px;
  font-weight: 500;

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 12px;
  }
`;

const LinkIcon = styled.img`
  border-radius: 100%;
  background-color: ${colors.black60};
  width: 72px;
  height: 72px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 54px;
    height: 54px;
  }
`;
const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${colors.black80};
  padding: 48px 28px;
  height: fit-content;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 0;
    padding: 24px 28px 36px;
  }
`;
const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 36px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 8px;
    margin-bottom: 28px;
  }
`;
const Info = styled.div`
  line-height: 100%;
  font-size: 18px;
  font-weight: 800;

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 14px;
  }
`;
const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 26px;
  }
`;
const UserItem = styled.div`
  border-left: 2px solid ${colors.purple80};
  padding-left: 20px;
`;
const UserRole = styled.div`
  margin-bottom: 12px;
  line-height: 100%;
  color: ${colors.gray80};
  font-size: 14px;
  font-weight: 500;
`;
const UserNameList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const UserName = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 20px;
  background: ${colors.black60};
  padding: 3px 12px 3px 4px;
  width: fit-content;
`;
