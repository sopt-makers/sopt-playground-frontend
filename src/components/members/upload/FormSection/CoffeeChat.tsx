import styled from '@emotion/styled';
import { Button, Tag, Toggle } from '@sopt-makers/ui';
import { Flex } from '@toss/emotion-utils';
import Text from '@/components/common/Text';
import { colors } from '@sopt-makers/colors';
import { useFormContext } from 'react-hook-form';
import { MemberUploadForm } from '@/components/members/upload/types';
import ResizedImage from '@/components/common/ResizedImage';
import { useState } from 'react';

function CoffeeChatFormSection() {
  const { getValues } = useFormContext<MemberUploadForm>();

  const skills = getValues('skill')
    .split(',')
    .map((skill) => skill.trim());

  const [isCoffeeChatActivate, setIsCoffeeChatActivate] = useState(false);

  return (
    <FormSection>
      <div style={{ width: '100%' }}>
        <Flex align='center' style={{ gap: 12 }}>
          <Tag size='sm' shape='rect' variant='primary' type='solid'>
            NEW
          </Tag>
          <Title>
            SOPT 구성원과 커피챗으로 경험 공유하기
            <Required>*</Required>
          </Title>
          <CoffeeChatToggle
            onClick={() => {
              setIsCoffeeChatActivate((prev) => !prev);
            }}
          >
            <Toggle size='lg' checked={isCoffeeChatActivate} />
          </CoffeeChatToggle>
        </Flex>
        <Description>토글을 켜면 프로필 상단에 노출이 되니, 커리어를 더 상세히 작성해주세요.</Description>
        {skills.length > 0 ? (
          <Flex direction='column' style={{ gap: 12, marginTop: 12 }}>
            <Skill>
              *현재 보유한 스킬
              <Flex style={{ gap: 4, marginTop: 4 }}>
                {skills.map((skill) => (
                  <Tag size='sm' shape='rect' variant='secondary' type='solid'>
                    {skill}
                  </Tag>
                ))}
              </Flex>
            </Skill>
            <Button size='sm' theme='black' style={{ width: 'fit-content' }}>
              스킬 추가하기
            </Button>
          </Flex>
        ) : (
          <Flex align='center' style={{ gap: 8, marginTop: 12 }}>
            <Skill>*현재 보유한 스킬이 없어요'</Skill>
            <Button size='sm' theme='black'>
              스킬 작성하러 가기
            </Button>
          </Flex>
        )}
      </div>
      <ProfileImage>
        {getValues('profileImage') ? (
          <Image src={getValues('profileImage')} width={116} alt='member_image' />
        ) : (
          <DefaultImage src='/icons/icon-member-default.svg' alt='default_member_image' />
        )}
      </ProfileImage>
    </FormSection>
  );
}

export default CoffeeChatFormSection;

const FormSection = styled.section`
  display: flex;
  gap: 18px;
  justify-content: space-between;
  border-radius: 30px;
  background: var(--grayscale-scale-900, #17181c);
  padding: 40px;
`;

const Title = styled.div`
  line-height: 28px; /* 155.556% */
  letter-spacing: -0.36px;
  color: ${colors.gray10};

  /* Heading/18_B */
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
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
`;

const Skill = styled.div`
  line-height: 22px; /* 157.143% */
  letter-spacing: -0.21px;
  color: ${colors.gray300};

  /* Body/14_M */
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
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
