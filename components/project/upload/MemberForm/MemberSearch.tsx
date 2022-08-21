import { User } from '@/api/user/types';
import { InputProps } from '@/components/common/Input';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Combobox } from '@headlessui/react';
import { textStyles } from '@/styles/typography';
import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MemberSearchProps {
  value?: User;
  onChange: (value: User) => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  members: User[];
}

const MemberSearch: FC<MemberSearchProps> = ({ value, onChange, onSearch, members, name }) => {
  return (
    <StyledContainer>
      <Combobox value={value} onChange={onChange}>
        <Combobox.Input
          name={name}
          className='search'
          displayValue={(member: User) => member?.name}
          onChange={onSearch}
          placeholder='SOPT 멤버 검색'
        />
        {members.length > 0 && (
          <Combobox.Options className='options'>
            {members.map((member) => (
              <Combobox.Option className='option' key={member.auth_user_id} value={member}>
                <Text>{member.name}</Text>
                <Text>{`${member.generation}기`}</Text>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>
    </StyledContainer>
  );
};

export default MemberSearch;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${textStyles.SUIT_14_M};

  & .search {
    border-radius: 6px;
    background: ${colors.black60};
    padding: 15.5px 20px;
    color: ${colors.gray100};
  }

  & .options {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 6px;
    background: ${colors.black60};
    padding: 8px 0;
  }

  & .option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${colors.black60};
    cursor: pointer;
    padding: 10px 20px;
    color: ${colors.gray100};

    &:hover {
      background-color: ${colors.black40};
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    position: relative;
    z-index: 1;
    width: 135px;

    & .search {
      border: 1px solid ${colors.black40};
    }

    & .options {
      position: absolute;
      top: 49px;
      border: 1px solid ${colors.black40};
    }

    & .option {
      width: 135px;
    }
  }
`;
