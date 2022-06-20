import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import DateInput from '@/components/common/DateInput';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Switch from '@/components/common/Switch';
import Text from '@/components/common/Text';
import {
  formItems,
  OfficialActivitiy,
  officiallActivityLabel,
  ProjectUploadForm,
  TH,
} from '@/components/project/upload/constants';
import FormTitle from '@/components/project/upload/FormTitle';
import MemberForm from '@/components/project/upload/MemberForm';
import { FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { colors } from '@/styles/colors';
import TextArea from '@/components/common/TextArea';
import FormStatus from '@/components/project/upload/FormStatus';
import useMemberForm from '@/components/project/upload/MemberForm/useMemberForm';
import IconLinkShare from '@/public/icons/icon-link-share.svg';
import { textStyles } from '@/styles/typography';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormDateTerm from '@/components/project/upload/FormDateTerm';

const schema = yup.object().shape({
  'name': yup.string().required('프로젝트 이름을 입력해주세요'),
  'termDate.dateFrom': yup.date(),
  'termDate.dateTo': yup.date(),
});
interface MemberForm {
  memberId: string;
  role: string;
  description: string;
}

const ProjectUploadPage: FC = () => {
  const methods = useForm<ProjectUploadForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      th: undefined,
      thChecked: false,
      officialActivity: undefined,
      isAvailable: false,
      isFounding: false,
      termDate: {
        dateFrom: undefined,
        dateTo: undefined,
        isOngoing: false,
      },
    },
  });

  const {
    register,
    control,
    formState: { dirtyFields },
  } = methods;

  const { members: appJamMembers, ...appJamMemberFormProps } = useMemberForm();
  const { members: releaseMembers, ...releaseMemberFormProps } = useMemberForm();

  const _formItems = formItems.map((formItem) =>
    dirtyFields?.[formItem.value]
      ? {
          ...formItem,
          isDirty: true,
        }
      : formItem,
  );

  return (
    <FormProvider {...methods}>
      <Container>
        <FormStatus formItems={_formItems} />
        <Project>
          <FormTitle typography='SUIT_24_SB'>프로젝트</FormTitle>
          <Divider />
          <FormTitle essential>프로젝트 이름</FormTitle>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <Input
                css={css`
                  margin-top: 9px;
                  width: 340px;
                `}
                placeholder='프로젝트'
                {...field}
              />
            )}
          />

          <FormTitle
            css={css`
              margin-top: 96px;
            `}
            typography='SUIT_18_SB'
          >
            기수
          </FormTitle>
          <Text
            typography='SUIT_16_M'
            color={colors.gray100}
            css={css`
              margin: 12px 0 18px;
            `}
          >
            참여한 팀원들의 기수에 맞춰 작성해주세요
          </Text>
          <Controller
            name='th'
            control={control}
            render={({ field }) => (
              <Select width={236} placeholder='선택' {...field}>
                {TH.map((item) => (
                  <option key={item} value={item}>
                    {item}기
                  </option>
                ))}
              </Select>
            )}
          />
          <CheckboxWrapper>
            <Controller
              name='thChecked'
              control={control}
              render={({ field: { value, ...props } }) => <Checkbox checked={value} {...props} />}
            />
            <Text typography='SUIT_12_M' color={colors.gray100}>
              특정 기수 활동으로 진행하지 않았어요
            </Text>
          </CheckboxWrapper>
          <FormTitle
            essential
            css={css`
              margin: 61.25px 0 14px;
            `}
          >
            어디서 진행했나요?
          </FormTitle>
          <Text
            typography='SUIT_16_M'
            color={colors.gray100}
            css={css`
              margin: 0 0 18px;
            `}
          >
            기수는 SOPT 공식 활동을 기준으로 선택해주세요
          </Text>
          <Controller
            name='officialActivity'
            control={control}
            render={({ field }) => (
              <Select placeholder='선택' {...field}>
                {Object.values(OfficialActivitiy).map((officalActivity) => (
                  <option key={officalActivity} value={officalActivity}>
                    {officiallActivityLabel[officalActivity]}
                  </option>
                ))}
              </Select>
            )}
          />
          <div
            css={css`
              display: flex;
              gap: 8px;
              align-items: center;
              margin: 18px 0 0;
            `}
          >
            <Switch {...register('isAvailable')} />
            <Text typography='SUIT_12_M' color={colors.gray100}>
              현재 이 서비스를 이용할 수 있나요?
            </Text>
          </div>
          <div
            css={css`
              display: flex;
              gap: 8px;
              align-items: center;
              margin: 18px 0 0;
            `}
          >
            <Controller name='isFounding' control={control} render={({ field }) => <Switch {...field} />} />
            <Text typography='SUIT_12_M' color={colors.gray100}>
              현재 이 프로젝트로 창업을 진행하고 있나요?
            </Text>
          </div>
          <AppjamMembersWrapper>
            <AppjamMemberTitleWrapper>
              <FormTitle essential>앱잼 팀원</FormTitle>
              <LinkShareWrapper>
                회원가입 링크 공유
                <LinkShareButton>
                  <IconLinkShare />
                </LinkShareButton>
              </LinkShareWrapper>
            </AppjamMemberTitleWrapper>
            <Text color={colors.gray100}>회원가입을 한 사람만 팀원 등록이 가능해요</Text>
            <MemberForm members={appJamMembers} {...appJamMemberFormProps} />
          </AppjamMembersWrapper>
          <ReleaseMembersWrapper>
            <FormTitle>추가 합류한 팀원</FormTitle>
            <Text color={colors.gray100}>
              회원가입을 한 사람만 팀원 등록이 가능해요. 릴리즈에 합류한 팀원들의 이름을 적어주세요
            </Text>
            <MemberForm members={releaseMembers} {...releaseMemberFormProps} />
          </ReleaseMembersWrapper>
          <FormTitle
            essential
            description='복수선택 가능'
            css={css`
              margin: 60px 0 0;
            `}
          >
            서비스 형태
          </FormTitle>
          <ServiceTypeButtonWrapper>
            <Button>웹</Button>
            <Button>앱</Button>
          </ServiceTypeButtonWrapper>
          <StyledFormDateTerm />
          <FormTitle
            essential
            css={css`
              margin: 0 0 20px;
            `}
          >
            프로젝트 한줄 소개
          </FormTitle>
          <Input placeholder='프로젝트 한줄 소개' />
          <DescriptionWrapper>
            <FormTitle essential>프로젝트 설명</FormTitle>
            <DescriptionTextArea placeholder='프로젝트에 대해 설명해주세요' />
          </DescriptionWrapper>
          <FormTitle
            css={css`
              margin: 84px 0 0;
            `}
          >
            썸네일 이미지
          </FormTitle>
          <Text
            css={css`
              margin: 12px 0 18px;
            `}
            typography='SUIT_16_M'
            color={colors.gray100}
          >
            가로 300px : 세로 400px, 1MB 이내로 썸네일을 제작해주세요
          </Text>
          <FormTitle essential>썸네일</FormTitle>
          <Text typography='SUIT_16_M' color={colors.gray100}>
            가로 1000px : 세로 제한없음, 10MB 이내로 프로젝트 이미지를 제작해주세요
          </Text>
          <FormTitle>링크</FormTitle>
          <Text typography='SUIT_16_M' color={colors.gray100}>
            웹사이트, 구글 플레이스토어, 앱스토어, Github, 발표영상, 관련자료, instagram 등을 자유롭게 업로드해주세요
          </Text>
        </Project>
      </Container>
    </FormProvider>
  );
};

export default ProjectUploadPage;

const Container = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  margin: 167px auto 0;
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: ${colors.black80};
  padding: 47px 40px;
  width: 892px;
`;

const Divider = styled.hr`
  margin: 36px 0 28px;
  border: none;
  background-color: ${colors.black60};
  width: 100%;
  height: 1.5px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 13.25px 0 61.25px;
`;

const AppjamMembersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 0 0;

  & > span {
    margin: 14px 0 18px;
  }
`;

const AppjamMemberTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LinkShareWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.gray100};
  ${textStyles.SUIT_12_M};
`;

const LinkShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 7px;
  border-radius: 6px;
  background-color: ${colors.black60};
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

const ReleaseMembersWrapper = styled(AppjamMembersWrapper)``;

const ServiceTypeButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 20px 0 0;
`;

const DescriptionWrapper = styled.div`
  margin: 84px 0 0;
`;

const DescriptionTextArea = styled(TextArea)`
  margin: 14px 0 0;
  min-height: 170px;
`;

const ThumbnailWrapper = styled.div`
  margin: 84px 0 0;
`;

const StyledFormDateTerm = styled(FormDateTerm)`
  margin: 60px 0 0;
`;
