import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Tag } from '@sopt-makers/ui';

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
          <ContentsBox>
            <Text>{openerProfile.introduction}</Text>
          </ContentsBox>
          <ContentsBox>
            <EachContent>
              <Subtitle>제가 이야기 나누고 싶은 주제는</Subtitle>
              <Tags>
                {openerProfile.topicTypeList.map((topicType) => {
                  return (
                    <CoffeechatTag key={topicType} shape='pill' size='lg' type='solid' variant='default'>
                      {topicType}
                    </CoffeechatTag>
                  );
                })}
              </Tags>
              <Text>{openerProfile.topic}</Text>
            </EachContent>
            <EachContent>
              <Subtitle>진행방법</Subtitle>
              <Tag shape='pill' size='lg' type='solid' variant='default'>
                {openerProfile.meetingType}
              </Tag>
            </EachContent>
            <EachContent>
              <Subtitle>유의사항</Subtitle>
              <Text>{openerProfile.guideline}</Text>
            </EachContent>
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
  border-radius: 20px;
  background-color: ${colors.gray900};
  padding: 32px 40px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 28px;
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

const CoffeechatTag = styled(Tag)`
  padding: 4px 14px;
`;
