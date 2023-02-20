import styled from '@emotion/styled';
import { FC } from 'react';

import Checkbox from '@/components/common/Checkbox';
import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/Input/ErrorMessage';
import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface PeriodFieldProps {
  value: Value;
  onChange: (v: Value) => void;
  errorMessage?: string;
  isStartError: boolean;
  isEndError: boolean;
}

type Value = { startAt: string; endAt: string | null };

const PeriodField: FC<PeriodFieldProps> = ({ value, onChange, errorMessage, isStartError, isEndError }) => {
  const handleChange =
    <K extends keyof Value>(key: K) =>
    (e: { target: { value: string } }) => {
      onChange({ ...value, [key]: e.target.value });
    };

  const handleOngoingChange = (newValue: boolean) => {
    if (newValue) {
      onChange({ ...value, endAt: null });
    } else {
      onChange({ ...value, endAt: '' });
    }
  };

  return (
    <StyledPeriodField>
      <InputGroup>
        <StyledInput
          placeholder='YYYY.MM'
          value={value.startAt}
          onChange={handleChange('startAt')}
          error={isStartError}
        />
        {value.endAt !== null && (
          <>
            <Separator>{'-'}</Separator>
            <StyledInput
              placeholder='YYYY.MM'
              value={value.endAt}
              onChange={handleChange('endAt')}
              error={isEndError}
            />
          </>
        )}
      </InputGroup>
      <CheckboxContainer>
        <Checkbox checked={value.endAt === null} onChange={(e) => handleOngoingChange(e.target.checked)} />
        <Text typography='SUIT_12_M' color={colors.gray100}>
          진행중
        </Text>
      </CheckboxContainer>
      <StyledErrorMessage message={errorMessage} />
    </StyledPeriodField>
  );
};

export default PeriodField;

const StyledPeriodField = styled.div``;

const StyledInput = styled(Input)`
  max-width: 163px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Separator = styled.span`
  margin: 0 11px;
  color: ${colors.gray100};
  ${textStyles.SUIT_16_M};
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 13px 0 0;

  & > span {
    margin: 0 0 0 9.25px;
  }
`;
