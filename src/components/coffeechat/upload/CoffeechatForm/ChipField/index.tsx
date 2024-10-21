import styled from '@emotion/styled';
import { Chip } from '@sopt-makers/ui';

import FormItem from '@/components/common/form/FormItem';
import Responsive from '@/components/common/Responsive';

interface ChipFieldProps {
  errorMessage: string;
  chipList: readonly string[];
  activeChipList: string[];
}

export default function ChipField({ errorMessage, chipList, activeChipList }: ChipFieldProps) {
  return (
    <FormItem errorMessage={errorMessage}>
      <CareerChips>
        {chipList.map((chip) => {
          return (
            <div key={chip}>
              <Responsive only='desktop'>
                <Chip size='sm' active={activeChipList.includes(chip)}>
                  {chip}
                </Chip>
              </Responsive>
              <Responsive only='mobile'>
                <Chip size='md' active={activeChipList.includes(chip)}>
                  {chip}
                </Chip>
              </Responsive>
            </div>
          );
        })}
      </CareerChips>
    </FormItem>
  );
}

const CareerChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
