import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, ReactNode } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Responsive from '@/components/common/Responsive';
import { DEFAULT_LINK, DEFAULT_MEMBER } from '@/components/projects/form/constants';
import CategoryField from '@/components/projects/form/fields/CategoryField';
import GenerationField from '@/components/projects/form/fields/GenerationField';
import LinkField from '@/components/projects/form/fields/LinkField';
import MemberField from '@/components/projects/form/fields/MemberField';
import PeriodField from '@/components/projects/form/fields/PeriodField';
import ServiceTypeField from '@/components/projects/form/fields/ServiceTypeField';
import StatusField from '@/components/projects/form/fields/StatusField';
import FormEntry from '@/components/projects/form/presenter/FormEntry';
import { defaultUploadValues, ProjectFormType, uploadSchema } from '@/components/projects/form/schema';
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
  const { control, handleSubmit, register, getValues, formState } = useForm<ProjectFormType>({
    resolver: zodResolver(uploadSchema),
    defaultValues,
    mode: 'all',
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });
  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control,
    name: 'links',
  });

  const { errors } = formState;

  const submit = () => {
    onSubmit?.(getValues());
  };

  return (
    <StyledFormContainer>
      {!hideProgress && <StyledFormProgress formState={formState} />}
      <StyledForm onSubmit={handleSubmit(submit)}>
        <FormEntry title='프로젝트 이름' required>
          <Input {...register('name')} placeholder='프로젝트' errorMessage={errors.name?.message ?? ''} />
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
        <FormEntry title='프로젝트 현재 상태'>
          <Controller control={control} name='status' render={({ field }) => <StatusField {...field} />} />
        </FormEntry>
        <FormEntry title='팀원' required>
          <StyledFieldsWrapper>
            {fields.map((field, index) => (
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
                    onRemove={() => remove(index)}
                  />
                )}
              />
            ))}
          </StyledFieldsWrapper>
          <StyledAddButton type='button' onClick={() => append(DEFAULT_MEMBER)}>
            + 추가하기
          </StyledAddButton>
        </FormEntry>
        <FormEntry title='서비스 형태' required comment='복수 선택 가능'>
          <Controller
            control={control}
            name='serviceType'
            render={({ field }) => <ServiceTypeField {...field} errorMessage={errors.serviceType?.message} />}
          />
        </FormEntry>
        <FormEntry
          title='링크'
          description={
            <>
              <Responsive only='desktop'>
                웹사이트, 구글 플레이스토어, 앱스토어, Github, 발표영상, 관련자료, instagram 등을 자유롭게
                업로드해주세요
              </Responsive>
              <Responsive only='mobile'>관련 자료를 자유롭게 업로드해주세요</Responsive>
            </>
          }
        >
          <StyledFieldsWrapper>
            {linkFields.map((field, index) => (
              <Controller
                key={field.id}
                control={control}
                name={`links.${index}`}
                render={({ field }) => (
                  <LinkField
                    {...field}
                    onRemove={() => removeLink(index)}
                    errorMessage={{
                      ...(errors.links && {
                        linkTitle: errors.links[index]?.linkTitle?.message,
                        linkUrl: errors.links[index]?.linkUrl?.message,
                      }),
                    }}
                  />
                )}
              />
            ))}
          </StyledFieldsWrapper>
          <StyledAddButton type='button' onClick={() => appendLink(DEFAULT_LINK)}>
            + 추가하기
          </StyledAddButton>
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

const StyledFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const StyledAddButton = styled.button`
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
