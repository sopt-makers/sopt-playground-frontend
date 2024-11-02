import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconDotsVertical } from '@sopt-makers/icons';
import { useMemo } from 'react';

import { useGetCoffeechatDetail } from '@/api/endpoint/coffeechat/getCoffeechatDetail';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetMemberProfileById } from '@/api/endpoint_LEGACY/hooks';
import CoffeechatContents from '@/components/coffeechat/detail/CoffeechatContents';
import OpenerProfile from '@/components/coffeechat/detail/OpenerProfile';
import Loading from '@/components/common/Loading';
import CareerSection from '@/components/members/detail/CareerSection';
import DetailInfoSection from '@/components/members/detail/DetailinfoSection';
import ProjectSection from '@/components/members/detail/ProjectSection';
import SoptActivitySection from '@/components/members/detail/SoptActivitySection';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { safeParseInt } from '@/utils';

interface CoffeechatDetailProp {
  memberId: string;
}

export default function CoffeechatDetail({ memberId }: CoffeechatDetailProp) {
  const { data: openerProfile } = useGetCoffeechatDetail(memberId);
  const { data: profile } = useGetMemberProfileById(safeParseInt(memberId) ?? undefined);

  const { data: me } = useGetMemberOfMe();

  const sortedSoptActivities = useMemo(() => {
    if (!profile?.soptActivities) {
      return [];
    }
    const sorted = [...profile.soptActivities];
    sorted.sort((a, b) => b.generation - a.generation);
    return sorted;
  }, [profile?.soptActivities]);

  return (
    <DetailPageLayout>
      <DetailPage>
        {openerProfile && profile && me ? (
          <>
            <CoffeechatHeader>
              <CoffeechatTitle>{openerProfile.bio}</CoffeechatTitle>
              {/* TODO: 더보기 버튼 기능 구현 */}
              {/* <>{openerProfile.isMine && <DotsVerticalIcon />}</> */}
            </CoffeechatHeader>
            <OpenerProfile memberId={memberId} />

            <CoffeechatContents memberId={memberId} />
            <ProfileContents>
              <CareerSection
                careers={profile.careers}
                links={profile.links}
                skill={profile.skill}
                name={profile.name}
                email={profile.email}
                profileImage={profile.profileImage}
                memberId={memberId}
                isMine={profile.isMine}
                isCoffeechatTap
              />
              <DetailInfoSection profile={profile} isCoffeechat />
            </ProfileContents>
            <SoptActivityTitle>SOPT 활동 정보</SoptActivityTitle>
            <SoptActivitySection soptActivities={sortedSoptActivities} />
            <ProfilPojectSection>
              <ProjectSection profile={profile} memberId={memberId} meId={me?.id} />
            </ProfilPojectSection>
          </>
        ) : (
          <CoffeechatLoading>
            <Loading />
          </CoffeechatLoading>
        )}
      </DetailPage>
    </DetailPageLayout>
  );
}

const ProfileContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 18px;
  }
`;

const CoffeechatLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilPojectSection = styled.div`
  margin-top: 30px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 24px;
  }
`;

const SoptActivityTitle = styled.h2`
  margin: 28px 0 32px;
  color: ${colors.white};
  ${fonts.HEADING_32_B};

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 24px 0;

    ${fonts.HEADING_28_B};
  }
`;

const DetailPageLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 200px;
`;

const DetailPage = styled.div`
  margin: 120px 30px;
  max-width: 790px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 24px 30px;
    width: 100%;
  }
`;

const DotsVerticalIcon = styled(IconDotsVertical)`
  width: 24px;
  height: 24px;
`;

const CoffeechatTitle = styled.h1`
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  width: 100%;
  height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: ${colors.white};
  ${fonts.HEADING_32_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_28_B};

    height: 84px;
  }
`;

const CoffeechatHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;
