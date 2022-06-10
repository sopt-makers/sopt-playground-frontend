import styled from '@emotion/styled';
import Text from '@/components/common/Text';
import { FormItem } from 'components/project/upload/constants';
import FormTitle from 'components/project/upload/FormTitle';
import { FC } from 'react';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import IconDoneCheck from 'public/icons/icon-done-check.svg';

interface FormStatusProps {
  formItems: FormItem[];
}

const FormStatus: FC<FormStatusProps> = ({ formItems }) => {
  const totalItemNums = formItems.length;
  const dirtyFieldNums = formItems.filter(({ isDirty }) => isDirty).length;
  const progress = dirtyFieldNums / totalItemNums;

  return (
    <StyledContainer>
      <StyledContent>
        <FormTitle typography='SUIT_24_SB'>등록 진행</FormTitle>
        <ProgressNumber>
          <Text typography='SUIT_12_M' color={colors.purple100}>
            {`${dirtyFieldNums}/${totalItemNums}`}
          </Text>
        </ProgressNumber>
      </StyledContent>
      <Divider />
      <Text typography='SUIT_16_M' color={colors.gray100}>
        프로젝트를 등록해주세요
      </Text>
      <StyledProgess value={Number.isNaN(progress) ? 0 : progress} max={1} />
      <StatusList>
        {formItems.map(({ value, label, isDirty, isRequired }) => (
          <StatusListItem key={value} isDirty={isDirty}>
            <ListItemLeft>
              {label}
              {isRequired && <span className='text-required'>*</span>}
            </ListItemLeft>
            {isDirty && (
              <Checked>
                <IconDoneCheck />
              </Checked>
            )}
          </StatusListItem>
        ))}
      </StatusList>
    </StyledContainer>
  );
};

export default FormStatus;

const StyledContainer = styled.div`
  border-radius: 12px;
  background-color: ${colors.black80};
  padding: 47px 40px;
  width: 278px;
  height: fit-content;
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const StyledProgess = styled.progress`
  appearance: none;
  margin: 17px 0 0;
  width: 100%;
  height: 6px;

  &::-webkit-progress-bar {
    border-radius: 100px;
    background-color: ${colors.gray100};
  }

  &::-webkit-progress-value {
    border-radius: 100px;
    background-color: ${colors.purple100};
  }
`;

const StatusList = styled.ul`
  margin: 29px 0 0;
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 11px 0;
  list-style: none;
`;

const StatusListItem = styled.li<{ isDirty?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.2s;
  padding: 14px 20px;
  color: ${({ isDirty }) => (isDirty ? colors.white : colors.gray100)};
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
  background-color: ${colors.purple100};
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
