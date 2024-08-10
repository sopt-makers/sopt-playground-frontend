import styled from '@emotion/styled';
import { Button, Tag, Toggle, useToast } from '@sopt-makers/ui';
import { Flex, Spacing } from '@toss/emotion-utils';
import Text from '@/components/common/Text';
import { colors } from '@sopt-makers/colors';
import { Controller, useFormContext, useFormState, useWatch } from 'react-hook-form';
import { MemberUploadForm } from '@/components/members/upload/types';
import ResizedImage from '@/components/common/ResizedImage';
import { useState } from 'react';
import Input from '@/components/common/Input';
import FormItem from '@/components/members/upload/forms/FormItem';
import { AnimatePresence, m } from 'framer-motion';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import HorizontalScroller from '@/components/common/HorizontalScroller';
import Responsive from '@/components/common/Responsive';
import IconCoffee from '@/public/icons/icon-coffee.svg';

function CoffeeChatFormSection() {
  const { control, getValues } = useFormContext<MemberUploadForm>();
  const { errors } = useFormState({ control });
  const isCoffeeChatActivate = useWatch({ control, name: 'isCoffeeChatActivate' });

  const { open } = useToast();

  const skills = getValues('skill')
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean);

  const handleClickGoToSkill = () => {
    const element = document.querySelector('.skill');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const skills = element.querySelector('input') || element.querySelector('textarea');
      skills?.focus({ preventScroll: true });
    }
  };

  return (
    <FormSection>
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Responsive only='desktop'>
          <Header align='center'>
            <Tag size='sm' shape='rect' variant='primary' type='solid'>
              NEW
            </Tag>
            <Title>
              SOPT 구성원과 커피챗으로 경험 공유하기
              <Required>*</Required>
            </Title>
            <Controller
              name='isCoffeeChatActivate'
              control={control}
              render={({ field }) => (
                <CoffeeChatToggle
                  {...field}
                  onClick={() => {
                    field.onChange(!field.value);
                    open({
                      icon: 'success',
                      content: field.value
                        ? '다음에는 여러분의 좋은 경험을 꼭 공유해주세요'
                        : '여러분의 좋은 경험을 공유해주셔서 고마워요',
                    });
                  }}
                >
                  <Toggle size='lg' checked={field.value} />
                </CoffeeChatToggle>
              )}
            />
          </Header>
        </Responsive>
        <Responsive only='mobile'>
          <Tag size='sm' shape='rect' variant='primary' type='solid'>
            NEW
          </Tag>
          <Spacing size={6} />
          <Header align='center'>
            <Title>
              SOPT 구성원과 커피챗으로 경험 공유하기
              <Required>*</Required>
            </Title>
            <Controller
              name='isCoffeeChatActivate'
              control={control}
              render={({ field }) => (
                <CoffeeChatToggle
                  {...field}
                  onClick={() => {
                    field.onChange(!field.value);
                    open({
                      icon: 'success',
                      content: field.value
                        ? '다음에는 여러분의 좋은 경험을 꼭 공유해주세요'
                        : '여러분의 좋은 경험을 공유해주셔서 고마워요',
                    });
                  }}
                >
                  <Toggle size='sm' checked={field.value} />
                </CoffeeChatToggle>
              )}
            />
          </Header>
        </Responsive>
        <Description>{'토글을 켜면 프로필 상단에 노출이 되니,\n커리어를 더 상세히 작성해주세요.'}</Description>
        {skills.length > 0 ? (
          <Flex direction='column' style={{ gap: 12, marginTop: 12 }}>
            <Skill>
              *현재 보유한 스킬
              <HorizontalScroller>
                <Flex style={{ gap: 4, marginTop: 4 }}>
                  {skills.map((skill) => (
                    <Tag size='sm' shape='rect' variant='secondary' type='solid'>
                      {skill}
                    </Tag>
                  ))}
                </Flex>
              </HorizontalScroller>
            </Skill>
            <Button size='sm' theme='black' style={{ width: 'fit-content' }} onClick={handleClickGoToSkill}>
              스킬 추가하기
            </Button>
          </Flex>
        ) : (
          <Flex align='center' style={{ gap: 8, marginTop: 12 }}>
            <Skill>*현재 보유한 스킬이 없어요</Skill>
            <Button size='sm' theme='black' onClick={handleClickGoToSkill}>
              스킬 작성하러 가기
            </Button>
          </Flex>
        )}
        <AnimatePresence>
          {isCoffeeChatActivate && (
            <m.div key='intro' initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
              <CoffeeChatIntroForm required title='커피챗 한줄 소개'>
                <Controller
                  name='coffeeChatBio'
                  control={control}
                  render={({ field }) => (
                    <CoffeeChatIntroInput
                      {...field}
                      placeholder='어떤 이야기를 나누고 싶은지 작성해보세요!'
                      onChange={field.onChange}
                      errorMessage={errors.coffeeChatBio?.message}
                      count={true}
                      maxCount={40}
                    />
                  )}
                />
              </CoffeeChatIntroForm>
            </m.div>
          )}
        </AnimatePresence>
      </div>
      <ProfileSection>
        {isCoffeeChatActivate && (
          <IconContainer>
            <IconCoffee />
          </IconContainer>
        )}
        <ProfileImage>
          {getValues('profileImage') ? (
            <Image src={getValues('profileImage')} width={116} alt='member_image' />
          ) : (
            <DefaultImage src='/icons/icon-member-default.svg' alt='default_member_image' />
          )}
        </ProfileImage>
      </ProfileSection>
    </FormSection>
  );
}

export default CoffeeChatFormSection;

const FormSection = styled.section`
  display: flex;
  gap: 18px;
  justify-content: space-between;
  border-radius: 30px;
  background: ${colors.gray900};
  padding: 40px;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 12px;
    padding: 16px 14px;
  }
`;

const Header = styled(Flex)`
  gap: 12px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 4px;
  }
`;

const Title = styled.div`
  line-height: 28px; /* 155.556% */
  letter-spacing: -0.36px;
  color: ${colors.gray10};

  /* Heading/18_B */
  font-size: 18px;
  font-weight: 700;
  font-style: normal;

  @media ${MOBILE_MEDIA_QUERY} {
    line-height: 24px;
    font-size: 16px;
    letter-spacing: -0.24px;
  }
`;

const Required = styled(Text)`
  display: inline-block;
  transform: translateY(-10px);
  line-height: 8px;
  color: ${colors.secondary};
  font-size: 16px;
  font-weight: 500;
`;

const CoffeeChatToggle = styled.div`
  cursor: pointer;

  & > button {
    justify-content: flex-start;
  }

  & span {
    transform: translateX(0);
    transition: transform 200ms;
    will-change: transform;
  }

  & span[data-state='true'] {
    transform: translateX(16px);
  }

  @media ${MOBILE_MEDIA_QUERY} {
    & span[data-state='true'] {
      transform: translateX(12px);
    }
  }
`;

const Description = styled.div`
  margin-top: 20px;
  line-height: 30px; /* 166.667% */
  letter-spacing: -0.27px;
  color: ${colors.gray100};

  /* Body/18_M */
  font-size: 18px;
  font-weight: 500;
  font-style: normal;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 6px;

    line-height: 20px;
    font-size: 13px;
    letter-spacing: -0.195px;
    white-space: pre-wrap;
  }
`;

const Skill = styled.div`
  line-height: 22px; /* 157.143% */
  letter-spacing: -0.21px;
  color: ${colors.gray300};

  /* Body/14_M */
  font-size: 14px;
  font-weight: 500;
  font-style: normal;

  @media ${MOBILE_MEDIA_QUERY} {
    line-height: 20px;
    font-size: 13px;
    font-weight: 300;
    letter-spacing: -0.195px;
  }
`;

const ProfileImage = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.gray700};
  width: 116px;
  height: 116px;
  overflow: hidden;
`;

const Image = styled(ResizedImage)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const DefaultImage = styled.img`
  width: 40%;
`;

const ProfileSection = styled.div`
  position: relative;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  padding: 5px;
  width: 32px;
  height: 32px;
  background: ${colors.blue400};
`;

const CoffeeChatIntroForm = styled(FormItem)`
  margin-top: 32px;

  & span {
    font-size: 14px;
  }

  & > div:nth-of-type(1) {
    margin: 8px 0;
  }
`;

const CoffeeChatIntroInput = styled(Input)`
  margin-top: 20px;
  width: 100%;

  input {
    border-radius: 14px;
    padding: 14.5px 20px;

    &::placeholder {
      color: ${colors.gray400};
    }
  }
`;

const Count = styled.div`
  align-self: stretch;
  text-align: right;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.24px;
  color: ${colors.gray300};

  /* Label/12_SB */
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
`;
