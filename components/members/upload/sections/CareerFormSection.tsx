import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FormEvent, ReactNode } from 'react';
import { FieldError, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import EditableSelect from '@/components/common/EditableSelect';
import Input from '@/components/common/Input';
import MonthPicker from '@/components/common/MonthPicker';
import Responsive from '@/components/common/Responsive';
import Switch from '@/components/common/Switch';
import TextArea from '@/components/common/TextArea';
import AddableItem from '@/components/members/upload/AddableItem';
import AddableWrapper from '@/components/members/upload/AddableWrapper';
import { DEFAULT_CAREER, DEFAULT_LINK, LINK_TITLES } from '@/components/members/upload/constants';
import MemberFormItem from '@/components/members/upload/forms/FormItem';
import { MemberFormSection as FormSection } from '@/components/members/upload/forms/FormSection';
import MemberSelectOptions from '@/components/members/upload/forms/SelectOptions';
import { MemberUploadForm } from '@/components/members/upload/types';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface CareerFormSectionProps {
  header?: ReactNode;
}
export default function CareerFormSection({ header }: CareerFormSectionProps) {
  const {
    control,
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<MemberUploadForm>();
  const {
    fields: careerFields,
    append: appendCareer,
    remove: removeCareer,
  } = useFieldArray({
    control,
    name: 'careers',
  });
  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control,
    name: 'links',
  });
  const careers = useWatch({ control, name: 'careers' });
  const linkCategories = useWatch({ control, name: 'links' });

  const handleAppendCareer = () => appendCareer(DEFAULT_CAREER);
  const handleRemoveCareer = (index: number) => removeCareer(index);
  const getCareerErrorMessage = (
    careerError:
      | {
          title?: FieldError | undefined;
          companyName?: FieldError | undefined;
          startDate?: FieldError | undefined;
          endDate?: FieldError | undefined;
        }
      | undefined,
  ) => {
    if (!careerError) return;
    if (careerError.hasOwnProperty('title')) return careerError.title?.message;
    if (careerError.hasOwnProperty('companyName')) return careerError.companyName?.message;
    if (careerError.hasOwnProperty('startDate')) return careerError.startDate?.message;
    return careerError.endDate?.message;
  };

  const handleAppendLink = () => appendLink(DEFAULT_LINK);
  const handleRemoveLink = (index: number) => removeLink(index);
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

  const handleChangeIsCurrent = (e: FormEvent<HTMLInputElement>, index: number) => {
    register(`careers.${index}.isCurrent`).onChange(e);
    trigger(`careers.${index}.endDate`);
  };
  const handleChangeStartDate = (date: Date, index: number) => {
    setValue(`careers.${index}.startDate`, date ? dayjs(date).format('YYYY-MM') : '');
    trigger(`careers.${index}.startDate`);
  };
  const handleChangeEndDate = (date: Date, index: number) => {
    setValue(`careers.${index}.endDate`, date ? dayjs(date).format('YYYY-MM') : '');
    trigger(`careers.${index}.endDate`);
  };

  return (
    <FormSection>
      {header}
      <FormItems>
        <div>
          <CareerTitle>커리어</CareerTitle>
          <StyledCareerAddableWrapper onAppend={handleAppendCareer}>
            {careerFields.map((field, index) => (
              <AddableItem
                errorMessage={getCareerErrorMessage(errors.careers?.[index])}
                onRemove={() => handleRemoveCareer(index)}
                key={field.id}
              >
                <CareerItem>
                  <Input {...register(`careers.${index}.companyName`)} placeholder='회사 입력' />
                  <Input {...register(`careers.${index}.title`)} placeholder='직무 입력' />
                  <IsCurrent>
                    현재 재직 중
                    <Switch
                      {...register(`careers.${index}.isCurrent`)}
                      onChange={(e) => handleChangeIsCurrent(e, index)}
                    />
                  </IsCurrent>
                  {careers.length && (
                    <>
                      <MonthPicker
                        value={careers[index]?.startDate ? new Date(careers[index]?.startDate) : null}
                        onChange={(date: Date) => handleChangeStartDate(date, index)}
                        placeholder='근무 시작일'
                      />
                      <EndDateWrapper isShow={watch(`careers.${index}.isCurrent`)}>
                        <MonthPicker
                          value={careers[index]?.endDate ? new Date(careers[index]?.endDate ?? '') : null}
                          onChange={(date: Date) => handleChangeEndDate(date, index)}
                          placeholder='근무 종료일'
                        />
                      </EndDateWrapper>
                    </>
                  )}
                </CareerItem>
              </AddableItem>
            ))}
          </StyledCareerAddableWrapper>
        </div>

        <Responsive only='desktop' asChild>
          <>
            <MemberFormItem
              title='스킬'
              description='내가 자신있는 스킬에 대해 작성해주세요. 쉼표(,)로 구분해서 적어주세요.'
            >
              <StyledInput {...register('skill')} placeholder='ex) Node, Product Managing, Branding, UI' />
            </MemberFormItem>
            <MemberFormItem title='링크' description='Github, instagram, 개인 웹사이트 등을 자유롭게 업로드해주세요'>
              <StyledAddableWrapper onAppend={handleAppendLink}>
                {linkFields.map((field, index) => (
                  <AddableItem
                    onRemove={() => handleRemoveLink(index)}
                    key={field.id}
                    errorMessage={getLinksErrorMessage(errors.links?.[index])}
                  >
                    <StyledSelectWrapper>
                      <StyledEditableSelect
                        placeholder='링크를 입력해주세요'
                        {...register(`links.${index}.title`)}
                        error={errors?.links?.[index]?.hasOwnProperty('title')}
                        className='category'
                        onSelect={(value: string) => {
                          setValue(`links.${index}.title`, value);
                          trigger(`links.${index}.title`);
                        }}
                        value={linkCategories[index]?.title ?? ''}
                      >
                        <MemberSelectOptions options={LINK_TITLES} />
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
            </MemberFormItem>
          </>
        </Responsive>

        <Responsive only='mobile' asChild>
          <>
            <MemberFormItem
              title='스킬'
              description={`내가 자신있는 스킬에 대해 작성해주세요.\n쉼표(,)로 구분해서 적어주세요.`}
            >
              <StyledTextArea {...register('skill')} placeholder='ex) Node, Product Managing, BI/BX' />
            </MemberFormItem>
            <MemberFormItem title='링크' description='Github, instagram, 개인 웹사이트 등을 자유롭게 업로드해주세요'>
              <StyledAddableWrapper onAppend={handleAppendLink}>
                {linkFields.map((field, index) => (
                  <AddableItem
                    onRemove={() => handleRemoveLink(index)}
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
                        className='category'
                      >
                        <MemberSelectOptions options={LINK_TITLES} />
                      </StyledEditableSelect>
                      <StyledInput
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
            </MemberFormItem>
          </>
        </Responsive>
      </FormItems>
    </FormSection>
  );
}

const IsCurrent = styled.div`
  display: flex;
  grid-column: 1 / span 2;
  gap: 9px;
  align-items: center;
  margin: 16px 0 10px;

  ${textStyles.SUIT_16_M}
`;

const CareerItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 18px;
  width: 630px;

  /* stylelint-disable-next-line selector-class-pattern */
  .react-datepicker__tab-loop {
    grid-row-start: 3;
    grid-column-start: 1;
  }
  /* stylelint-disable-next-line selector-class-pattern */
  .react-datepicker__triangle {
    display: none !important;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const CareerTitle = styled.div`
  grid-column: 1 / span 2;
  margin-bottom: 18px;

  ${textStyles.SUIT_18_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 14px;
  }
`;

const EndDateWrapper = styled.div`
  ${(props: { isShow: boolean }) => props.isShow && 'display: none;'};

  position: relative;

  &::before {
    position: absolute;
    bottom: 16px;
    left: -14px;
    content: '-';
    ${textStyles.SUIT_16_M}
  }
`;

const StyledInput = styled(Input)`
  margin-top: 18px;
  width: 632px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
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
  height: 128px;
`;

const StyledAddableWrapper = styled(AddableWrapper)`
  margin-top: 13px;
  width: 683px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledCareerAddableWrapper = styled(AddableWrapper)`
  display: flex;
  flex-direction: column;
  gap: 36px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 20px;
  }
`;

const FormItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin-top: 32px;
`;
