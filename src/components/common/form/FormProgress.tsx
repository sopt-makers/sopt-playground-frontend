import styled from '@emotion/styled';
import * as Progress from '@radix-ui/react-progress';
import { colors } from '@sopt-makers/colors';
import { FC, useMemo } from 'react';

import FormTitle from '@/components/common/form/FormTitle';
import Text from '@/components/common/Text';
import IconDoneCheck from '@/public/icons/icon-done-check.svg';
import { textStyles } from '@/styles/typography';

interface FormProgressProps {
  className?: string;

  title: string;
  progressLabel: string;

  items: FormProgressItem[];
}

export type FormProgressItem = {
  title: string;
  required?: boolean;
  active?: boolean;
};

const FormProgress: FC<FormProgressProps> = ({ className, title, progressLabel, items }) => {
  const activeItems = useMemo(() => items.filter((item) => item.active), [items]);
  const progressPercentage = Math.round((activeItems.length / items.length) * 100);

  return (
    <StyledFormProgress className={className}>
      <StyledHeader>
        <FormTitle typography='SUIT_24_SB'>{title}</FormTitle>
        <ProgressNumber>
          <Text typography='SUIT_12_M' color={colors.success}>
            {`${activeItems.length}/${items.length}`}
          </Text>
        </ProgressNumber>
      </StyledHeader>
      <Divider />
      <Text typography='SUIT_16_M' color={colors.gray100}>
        {progressLabel}
      </Text>
      <StyledProgressRoot value={progressPercentage}>
        <StyledProgressIndicator style={{ transform: `translateX(-${100 - progressPercentage}%)` }} />
      </StyledProgressRoot>
      <StatusList>
        {items.map(({ title, required, active }) => (
          <ListItem key={title} isDirty={active}>
            <ListItemLeft>
              {title}
              {required && <span className='text-required'>*</span>}
            </ListItemLeft>
            {active && (
              <Checked>
                <IconDoneCheck />
              </Checked>
            )}
          </ListItem>
        ))}
      </StatusList>
    </StyledFormProgress>
  );
};

export default FormProgress;

const StyledFormProgress = styled.div`
  border-radius: 12px;
  background-color: ${colors.black80};
  padding: 47px 40px;
  width: 278px;
  height: fit-content;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
`;

const ProgressNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.black60};
  width: 50px;
  height: 24px;
`;

const StyledProgressRoot = styled(Progress.Root)`
  position: relative;
  transform: translateZ(0);
  margin: 17px 0 0;
  border-radius: 100px;
  background-color: ${colors.gray100};
  width: 100%;
  height: 6px;
  overflow: hidden;
`;

const StyledProgressIndicator = styled(Progress.Indicator)`
  transition: transform 0.3s;
  background-color: ${colors.success};
  width: 100%;
  height: 100%;
`;

const StatusList = styled.ul`
  margin: 29px 0 0;
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 11px 0;
  list-style: none;
`;

const ListItem = styled.li<{ isDirty?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.2s;
  padding: 14px 20px;
  color: ${({ isDirty }) => (isDirty ? colors.gray10 : colors.gray100)};
  ${textStyles.SUIT_16_M};
`;

const ListItemLeft = styled.span`
  & .text-required {
    align-self: flex-start;
    margin: 0 0 0 2px;
  }
`;

const Checked = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.success};
  width: 14px;
  height: 14px;
`;

const Divider = styled.hr`
  margin: 36px 0 28px;
  border: none;
  background-color: ${colors.black60};
  width: 100%;
  height: 1.5px;
`;
