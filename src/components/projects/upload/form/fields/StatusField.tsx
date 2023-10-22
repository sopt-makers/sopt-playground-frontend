import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ChangeEvent, FC } from 'react';

import Switch from '@/components/common/Switch';
import Text from '@/components/common/Text';
import { textStyles } from '@/styles/typography';

type Status = {
  isAvailable: boolean;
  isFounding: boolean;
};

interface StatusFieldProps {
  className?: string;
  value: Status;
  onChange: (value: Status) => void;
}

const StatusField: FC<StatusFieldProps> = ({ className, value, onChange }) => {
  const handleChange = (name: keyof Status) => (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      [name]: e.target.checked,
    });
  };

  return (
    <StyledStatusField className={className}>
      <StyledWrapper>
        <StyledSubTitle>현재 이 서비스를 이용할 수 있나요?</StyledSubTitle>
        <Switch checked={value.isAvailable} onChange={handleChange('isAvailable')} />
      </StyledWrapper>
      <StyledWrapper>
        <StyledSubTitle>현재 이 프로젝트로 창업을 진행하고 있나요?</StyledSubTitle>
        <Switch checked={value.isFounding} onChange={handleChange('isFounding')} />
      </StyledWrapper>
    </StyledStatusField>
  );
};

export default StatusField;

const StyledStatusField = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
`;

const StyledSubTitle = styled(Text)`
  color: ${colors.gray500};
  ${textStyles.SUIT_14_M};
`;

const StyledWrapper = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
`;
