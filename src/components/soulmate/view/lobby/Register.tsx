import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, useState } from 'react';

import Checkbox from '@/components/common/Checkbox';
import SoulmateIcon from '@/components/soulmate/icons/SoulmateIcon';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface RegisterProps {}

const requiresData = [
  {
    title: '🔔 소울메이트 매칭 알림 받기',
    description: '매칭시 문자로 알려드릴 예정이에요!',
    agreeMessage: '문자 수신 동의',
  },
  {
    title: '🙍 멤버 프로필 공개 여부 동의',
    description: '모든 미션을 수행하고 나면 서로의 멤버프로필이 공개되어 소울메이트의 정체를 확인할 수 있어요.',
    agreeMessage: '멤버 프로필 공개 동의',
  },
  {
    title: '✋ 잠깐! 멤버 프로필을 다 채우셨나요?',
    description:
      '멤버프로필에 있는 정보가 소울메이트에게 힌트로 제공되어요.\n원활한 참여를 위해 멤버프로필의 모든 항목을 채워주세요.',
    agreeMessage: '빠짐없이 채웠어요!',
  },
];

const Register: FC<RegisterProps> = ({}) => {
  const [checked, setChecked] = useState(requiresData.map(() => false));
  const allChecked = checked.every((v) => v);

  function check(idx: number, value: boolean) {
    setChecked((checked) => {
      const newValue = [...checked];
      newValue[idx] = value;
      return newValue;
    });
  }

  return (
    <Container>
      <TitleArea>
        <span>
          <StyledSoulmateIcon />
        </span>
        나의 소울메이트 찾기
      </TitleArea>
      <Card>
        {requiresData.map((data, idx) => (
          <div key={idx}>
            <Subtitle>{data.title}</Subtitle>
            <Description>{data.description}</Description>
            <AgreeArea>
              <Checkbox id={`agree-${idx}`} onChange={(v) => check(idx, v.target.checked)} checked={checked[idx]} />
              <label htmlFor={`agree-${idx}`}>{data.agreeMessage}</label>
            </AgreeArea>
          </div>
        ))}
      </Card>
      <ApplyButton disabled={!allChecked}>소울메이트 신청하기</ApplyButton>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleArea = styled.h1`
  display: flex;
  align-items: center;

  ${textStyles.SUIT_40_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_20_B};

    line-height: 100%;
  }
`;

const StyledSoulmateIcon = styled(SoulmateIcon)`
  margin-right: 10px;
  width: 55px;
  height: 55px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 40px;
    height: 40px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-top: 50px;
  border-radius: 30px;
  background-color: ${colors.black80};
  padding: 48px 39px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 30px;
    margin-top: 16px;
    border-radius: 12px;
    padding: 20px;
  }
`;

const Subtitle = styled.h2`
  line-height: 100%;
  letter-spacing: -0.24px;

  ${textStyles.SUIT_24_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_B};
  }
`;

const Description = styled.p`
  margin-top: 20px;
  white-space: pre-wrap;

  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 10px;
    white-space: normal;

    ${textStyles.SUIT_14_M};
  }
`;

const AgreeArea = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 40px;
  color: ${colors.gray40};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 20px;

    ${textStyles.SUIT_14_M};
  }
`;

const ApplyButton = styled.button`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  transition: background-color 0.3s;
  margin-top: 60px;
  border-radius: 6px;
  background: ${colors.purple100};
  cursor: pointer;
  padding: 14px 20px;

  ${textStyles.SUIT_16_SB};

  ${(props) =>
    props.disabled &&
    css`
      background: ${colors.black60};
      cursor: default;
      color: ${colors.gray80};
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    align-self: stretch;
    margin-top: 40px;
    border-radius: 10px;
    padding: 18px 20px;

    ${textStyles.SUIT_16_SB};
  }
`;
