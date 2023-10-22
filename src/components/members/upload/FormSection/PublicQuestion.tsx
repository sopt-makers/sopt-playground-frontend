import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useFormContext } from 'react-hook-form';

import Switch from '@/components/common/Switch';
import { MemberUploadForm } from '@/components/members/upload/types';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function MemberPublicQuestionFormSection() {
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);
  const { register } = useFormContext<MemberUploadForm>();

  return (
    <StyledSection>
      <div className='question'>{`공식 홈페이지에도 프로필을 \n공개하시겠어요?`}</div>
      <Switch {...register('allowOfficial')} size={isMobile ? mobileSwitchSize : switchSize} className='switch' />
      <div className='info description'>{`공식 홈페이지는 '이름', '프로필 사진', \n'나를 한 마디로 표현한다면?' 정보만 보여져요.`}</div>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: auto 40px;
  border-radius: 30px;
  background-color: ${colors.gray800};
  padding: 40px;
  width: 790px;

  .question {
    color: ${colors.gray10};

    ${textStyles.SUIT_24_B};

    @media ${MOBILE_MEDIA_QUERY} {
      line-height: 140%;
      white-space: pre-line;
      font-size: 18px;
      font-weight: 700;
    }
  }

  .description {
    grid-column: 1 / span 2;

    ${textStyles.SUIT_16_M};

    @media ${MOBILE_MEDIA_QUERY} {
      font-size: 14px;
      font-weight: 500;
    }
  }

  .info {
    margin-top: 20px;
    color: ${colors.gray400};

    @media ${MOBILE_MEDIA_QUERY} {
      margin-top: 12px;
      white-space: pre-line;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 28px 18px;
    width: 100%;

    .switch {
      margin-top: 15px;
    }
  }
`;

const switchSize = { labelWidth: '40px', labelHeight: '24px', sliderWidth: '21.54px', sliderHeight: '21px' };
const mobileSwitchSize = { labelWidth: '34px', labelHeight: '20px', sliderWidth: '18.31px', sliderHeight: '17.5px' };
