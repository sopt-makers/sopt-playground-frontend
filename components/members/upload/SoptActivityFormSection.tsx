import styled from '@emotion/styled';

import Select from '@/components/common/Select';
import FormHeader from '@/components/members/upload/forms/FormHeader';
import { MemberFormSection as FormSection } from '@/components/members/upload/forms/FormSection';
import IconDelete from '@/public/icons/icon-delete.svg';
import IconPlus from '@/public/icons/icon-plus.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function MemberSoptActivityInfo() {
  return (
    <FormSection>
      <FormHeader title='SOPT 활동 정보' />
      <StyledSelectWrapper>
        <StyledSelect placeholder='활동기수' />
        <StyledSelect placeholder='파트' />
        <StyledSelect placeholder='운팀/미팀' className='team' />
        <StyledDeleteButton className='pc-only' />
        <MobileDeleteButton className='mobile-only'>삭제</MobileDeleteButton>
      </StyledSelectWrapper>
      <StyledAddButton className='pc-only'>
        <IconPlus stroke={colors.purple100} />
        <div>추가</div>
      </StyledAddButton>
      <MobileAddButton className='mobile-only'>
        <IconPlus stroke={colors.gray20} />
        <div>추가</div>
      </MobileAddButton>
    </FormSection>
  );
}

const StyledSelectWrapper = styled.div`
  display: flex;
  position: relative;
  gap: 12px;
  align-items: center;
  margin-top: 46px;
  width: 628px;

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

const StyledDeleteButton = styled(IconDelete)`
  position: absolute;
  top: 50%;
  right: -50px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const StyledAddButton = styled.button`
  display: flex;
  gap: 11px;
  align-items: center;
  margin-top: 23px;
  color: ${colors.purple100};

  ${textStyles.SUIT_16_SB}
`;

const MobileDeleteButton = styled.button`
  position: absolute;
  right: 4px;
  bottom: -35px;
  color: ${colors.gray60};
  font-size: 15px;
  font-weight: 600;
`;

const MobileAddButton = styled.button`
  display: flex !important;
  gap: 11px;
  align-items: center;
  justify-content: center;
  margin-top: 55px;
  border: 1px solid ${colors.black40};
  border-radius: 12px;
  padding: 16px 0;
  width: 100%;
  color: ${colors.gray20};
`;
