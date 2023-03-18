import styled from '@emotion/styled';
import { FieldError, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import EditableSelect from '@/components/common/EditableSelect';
import Input from '@/components/common/Input';
import Responsive from '@/components/common/Responsive';
import TextArea from '@/components/common/TextArea';
import AddableItem from '@/components/members/upload/AddableItem';
import AddableWrapper from '@/components/members/upload/AddableWrapper';
import { DEFAULT_LINK, LINK_TITLES } from '@/components/members/upload/constants';
import CountableInput from '@/components/members/upload/forms/CountableInput';
import CountableTextArea from '@/components/members/upload/forms/CountableTextArea';
import FormHeader from '@/components/members/upload/forms/FormHeader';
import FormItem from '@/components/members/upload/forms/FormItem';
import { MemberFormSection as FormSection } from '@/components/members/upload/forms/FormSection';
import SelectOptions from '@/components/members/upload/forms/SelectOptions';
import { MemberUploadForm } from '@/components/members/upload/types';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function MemberAdditionalFormSection() {
  const {
    register,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<MemberUploadForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });
  const linkCategories = useWatch({ control, name: 'links' });

  const onAppend = () => append(DEFAULT_LINK);
  const onRemove = (index: number) => remove(index);
  const getLinksErrorMessage = (
    linksError:
      | {
          title?: FieldError | undefined;
          url?: FieldError | undefined;
        }
      | undefined,
  ) => {
    if (!linksError) return;
    if (linksError.hasOwnProperty('title')) return linksError.title?.message;
    return linksError.url?.message;
  };

  return (
    <FormSection>
      <FormHeader title='추가정보' />
      <Responsive only='desktop'>
        <StyledFormItems>
          <FormItem title='한줄소개' description='나를 표현할 수 있는 한 줄을 소개해주세요!'>
            <StyledCountableInput {...register('introduction')} maxCount={30} />
          </FormItem>
          <FormItem title='스킬' description='내가 자신있는 스킬에 대해 작성해주세요. 쉼표(,)로 구분해서 적어주세요.'>
            <StyledInput {...register('skill')} placeholder='ex) Node, Product Managing, Branding, UI' />
          </FormItem>
          <FormItem title='링크' description='Github, instagram, 개인 웹사이트 등을 자유롭게 업로드해주세요'>
            <StyledAddableWrapper onAppend={onAppend}>
              {fields.map((field, index) => (
                <AddableItem
                  onRemove={() => onRemove(index)}
                  key={field.id}
                  errorMessage={getLinksErrorMessage(errors.links?.[index])}
                >
                  <StyledSelectWrapper>
                    <StyledEditableSelect
                      placeholder='링크를 입력해주세요'
                      {...register(`links.${index}.title`)}
                      error={errors?.links?.[index]?.hasOwnProperty('title')}
                      width='100%'
                      className='category'
                      onSelect={(value: string) => {
                        setValue(`links.${index}.title`, value);
                        trigger(`links.${index}.title`);
                      }}
                      value={linkCategories[index]?.title ?? ''}
                    >
                      <SelectOptions options={LINK_TITLES} />
                    </StyledEditableSelect>
                    <Input
                      {...register(`links.${index}.url`)}
                      error={errors?.links?.[index]?.hasOwnProperty('url')}
                      placeholder='https://'
                      className='link'
                    />
                  </StyledSelectWrapper>
                </AddableItem>
              ))}
            </StyledAddableWrapper>
          </FormItem>
        </StyledFormItems>
      </Responsive>

      <Responsive only='mobile'>
        <MobileFormItems>
          <FormItem title='한줄소개' description='나를 표현할 수 있는 한 줄을 소개해주세요!'>
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
                <AddableItem
                  onRemove={() => onRemove(index)}
                  key={field.id}
                  errorMessage={getLinksErrorMessage(errors.links?.[index])}
                >
                  <StyledSelectWrapper>
                    <StyledEditableSelect
                      placeholder='ex) Instagram'
                      {...register(`links.${index}.title`)}
                      onSelect={(value: string) => {
                        setValue(`links.${index}.title`, value);
                        trigger(`links.${index}.title`);
                      }}
                      value={linkCategories[index]?.title ?? ''}
                      error={errors?.links?.[index]?.hasOwnProperty('title')}
                      width='100%'
                      className='category'
                    >
                      <SelectOptions options={LINK_TITLES} />
                    </StyledEditableSelect>
                    <Input
                      {...register(`links.${index}.url`)}
                      error={errors?.links?.[index]?.hasOwnProperty('url')}
                      placeholder='https://'
                      className='link'
                      type='url'
                    />
                  </StyledSelectWrapper>
                </AddableItem>
              ))}
            </StyledAddableWrapper>
          </FormItem>
        </MobileFormItems>
      </Responsive>
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

    @media ${MOBILE_MEDIA_QUERY} {
      flex: 1;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 11px;
    height: 111px;
  }
`;

const StyledEditableSelect = styled(EditableSelect)`
  border-width: 1.5px;
  border-radius: 14px;
  padding: 16px 34px 16px 20px;
  height: 50px;

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 12px;
    background-color: ${colors.black80};
  }
`;

const StyledTextArea = styled(TextArea)`
  margin-top: 14px;
`;

const StyledCountableTextArea = styled(CountableTextArea)`
  margin-top: 16px;
  width: 100%;
  height: 128px;
`;

const StyledAddableWrapper = styled(AddableWrapper)`
  margin-top: 19px;
  width: 683px;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 16px;
    width: 100%;
  }
`;
