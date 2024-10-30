import { useGetCoffeechatDetail } from '@/api/endpoint/coffeechat/getCoffeechatDetail';
import AuthRequired from '@/components/auth/AuthRequired';
import CoffeechatContents from '@/components/coffeechat/detail/CoffeechatContents';
import OpenerProfile from '@/components/coffeechat/detail/OpenerProfile';
import RegisterCoffeechatButton from '@/components/coffeechat/detail/RegisterCoffeechatButton';
import ShowCoffeechatToggle from '@/components/coffeechat/detail/ShowCoffeechatToggle';
import Loading from '@/components/common/Loading';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconDotsVertical } from '@sopt-makers/icons';

export default function CoffeechatDetailPage() {
  const { query, status } = useStringRouterQuery(['id'] as const);
  const memberId = status === 'success' ? query.id : '';
  const { data: openerProfile } = useGetCoffeechatDetail(memberId);
  console.log(openerProfile);
  // const openerProfile = {
  //   bio: '안녕하세요',
  //   memberId: 209,
  //   name: '이승헌',
  //   career: '없음',
  //   organization: null,
  //   companyJob: null,
  //   phone: '01040316120',
  //   email: 'seungheon328@gmail.com',
  //   introduction: '소개입니다',
  //   topicTypeList: ['창업', '네트워킹'],
  //   topic: '주제입니다',
  //   meetingType: '온라인',
  //   guideline: '주의입니다',
  //   isMine: true,
  //   isBlind: false,
  //   profileImage:
  //     'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/5193f63e-6910-4bd4-9591-8b42c5132419-IMG_6957.jpeg',
  // };

  if (status === 'loading') {
    return null;
  }

  if (status === 'error') {
    return null;
  }

  if (status === 'success') {
    return (
      <AuthRequired>
        <DetailPage>
          {openerProfile ? (
            <>
              <CoffeechatHeader>
                <CoffeechatTitle>{openerProfile.bio}</CoffeechatTitle>
                <>{openerProfile.isMine && <DotsVerticalIcon />}</>
              </CoffeechatHeader>
              <Profile>
                <OpenerProfile memberId={memberId} />
                {openerProfile.isMine ? (
                  <ShowCoffeechatToggle isBlind={!!openerProfile.isBlind} memberId={memberId} />
                ) : (
                  <RegisterCoffeechatButton
                    onClick={() => {
                      console.log('TODO: 커피챗 모달 열기 추가');
                    }}
                  />
                )}
              </Profile>
              <CoffeechatContents memberId={memberId} />
            </>
          ) : (
            <Loading />
          )}
        </DetailPage>
      </AuthRequired>
    );
  }
}

const Profile = styled.section`
  display: flex;
`;

const DetailPage = styled.div`
  margin: 0 30px;
`;

const DotsVerticalIcon = styled(IconDotsVertical)`
  width: 24px;
  height: 24px;
`;

const CoffeechatTitle = styled.h1`
  height: 96px;
  overflow-wrap: break-word;
  word-break: break-word;
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
  margin-top: 120px;
  margin-bottom: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 24px;
  }
`;
