import styled from '@emotion/styled';
import { forwardRef, ReactElement, SelectHTMLAttributes } from 'react';
import IconExpandLess from 'public/icons/icon-expand-less.svg';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: ReactElement;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ icon, children, ...props }, ref) => {
  return (
    <Container>
      <StyledSelect ref={ref} {...props}>
        {children}
      </StyledSelect>
      <SelectIcon>{icon ?? <IconExpandLess />}</SelectIcon>
    </Container>
  );
});

export default Select;

const Container = styled.div`
  position: relative;
  width: 200px;
`;

const StyledSelect = styled.select`
  appearance: none;
  border-radius: 6px;
  padding: 20px;
  width: 100%;
`;

const SelectIcon = styled(IconExpandLess)`
  position: absolute;
  top: 22px;
  right: 16px;
`;
