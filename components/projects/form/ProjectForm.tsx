import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, ReactNode } from 'react';
import { Controller, useFieldArray, useForm, useFormState, useWatch } from 'react-hook-form';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/Input/ErrorMessage';
import TextArea from '@/components/common/TextArea';
import { categoryLabel, CategoryType } from '@/components/projects/form/constants';
import CategoryField from '@/components/projects/form/fields/CategoryField';
import GenerationField from '@/components/projects/form/fields/GenerationField';
import MemberField from '@/components/projects/form/fields/MemberField';
import PeriodField from '@/components/projects/form/fields/PeriodField';
import FormEntry from '@/components/projects/form/presenter/FormEntry';
import { DEFAULT_MEMBER, defaultUploadValues, ProjectFormType, uploadSchema } from '@/components/projects/form/schema';
import UploadProjectProgress from '@/components/projects/form/UploadProjectProgress';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ProjectFormProps {
  onSubmit?: (formData: ProjectFormType) => void;
  submitButtonContent: ReactNode;
  defaultValues?: ProjectFormType;
  hideProgress?: boolean;
}

const ProjectForm: FC<ProjectFormProps> = ({
  onSubmit,
  submitButtonContent,
  defaultValues = defaultUploadValues,
  hideProgress = false,
}) => {
  const { control, handleSubmit, register, formState } = useForm<ProjectFormType>({
    resolver: zodResolver(uploadSchema),
    defaultValues,
    mode: 'all',
  });
  const {
    fields: memberFields,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({
    control,
    name: 'members',
  });
  const {
    fields: releaseMemberFields,
    append: appendReleaseMember,
    remove: removeReleaseMember,
  } = useFieldArray({
    control,
    name: 'releaseMembers',
  });
  const { category } = useWatch({
    control,
  });
  const { errors } = useFormState({
    control,
  });

  const submit = (data: ProjectFormType) => {
    onSubmit?.(data);
  };

  return (
    <StyledFormContainer>
      {!hideProgress && <StyledFormProgress formState={formState} />}
      <StyledForm onSubmit={handleSubmit(submit)}>
        <FormEntry title='프로젝트 이름' required>
          <StyledInput {...register('name')} placeholder='프로젝트' errorMessage={errors.name?.message ?? ''} />
        </FormEntry>
        <FormEntry title='기수' description='참여한 팀원들의 기수에 맞춰 작성해주세요' required>
          <Controller
            control={control}
            name='generation'
            render={({ field }) => <GenerationField {...field} errorMessage={errors.generation?.message} />}
          />
        </FormEntry>
        <FormEntry title='어디서 진행했나요?' description='기수는 SOPT 공식 활동을 기준으로 선택해주세요' required>
          <Controller
            control={control}
            name='category'
            render={({ field }) => (
              <CategoryField {...field} errorMessage={errors.category?.message} isError={!!errors.category} />
            )}
          />
        </FormEntry>
        <FormEntry
          title={`${category ? categoryLabel[category as CategoryType] + ' ' : ''}팀원`}
          required
          description='회원가입을 한 사람만 팀원 등록이 가능해요'
        >
          <StyledMemberFieldWrapper>
            {memberFields.map((field, index) => (
              <Controller
                key={field.id}
                control={control}
                name={`members.${index}`}
                render={({ field }) => (
                  <MemberField
                    errorMessage={{
                      ...(errors.members && {
                        memberId: errors.members[index]?.memberId?.message,
                        memberRole: errors.members[index]?.memberRole?.message,
                        memberDescription: errors.members[index]?.memberDescription?.message,
                      }),
                    }}
                    value={field.value}
                    onChange={field.onChange}
                    onRemove={() => removeMember(index)}
                  />
                )}
              />
            ))}
          </StyledMemberFieldWrapper>
          <StyledMemberAddButton type='button' onClick={() => appendMember(DEFAULT_MEMBER)}>
            + 추가하기
          </StyledMemberAddButton>
        </FormEntry>
        <FormEntry
          title='추가 합류한 팀원'
          description='릴리즈에 합류한 팀원들의 이름을 적어주세요. 회원가입을 한 사람만 팀원 등록이 가능해요'
        >
          <StyledMemberFieldWrapper>
            {releaseMemberFields.map((field, index) => (
              <Controller
                key={field.id}
                control={control}
                name={`releaseMembers.${index}`}
                render={({ field }) => (
                  <MemberField
                    errorMessage={{
                      ...(errors.members && {
                        memberId: errors.members[index]?.memberId?.message,
                        memberRole: errors.members[index]?.memberRole?.message,
                        memberDescription: errors.members[index]?.memberDescription?.message,
                      }),
                    }}
                    value={field.value}
                    onChange={field.onChange}
                    onRemove={() => removeReleaseMember(index)}
                  />
                )}
              />
            ))}
          </StyledMemberFieldWrapper>
          <StyledMemberAddButton type='button' onClick={() => appendReleaseMember(DEFAULT_MEMBER)}>
            + 추가하기
          </StyledMemberAddButton>
        </FormEntry>
        <FormEntry title='프로젝트 기간' required>
          <Controller
            control={control}
            name='period'
            render={({ field }) => (
              <PeriodField
                {...field}
                errorMessage={errors.period?.startAt?.message ?? errors.period?.endAt?.message}
                isStartError={!!errors.period?.startAt}
                isEndError={!!errors.period?.endAt}
              />
            )}
          />
        </FormEntry>
        <FormEntry title='프로젝트 한줄 소개' required>
          <StyledInput
            {...register('summary')}
            placeholder='프로젝트 한줄 소개'
            error={!!errors.summary}
            count
            maxCount={30}
          />
          <ErrorMessage message={errors.summary?.message} />
        </FormEntry>
        <FormEntry title='프로젝트 설명' required>
          <StyledTextArea
            {...register('detail')}
            placeholder='프로젝트에 대해 설명해주세요'
            error={!!errors.detail}
            count
            maxCount={500}
          />
          <ErrorMessage message={errors.detail?.message} />
        </FormEntry>
        <SubmitContainer>
          <Button type='submit' variant='primary'>
            {submitButtonContent}
          </Button>
        </SubmitContainer>
      </StyledForm>
    </StyledFormContainer>
  );
};

export default ProjectForm;

const StyledFormContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const StyledFormProgress = styled(UploadProjectProgress)`
  flex-shrink: 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 60px;
  border-radius: 12px;
  background-color: ${colors.black80};
  padding: 47px 40px;
  width: 892px;

  @media screen and (max-width: 1055px) {
    border-radius: 0%;
    width: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 38px 24px 107px;
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 60px;

  & > button {
    ${textStyles.SUIT_14_M};
  }
`;

const StyledMemberFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const StyledMemberAddButton = styled.button`
  display: flex;
  align-items: center;
  align-self: start;
  justify-content: center;
  margin: 14px 0 0 20px;
  cursor: pointer;
  color: ${colors.gray100};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 12px 0 0;
    border: 1px solid ${colors.black40};
    border-radius: 6px;
    background-color: ${colors.black60};
    padding: 14px 16px;
    width: 100%;
    ${textStyles.SUIT_14_M};
  }
`;

const StyledInput = styled(Input)`
  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M};
  }
`;

const StyledTextArea = styled(TextArea)`
  min-height: 170px;

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M};
  }
`;
