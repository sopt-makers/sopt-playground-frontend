import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useDialog } from '@sopt-makers/ui';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { useEffect, useMemo } from 'react';

import { useGetCoffeechatDetail } from '@/api/endpoint/coffeechat/getCoffeechatDetail';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetMemberProfileById } from '@/api/endpoint_LEGACY/hooks';
import CoffeechatContents from '@/components/coffeechat/detail/CoffeechatContents';
import CoffeeChatActivitySection from '@/components/coffeechat/detail/CoffeeChatSection/CoffeechatActivitySection';
import CoffeeChatProjectSection from '@/components/coffeechat/detail/CoffeeChatSection/CoffeechatProjectSection';
import OpenerProfile from '@/components/coffeechat/detail/OpenerProfile';
import SeemoreSelect from '@/components/coffeechat/detail/SeemoreSelect';
import CoffeechatLoading from '@/components/coffeechat/Loading';
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
  const { data: openerProfile, isError, error } = useGetCoffeechatDetail(memberId);
  const { data: profile } = useGetMemberProfileById(safeParseInt(memberId) ?? undefined);
  const { data: me } = useGetMemberOfMe();
  const router = useRouter();
  const { open } = useDialog();

  const sortedSoptActivities = useMemo(() => {
    if (!profile?.soptActivities) {
      return [];
    }
    const sorted = [...profile.soptActivities];
    sorted.sort((a, b) => b.generation - a.generation);
    return sorted;
  }, [profile?.soptActivities]);

  useEffect(() => {
    isError &&
      open({
        title: `커피챗 정보를 확인할 수 없는 유저입니다.`,
        description: `${error.message}`,
        type: 'single',
        typeOptions: {
          approveButtonText: '확인',
          buttonFunction: async () => {
            await router.push(playgroundLink.coffeechat());
          },
        },
      });
  }, [isError]);

  return (
    <DetailPageLayout>
      <DetailPage>
        {openerProfile && profile && me ? (
          <>
            <CoffeechatHeader>
              <CoffeechatTitle>{openerProfile.bio}</CoffeechatTitle>
              <>{openerProfile.isMine && <SeemoreSelect memberId={memberId} />}</>
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
            <CoffeeChatActivitySection soptActivities={sortedSoptActivities} />
            <ProfilPojectSection>
              <CoffeeChatProjectSection profile={profile} memberId={memberId} meId={me?.id} />
            </ProfilPojectSection>
          </>
        ) : (
          <CoffeechatLoading />
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

const ProfilPojectSection = styled.div`
  margin: 60px 0 32px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 40px 0 20px;
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
    margin: 20px 0;
    width: calc(100% - 48px);
  }
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

    -webkit-line-clamp: 10;
    height: auto;
    min-height: 84px;
  }
`;

const CoffeechatHeader = styled.header`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
`;
