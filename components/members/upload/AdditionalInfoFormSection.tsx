import styled from '@emotion/styled';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Switch from '@/components/common/Switch';
import Text from '@/components/common/Text';
import TextArea from '@/components/common/TextArea';
import AddableItem from '@/components/members/upload/AddableItem';
import AddableWrapper from '@/components/members/upload/AddableWrapper';
import { LINK_TITLES } from '@/components/members/upload/constants';
import CountableInput from '@/components/members/upload/forms/CountableInput';
import CountableTextArea from '@/components/members/upload/forms/CountableTextArea';
import FormHeader from '@/components/members/upload/forms/FormHeader';
import FormItem from '@/components/members/upload/forms/FormItem';
import { MemberFormSection as FormSection } from '@/components/members/upload/forms/FormSection';
import SelectOptions from '@/components/members/upload/forms/SelectOptions';
import { MemberUploadForm } from '@/components/members/upload/types';
import useMediaQuery from '@/hooks/useMediaQuery';
import { colors } from '@/styles/colors';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function MemberAdditionalFormSection() {
  const { register, control } = useFormContext<MemberUploadForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);

  const onAppend = () => append({ title: '', url: '' });
  const onRemove = (index: number) => remove(index);

  return (
    <FormSection>
      <FormHeader title='추가정보' />
      {!isMobile ? (
        <StyledFormItems>
          <FormItem title='한줄소개' description='나를 표현할 수 있는 한 줄을 소개해주세요!' essential>
            <StyledCountableInput {...register('introduction')} maxCount={30} />
          </FormItem>
          <FormItem title='스킬' description='내가 자신있는 스킬에 대해 작성해주세요. 쉼표(,)로 구분해서 적어주세요.'>
            <StyledInput {...register('skill')} placeholder='ex) Node, Product Managing, Branding, UI' />
          </FormItem>
          <FormItem title='링크' description='Github, instagram, 개인 웹사이트 등을 자유롭게 업로드해주세요'>
            <StyledAddableWrapper onAppend={onAppend}>
              {fields.map((field, index) => (
                <AddableItem onRemove={() => onRemove(index)} key={field.id}>
                  <StyledSelectWrapper>
                    <StyledSelect {...register(`links.${index}.title`)} className='category'>
                      <SelectOptions options={LINK_TITLES} />
                    </StyledSelect>
                    <Input {...register(`links.${index}.url`)} placeholder='https://' className='link' />
                  </StyledSelectWrapper>
                </AddableItem>
              ))}
            </StyledAddableWrapper>
          </FormItem>
          <StyledLine />
          <StyledSwitchWrapper>
            <StyledTitle>
              <div className='title'>Open to work</div>
            </StyledTitle>
            <Switch {...register('openToWork')} size={switchSize} className='switch' />
            <StyledDescription>채용 제안에 열려있는 상태라면 체크해주세요.</StyledDescription>
          </StyledSwitchWrapper>
          <StyledSwitchWrapper>
            <StyledTitle>
              <div className='title'>Open to side project</div>
            </StyledTitle>
            <Switch {...register('openToSideProject')} size={switchSize} className='switch' />
            <StyledDescription>사이드 프로젝트 제안에 열려있는 상태라면 체크해주세요.</StyledDescription>
          </StyledSwitchWrapper>
        </StyledFormItems>
      ) : (
        <MobileFormItems>
          <FormItem title='한줄소개' description='나를 표현할 수 있는 한 줄을 소개해주세요!' essential>
            <StyledCountableTextArea {...register('introduction')} maxCount={30} />
          </FormItem>
          <FormItem
            title='스킬'
            description={`내가 자신있는 스킬에 대해 작성해주세요.\n쉼표(,)로 구분해서 적어주세요.`}
          >
            <StyledTextArea {...register('skill')} placeholder='ex) Node, Product Managing, BI/BX' />
          </FormItem>
          <FormItem title='링크' description='Github, instagram, 개인 웹사이트 등을 자유롭게 업로드해주세요'>
            <StyledAddableWrapper onAppend={onAppend}>
              {fields.map((field, index) => (
                <AddableItem onRemove={() => onRemove(index)} key={field.id}>
                  <StyledSelectWrapper>
                    <StyledSelect {...register(`links.${index}.title`)} className='category'>
                      <SelectOptions options={LINK_TITLES} />
                    </StyledSelect>
                    <Input {...register(`links.${index}.url`)} placeholder='https://' className='link' />
                  </StyledSelectWrapper>
                </AddableItem>
              ))}
            </StyledAddableWrapper>
          </FormItem>
          <StyledOpenQuestion>
            <div className='wrapper'>
              <div className='question'>현재 구직 중이신가요?</div>
              <Switch {...register('openToWork')} size={mobileSwitchSize} className='switch' />
              <div className='description'>추후에 채용 연결 제공을 고려하고 있어요.</div>
            </div>
            <div className='wrapper'>
              <div className='question'>{`사이드 프로젝트 제안을\n받고 싶으신가요?`}</div>
              <Switch {...register('openToSideProject')} size={mobileSwitchSize} className='switch' />
              <div className='description'>{`추후에 사이드 프로젝트 팀원 연결 제공을\n고려하고 있어요.`}</div>
            </div>
          </StyledOpenQuestion>
        </MobileFormItems>
      )}
    </FormSection>
  );
}

const StyledFormItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 46px;
  margin-top: 46px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const MobileFormItems = styled.div`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 30px;
  }
`;

const StyledInput = styled(Input)`
  margin-top: 18px;
  width: 632px;
`;

const StyledCountableInput = styled(CountableInput)`
  margin-top: 18px;
  width: 632px;
`;

const StyledSelectWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;

  .category {
    flex: 1;
  }

  .link {
    flex: 2;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 11px;
  }
`;

const StyledSelect = styled(Select)`
  border-width: 1.5px;
  border-radius: 14px;
  padding: 16px 34px 16px 20px;
  color: ${colors.gray80};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 12px;
    background-color: ${colors.black80};
    width: 100%;
  }
`;

const StyledLine = styled.hr`
  margin-top: 20px;
  margin-bottom: 0;
  border: none;
  background-color: ${colors.black60};
  width: 100%;
  height: 1.5px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const StyledTitle = styled(Text)`
  display: flex;

  ${textStyles.SUIT_18_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_15_SB}
  }
`;

const StyledDescription = styled(Text)`
  display: block;
  color: ${colors.gray80};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    line-height: 150%;
    white-space: pre-line;

    ${textStyles.SUIT_13_M}
  }
`;

const StyledSwitchWrapper = styled.div`
  display: grid;
  grid-template-rows: 18px 14px;
  grid-template-columns: auto 40px;
  row-gap: 10px;

  .switch {
    grid-row: span 2;
    align-self: center;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const switchSize = { labelWidth: '40px', labelHeight: '24px', sliderWidth: '21.54px', sliderHeight: '21px' };
const mobileSwitchSize = { labelWidth: '34px', labelHeight: '20px', sliderWidth: '18.31px', sliderHeight: '17.5px' };

const StyledTextArea = styled(TextArea)`
  margin-top: 14px;
`;

const StyledCountableTextArea = styled(CountableTextArea)`
  margin-top: 16px;
  width: 100%;
  height: 128px;
`;

const StyledOpenQuestion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;
  border-radius: 18px;
  background-color: ${colors.black80};
  padding: 35px 18px 21px;
  width: 100%;

  .wrapper {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto 34px;
    width: 100%;
    row-gap: 10px;

    .switch {
      grid-row: span 2;
      align-self: center;
      margin-bottom: 10px;
    }
  }

  .question {
    white-space: pre-line;
    color: #fcfcfc;
    font-size: 16px;
    font-weight: 600;
  }

  .description {
    white-space: pre-line;
    color: ${colors.gray80};
    font-size: 14px;
    font-weight: 500;
  }
`;

const StyledAddableWrapper = styled(AddableWrapper)`
  margin-top: 19px;
  width: 683px;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 16px;
    width: 100%;
  }
`;
