// @ts-nocheck
// MEMO: headless-ui와 emotion jsx의 충돌때문인지 ts 에러가 발생하여 주석 처리
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Combobox } from '@headlessui/react';
import React, { FC } from 'react';

import { Member } from '@/api/members/type';
import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberSearchProps {
  value?: Member;
  onChange: (value: Member) => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  members: Member[];
  error?: boolean;
}

const MemberSearch: FC<MemberSearchProps> = ({ value, onChange, onSearch, members, name, error }) => {
  const onClear = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    onChange(undefined);
  };

  return (
    <StyledContainer error={error}>
      <Combobox value={value} onChange={onChange}>
        <Combobox.Input
          name={name}
          className='search'
          onChange={onSearch}
          placeholder={!value ? 'SOPT 멤버 검색' : ''}
          readOnly={!!value}
        />
        {value && (
          <Combobox.Label className='label'>
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '6px' }}>
              <ProfileImage
                style={{ width: '24px', height: '24px' }}
                src={
                  value.profileImage == null || value.profileImage === ''
                    ? '/icons/icon-member-search-default.svg'
                    : value.profileImage
                }
                alt='멤버의 프로필 이미지'
              />
              <Text>{value.name}</Text>
            </div>
            <ClearIcon
              className='.icon-clear'
              onClick={onClear}
              src='/icons/icon-member-search-clear.svg'
              alt='검색된 멤버 제거 아이콘'
            />
          </Combobox.Label>
        )}
        {members.length > 0 && (
          <Combobox.Options className='options'>
            {members.map((member) => (
              <Combobox.Option className='option' key={member.id} value={member}>
                <MemberInfo>
                  <ProfileImage
                    src={member.profileImage ?? '/icons/icon-member-search-default.svg'}
                    alt='멤버의 프로필 이미지'
                  />
                  <Text>{member.name}</Text>
                </MemberInfo>
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

const StyledContainer = styled.div<{ error?: booelan; isSelected: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;

  ${textStyles.SUIT_14_M};

  & > .label {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: space-between;
    column-gap: 6px;
    z-index: 1;
    padding: 12px 20px;
    width: 100%;
    ${textStyles.SUIT_16_SB};
    ${colors.gray10};

    &:hover {
      img {
        opacity: 1;
      }
    }
  }

  & .search {
    transition: all 0.2s;
    border: 1px solid ${colors.black60};
    border-radius: 6px;
    background: ${colors.black60};
    padding: 14px 20px;
    color: ${colors.gray100};

    &:focus {
      outline: none;
      border-color: ${colors.purple100};
      background-color: ${colors.black80};
    }

    ${({ error }) =>
      error &&
      css`
        border-color: ${colors.red100};

        &:focus {
          border-color: ${colors.red100};
        }
      `}
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
    padding: 10px 16px;
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

const ProfileImage = styled.img`
  border-radius: 100%;
  width: 20px;
  height: 20px;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const ClearIcon = styled.img`
  transition: opacity 0.1s linear;
  opacity: 0;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;
