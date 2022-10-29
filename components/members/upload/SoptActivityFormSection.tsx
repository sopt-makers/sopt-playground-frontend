import styled from '@emotion/styled';

import Select from '@/components/common/Select';
import AddableInputWrapper from '@/components/members/upload/forms/AddableInputWrapper';
import FormHeader from '@/components/members/upload/forms/FormHeader';
import { MemberFormSection as FormSection } from '@/components/members/upload/forms/FormSection';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function MemberSoptActivityInfo() {
  return (
    <FormSection>
      <FormHeader title='SOPT 활동 정보' />
      <AddableInputWrapper pcWidth='628px'>
        <StyledSelectWrapper>
          <StyledSelect placeholder='활동기수' />
          <StyledSelect placeholder='파트' />
          <StyledSelect placeholder='운팀/미팀' className='team' />
        </StyledSelectWrapper>
      </AddableInputWrapper>
    </FormSection>
  );
}

const StyledSelectWrapper = styled.div`
  display: flex;
  position: relative;
  gap: 12px;
  align-items: center;
  margin-top: 46px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    column-gap: 9px;
    margin-top: 30px;
    width: 100%;
    height: 107px;
    row-gap: 11px;

    .team {
      grid-column: span 2;
    }
  }
`;

const StyledSelect = styled(Select)`
  border-width: 1.5px;
  border-radius: 14px;
  color: ${colors.gray80};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 12px;
    background-color: ${colors.black80};
    width: 100%;
  }
`;
