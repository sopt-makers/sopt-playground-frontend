import styled from '@emotion/styled';
import { SelectV2, TextArea } from '@sopt-makers/ui';

import { COFFEECHAT_MOBILE_MEDIA_QUERY } from '@/components/coffeechat/mediaQuery';
import ChipField from '@/components/coffeechat/upload/CoffeechatForm/ChipField';
import {
  COFFECHAT_SECTION,
  COFFECHAT_TOPIC,
  MEETING_TYPE_OPTIONS,
} from '@/components/coffeechat/upload/CoffeechatForm/constants';
import FormTitle from '@/components/common/form/FormTitle';
import TextFieldLineBreak from '@/components/common/form/TextFieldLineBreak';
import Responsive from '@/components/common/Responsive';

export default function CoffeechatInfoForm() {
  return (
    <>
      <CoffeechatSectionWrapper>
        <FormTitle
          description='오픈하려는 커피챗과 관련된 분야를 선택해주세요'
          essential
          breakPoint={COFFEECHAT_MOBILE_MEDIA_QUERY}
        >
          관련 분야
        </FormTitle>
        <ChipField errorMessage='관련 분야를 선택해주세요' chipList={COFFECHAT_SECTION} activeChipList={[]} />
      </CoffeechatSectionWrapper>
      <article>
        <FormTitle essential breakPoint={COFFEECHAT_MOBILE_MEDIA_QUERY}>
          커피챗 제목
        </FormTitle>
        <TextArea
          value=''
          placeholder='ex. 디자인 관련 고민이 있다면, 함께 나눠봐요!'
          maxLength={40}
          isError={true}
          errorMessage='커피챗 제목을 입력해주세요'
        />
      </article>
      <TopicWrapper>
        <FormTitle
          description='커피챗의 주제 키워드를 선택하고 자세히 소개해주세요'
          essential
          breakPoint={COFFEECHAT_MOBILE_MEDIA_QUERY}
        >
          커피챗 주제 및 소개
        </FormTitle>
        <ChipField errorMessage='관련 분야를 선택해주세요' chipList={COFFECHAT_TOPIC} activeChipList={[]} />
        <>
          <Responsive only='desktop'>
            <TextFieldLineBreak
              value=''
              maxLength={1000}
              fixedHeight={189}
              lineBreakPlaceholder={[
                '• PM과 서비스기획자로 일하는 방법',
                '• 포트폴리오 준비 및 작성 노하우',
                '• 직무 전환 시 준비할 것들',
                '• 당근, 토스, 넥슨, 하나은행, LG전자 면접 후기',
              ]}
              isError
              errorMessage='자기소개를 입력해주세요'
            />
          </Responsive>
          <Responsive only='mobile'>
            <TextFieldLineBreak
              value=''
              maxLength={1000}
              fixedHeight={176}
              lineBreakPlaceholder={[
                '• PM과 서비스기획자로 일하는 방법',
                '• 포트폴리오 준비 및 작성 노하우',
                '• 직무 전환 시 준비할 것들',
                '• 당근, 토스, 넥슨, 하나은행, LG전자 면접 후기',
              ]}
              isError
              errorMessage='자기소개를 입력해주세요'
            />
          </Responsive>
        </>
      </TopicWrapper>
      <article>
        <FormTitle breakPoint={COFFEECHAT_MOBILE_MEDIA_QUERY}>커피챗 진행 방식</FormTitle>
        <SelectV2.Root type='text' visibleOptions={3}>
          <SelectV2.Trigger>
            <SelectV2.TriggerContent placeholder='진행 방식 선택' />
          </SelectV2.Trigger>
          <SelectV2.Menu>
            {MEETING_TYPE_OPTIONS.map((option) => (
              <SelectV2.MenuItem key={option.value} option={option} />
            ))}
          </SelectV2.Menu>
        </SelectV2.Root>
      </article>
      <article>
        <FormTitle breakPoint={COFFEECHAT_MOBILE_MEDIA_QUERY}>유의사항</FormTitle>
        <>
          <Responsive only='desktop'>
            <TextFieldLineBreak
              value=''
              maxLength={1000}
              fixedHeight={159}
              lineBreakPlaceholder={[
                '• 신청 전 알아두어야 할 공지 ',
                '• 이런 분께 추천해요 ',
                '• 커피챗 가능한 시간대',
              ]}
            />
          </Responsive>
          <Responsive only='mobile'>
            <TextFieldLineBreak
              value=''
              maxLength={1000}
              fixedHeight={150}
              lineBreakPlaceholder={[
                '• 신청 전 알아두어야 할 공지 ',
                '• 이런 분께 추천해요 ',
                '• 커피챗 가능한 시간대',
              ]}
            />
          </Responsive>
        </>
      </article>
    </>
  );
}

const CoffeechatSectionWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TopicWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
