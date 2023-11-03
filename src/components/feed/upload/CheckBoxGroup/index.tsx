import styled from '@emotion/styled';

import Checkbox from '@/components/common/Checkbox';
import { textStyles } from '@/styles/typography';

interface CheckBoxGroupProps {
  checkBoxGroup: { label: string; checked: boolean; onChange?: () => void }[];
}

export default function CheckBoxGroup({ checkBoxGroup }: CheckBoxGroupProps) {
  return (
    <Container>
      {checkBoxGroup.map(({ label, checked, onChange }) => {
        return (
          <CheckboxItem key={label}>
            <StyledCheckbox checked={checked} onChange={onChange} />
            <Label>{label}</Label>
          </CheckboxItem>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 16px;
`;

const CheckboxItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Label = styled.label`
  ${textStyles.SUIT_14_M}
`;

const StyledCheckbox = styled(Checkbox)`
  width: 20px;
  height: 20px;
`;
