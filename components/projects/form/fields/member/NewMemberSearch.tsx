import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Command } from 'cmdk';
import React, { FC } from 'react';

import Text from '@/components/common/Text';
import { useMemberSearch } from '@/components/projects/form/fields/member/MemberSearchContext';
import IconClear from '@/public/icons/icon-member-search-clear.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const getProfileImage = (profileImage: string) => {
  if (profileImage == null || profileImage === '') {
    return '/icons/icon-member-search-default.svg';
  }
  return profileImage;
};

type SelectedMemberData = { memberId: number; memberRole: string; memberDescription: string };

interface NewMemberSearchProps {
  isError?: boolean;
  value: SelectedMemberData;
  onChange: (selectedData: SelectedMemberData) => void;
}

const NewMemberSearch: FC<NewMemberSearchProps> = ({ isError }) => {
  const { name, onValueChange, searchedMemberList } = useMemberSearch();

  return (
    <StyledSearch shouldFilter={false}>
      <StyledInput isError={isError} value={name} onValueChange={onValueChange} />
      {searchedMemberList && searchedMemberList.length > 0 && (
        <StyledList>
          {searchedMemberList?.map((member) => (
            <StyledItem key={member.id}>
              <MemberInfo>
                <ProfileImage src={getProfileImage(member.profileImage)} alt='멤버의 프로필 이미지' />
                <Text>{member.name}</Text>
              </MemberInfo>
              <Text>{`${member.generation}기`}</Text>
            </StyledItem>
          ))}
        </StyledList>
      )}
    </StyledSearch>
  );
};

export default NewMemberSearch;

const StyledSearch = styled(Command)`
  position: relative;
  ${textStyles.SUIT_14_M};
  @media ${MOBILE_MEDIA_QUERY} {
    z-index: 1;
    max-width: 135px;
  }
`;

const StyledInput = styled(Command.Input)<{ isError?: boolean }>`
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

  ${({ isError }) =>
    isError &&
    css`
      border-color: ${colors.red100};
      /* stylelint-disable-next-line no-duplicate-selectors */
      &:focus {
        border-color: ${colors.red100};
      }
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    border: 1px solid ${colors.black40};
  }
`;

const StyledLabel = styled.label`
  display: flex;
  position: absolute;
  top: 0;
  align-items: center;
  justify-content: space-between;
  column-gap: 6px;
  z-index: 1;
  padding: 12px 20px;
  width: 100%;
  ${textStyles.SUIT_16_SB};
  ${colors.gray10};

  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const StyledIconClear = styled(IconClear)`
  transition: opacity 0.1s linear;
  opacity: 0;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
`;

const StyledList = styled(Command.List)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 6px;
  background: ${colors.black60};
  padding: 8px 0;

  @media ${MOBILE_MEDIA_QUERY} {
    position: absolute;
    top: 49px;
    border: 1px solid ${colors.black40};
  }
`;

const StyledItem = styled(Command.Item)`
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

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 135px;
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
