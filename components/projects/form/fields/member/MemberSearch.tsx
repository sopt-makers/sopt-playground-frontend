import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Command } from 'cmdk';
import { FC } from 'react';

import Text from '@/components/common/Text';
import { Member, useMemberSearch } from '@/components/projects/form/fields/member/MemberSearchContext';
import IconClear from '@/public/icons/icon-member-search-clear.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const getProfileImage = (profileImage: Member['profileImage']) => {
  if (profileImage === null || profileImage === '') {
    return '/icons/icon-member-search-default.svg';
  }
  return profileImage;
};

interface MemberSearchProps {
  className?: string;
  isError?: boolean;
  placeholder?: string;
  selectedMember?: Member;
  onSelect: (member: Member) => void;
  onClear: () => void;
}

const MemberSearch: FC<MemberSearchProps> = ({
  className,
  placeholder,
  selectedMember: selectedMemberProp,
  isError,
  onSelect,
  onClear,
}) => {
  const { name, onValueChange, onValueClear, searchedMemberList, defaultValue } = useMemberSearch();
  const selectedMember = selectedMemberProp || defaultValue;

  const handleSelect = (member: Member) => {
    onSelect(member);
    onValueClear();
  };

  const handleClear = () => {
    onClear();
    onValueClear();
  };

  return (
    <StyledSearch className={className} shouldFilter={false}>
      <StyledInput
        placeholder={!selectedMember ? placeholder : ''}
        isError={isError}
        value={name}
        onValueChange={onValueChange}
      />
      {selectedMember && (
        <StyledLabel>
          <ProfileImageWrapper>
            <ProfileImage width={24} height={24} src={getProfileImage(selectedMember.profileImage)} />
            <Text>{selectedMember.name}</Text>
          </ProfileImageWrapper>
          <StyledIconClear onClick={handleClear} alt='검색된 멤버 제거 아이콘' />
        </StyledLabel>
      )}
      {searchedMemberList && searchedMemberList.length > 0 && (
        <StyledList>
          {searchedMemberList.map((member) => (
            <StyledItem
              key={member.id}
              value={String(member.id)}
              onSelect={() => {
                handleSelect(member);
              }}
            >
              <MemberInfo>
                <ProfileImage src={getProfileImage(member.profileImage)} alt={`${member.name}-profileImage`} />
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

export default MemberSearch;

const StyledSearch = styled(Command)`
  position: relative;
  border-radius: 6px;

  ${textStyles.SUIT_14_M};

  & input {
    width: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 135px;
  }
`;

const StyledInput = styled(Command.Input)<{ isError?: boolean }>`
  transition: all 0.2s;
  border: 1px solid ${colors.black40};
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
`;

const StyledLabel = styled.label`
  display: flex;
  position: absolute;
  top: 0;
  column-gap: 6px;
  align-items: center;
  justify-content: space-between;
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
  column-gap: 6px;
  align-items: center;
`;

const StyledList = styled(Command.List)`
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: 8px;
  border-radius: 6px;
  background: ${colors.black60};
  padding: 8px 0;
  width: 100%;

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
