import styled from '@emotion/styled';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { colors } from '@sopt-makers/colors';
import { ReactNode } from 'react';

import { PART_OPTIONS } from '@/components/members/main/AskOBMemberList';
interface PartDropdownProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: ReactNode;
  setSelectedPart: (part: string) => void;
}

const PartDropdown = ({ open, setOpen, trigger, setSelectedPart }: PartDropdownProps) => {
  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={10} align='end' side='bottom' asChild>
          <ContentWrapper>
            {PART_OPTIONS.map((option) => (
              <DropdownMenu.Item key={option.value} onClick={() => setSelectedPart(option.value)}>
                {option.label}
              </DropdownMenu.Item>
            ))}
          </ContentWrapper>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default PartDropdown;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  border-radius: 12px;
  background-color: ${colors.gray700};
  padding: 8px;
  min-width: 120px;

  & > * {
    border-radius: 8px;
    cursor: pointer;
    padding: 8px 12px;

    &:hover {
      background-color: ${colors.gray600};
    }
  }
`;
