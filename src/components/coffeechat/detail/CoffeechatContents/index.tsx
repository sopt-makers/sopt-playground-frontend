import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { useGetCoffeechatDetail } from '@/api/endpoint/coffeechat/getCoffeechatDetail';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface CoffeechatContentsProps {
  memberId: string;
}

export default function CoffeechatContents({ memberId }: CoffeechatContentsProps) {
  const { data: openerProfile } = useGetCoffeechatDetail(memberId);

  return (
    <>
      {openerProfile && (
        <CoffeechatContentsWrapper>
          {openerProfile.introduction.trim() && (
            <ContentsBox>
              <Text>{openerProfile.introduction}</Text>
            </ContentsBox>
          )}
          <ContentsBox>
            <EachContent>
              <Subtitle>제가 이야기 나누고 싶은 주제는</Subtitle>
              <Tags>
                {openerProfile.topicTypeList.map((topicType) => {
                  return <CoffeechatTag key={topicType}>{topicType}</CoffeechatTag>;
                })}
              </Tags>
              <Text>{openerProfile.topic}</Text>
            </EachContent>
            {openerProfile.meetingType && (
              <EachContent>
                <Subtitle>진행방법</Subtitle>
                <Tags>
                  <CoffeechatTag>{openerProfile.meetingType}</CoffeechatTag>
                </Tags>
              </EachContent>
            )}
            {openerProfile.guideline && (
              <EachContent>
                <Subtitle>유의사항</Subtitle>
                <Text>{openerProfile.guideline}</Text>
              </EachContent>
            )}
          </ContentsBox>
        </CoffeechatContentsWrapper>
      )}
    </>
  );
}

const Subtitle = styled.p`
  color: ${colors.gray300};
  ${fonts.TITLE_16_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.TITLE_14_SB};
  }
`;

const EachContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Text = styled.p`
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  color: ${colors.white};
  ${fonts.BODY_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_16_M};
  }
`;

const ContentsBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 30px;
  background-color: ${colors.gray900};
  padding: 40px;
  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 18px;
    padding: 30px 20px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 28px;
    border-radius: 18px;
    padding: 30px 20px;
  }
`;

const CoffeechatContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 28px;
  margin-bottom: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 18px;
    margin-top: 24px;
    margin-bottom: 18px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

// TODO: mds 태그로 변경
const CoffeechatTag = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  background: ${colors.gray700};
  padding: 4px 14px;
  color: ${colors.gray10};

  ${fonts.TITLE_14_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_14_M};
  }
`;
