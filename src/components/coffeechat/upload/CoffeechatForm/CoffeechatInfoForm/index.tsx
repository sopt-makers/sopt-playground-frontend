import styled from '@emotion/styled';
import { SelectV2, TextArea } from '@sopt-makers/ui';
import { Controller, useFormContext } from 'react-hook-form';

import { COFFEECHAT_MOBILE_MEDIA_QUERY } from '@/components/coffeechat/mediaQuery';
import BottomSheetSelect from '@/components/coffeechat/upload/CoffeechatForm/BottomSheetSelect';
import ChipField from '@/components/coffeechat/upload/CoffeechatForm/ChipField';
import {
  COFFECHAT_SECTION,
  COFFECHAT_TOPIC,
  MEETING_TYPE_OPTIONS,
} from '@/components/coffeechat/upload/CoffeechatForm/constants';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
import FormItem from '@/components/common/form/FormItem';
import FormTitle from '@/components/common/form/FormTitle';
import TextFieldLineBreak from '@/components/common/form/TextFieldLineBreak';
import Responsive from '@/components/common/Responsive';

export default function CoffeechatInfoForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CoffeechatFormContent>();

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
        <ChipField
          field='coffeeChatInfo.sections'
          errorMessage={errors.coffeeChatInfo?.sections?.message ?? ''}
          chipList={COFFECHAT_SECTION}
        />
      </CoffeechatSectionWrapper>
      <article>
        <FormTitle essential breakPoint={COFFEECHAT_MOBILE_MEDIA_QUERY}>
          커피챗 제목
        </FormTitle>
        <Controller
          name='coffeeChatInfo.bio'
          control={control}
          render={({ field }) => (
            <TextArea
              name={field.name}
              value={field.value ?? ''}
              placeholder='ex. 디자인 관련 고민이 있다면, 함께 나눠봐요!'
              maxLength={40}
              isError={!!errors.coffeeChatInfo?.bio}
              errorMessage={errors.coffeeChatInfo?.bio?.message}
              onChange={(e) => field.onChange(e.target.value)}
              disableEnterSubmit
            />
          )}
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
        <ChipField
          field='coffeeChatInfo.topicTypes'
          errorMessage={errors.coffeeChatInfo?.topicTypes?.message ?? ''}
          chipList={COFFECHAT_TOPIC}
        />

        <Controller
          name='coffeeChatInfo.topic'
          control={control}
          render={({ field }) => (
            <>
              <Responsive only='desktop'>
                <TextFieldLineBreak
                  name={field.name}
                  value={field.value ?? ''}
                  maxLength={1000}
                  fixedHeight={189}
                  lineBreakPlaceholder={['• PM과 서비스 기획자로 일하는 방법', '• 앱잼 전 미리 준비하면 좋은 것']}
                  isError={!!errors.coffeeChatInfo?.topic}
                  errorMessage={errors.coffeeChatInfo?.topic?.message}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </Responsive>
              <Responsive only='mobile'>
                <TextFieldLineBreak
                  name={field.name}
                  value={field.value ?? ''}
                  maxLength={1000}
                  fixedHeight={176}
                  lineBreakPlaceholder={['• PM과 서비스 기획자로 일하는 방법', '• 앱잼 전 미리 준비하면 좋은 것']}
                  isError={!!errors.coffeeChatInfo?.topic}
                  errorMessage={errors.coffeeChatInfo?.topic?.message}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </Responsive>
            </>
          )}
        />
      </TopicWrapper>
      <MeetingTypeWrapper>
        <FormTitle breakPoint={COFFEECHAT_MOBILE_MEDIA_QUERY} essential>
          커피챗 진행 방식
        </FormTitle>
        <FormItem errorMessage={errors.coffeeChatInfo?.meetingType?.message ?? ''}>
          <Controller
            name='coffeeChatInfo.meetingType'
            control={control}
            render={({ field }) => (
              <>
                <Responsive only='desktop' {...field}>
                  <SelectV2.Root
                    type='text'
                    visibleOptions={3}
                    defaultValue={MEETING_TYPE_OPTIONS.find((option) => option.value === field.value)}
                    onChange={(value) => field.onChange(value)}
                  >
                    <SelectV2.Trigger>
                      <SelectV2.TriggerContent placeholder={'진행 방식 선택'} />
                    </SelectV2.Trigger>
                    <SelectV2.Menu>
                      {MEETING_TYPE_OPTIONS.map((option) => (
                        <SelectV2.MenuItem key={option.value} option={option} />
                      ))}
                    </SelectV2.Menu>
                  </SelectV2.Root>
                </Responsive>
                <Responsive only='mobile' {...field}>
                  <BottomSheetSelect
                    options={[...MEETING_TYPE_OPTIONS]}
                    value={field.value}
                    placeholder='진행 방식 선택'
                    onChange={(value) => field.onChange(value)}
                  />
                </Responsive>
              </>
            )}
          />
        </FormItem>
      </MeetingTypeWrapper>
      <article>
        <FormTitle breakPoint={COFFEECHAT_MOBILE_MEDIA_QUERY}>유의사항</FormTitle>
        <Controller
          name='coffeeChatInfo.guideline'
          control={control}
          render={({ field }) => (
            <>
              <Responsive only='desktop'>
                <TextFieldLineBreak
                  name={field.name}
                  value={field.value ?? ''}
                  maxLength={1000}
                  fixedHeight={159}
                  lineBreakPlaceholder={[
                    '• 신청 전 알아두어야 할 공지 ',
                    '• 이런 분께 추천해요 ',
                    '• 커피챗 가능한 시간대',
                  ]}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </Responsive>
              <Responsive only='mobile'>
                <TextFieldLineBreak
                  name={field.name}
                  value={field.value ?? ''}
                  maxLength={1000}
                  fixedHeight={150}
                  lineBreakPlaceholder={[
                    '• 신청 전 알아두어야 할 공지 ',
                    '• 이런 분께 추천해요 ',
                    '• 커피챗 가능한 시간대',
                  ]}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </Responsive>
            </>
          )}
        />
      </article>
    </>
  );
}

const MeetingTypeWrapper = styled.article`
  ul {
    z-index: 99;
  }
`;

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
