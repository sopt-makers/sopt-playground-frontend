import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEvent, FC } from 'react';

import ErrorMessage from '@/components/common/Input/ErrorMessage';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const serviceType = {
  WEB: 'WEB',
  APP: 'APP',
} as const;

interface ServiceTypeFieldProps {
  className?: string;
  value: string[];
  onChange: (value: string[]) => void;
  errorMessage?: string;
}

const ServiceTypeField: FC<ServiceTypeFieldProps> = ({ className, value, onChange, errorMessage }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const serviceType = e.target.value;
    if (e.target.checked) {
      const newValue = [...value, serviceType];
      onChange(newValue);
    } else {
      const newValue = value.filter((value) => value !== serviceType);
      onChange(newValue);
    }
  };

  return (
    <>
      <StyledServiceTypeField className={className}>
        <StyledLabel checked={value.includes(serviceType.WEB)}>
          <input type='checkbox' value={serviceType.WEB} onChange={handleChange} />
          <span>웹</span>
        </StyledLabel>
        <StyledLabel checked={value.includes(serviceType.APP)}>
          <input type='checkbox' value={serviceType.APP} onChange={handleChange} />
          <span>앱</span>
        </StyledLabel>
      </StyledServiceTypeField>
      <StyledErrorMessage message={errorMessage} />
    </>
  );
};

export default ServiceTypeField;

const StyledServiceTypeField = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const StyledLabel = styled.label<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, color 0.2s;
  border-radius: 100px;
  background-color: ${colors.black60};
  cursor: pointer;
  padding: 14px 0;
  width: 163px;
  height: 42px;
  color: ${colors.gray100};

  ${({ checked }) =>
    checked &&
    css`
      background-color: ${colors.purple100};
      color: ${colors.white};
    `}
  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 158px;
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin: 10px 0;
`;
