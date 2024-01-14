import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ChangeEvent, FC } from 'react';

import ErrorMessage from '@/components/common/Input/ErrorMessage';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export const serviceType = {
  WEB: 'WEB',
  APP: 'APP',
} as const;

type ServiceType = keyof typeof serviceType;

interface ServiceTypeFieldProps {
  className?: string;
  value: string[];
  onChange: (value: string[]) => void;
  errorMessage?: string;
}

const ServiceTypeField: FC<ServiceTypeFieldProps> = ({ className, value, onChange, errorMessage }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const serviceType = e.target.value as ServiceType;
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
  column-gap: 10px;
  align-items: center;
`;

const StyledLabel = styled.label<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, color 0.2s;
  border-radius: 100px;
  background-color: ${colors.gray700};
  cursor: pointer;
  padding: 14px 0;
  width: 163px;
  height: 42px;
  color: ${colors.gray400};

  ${({ checked }) =>
    checked &&
    css`
      background-color: ${colors.gray10};
      color: ${colors.gray950};
    `}
  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 158px;
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin: 10px 0;
`;
