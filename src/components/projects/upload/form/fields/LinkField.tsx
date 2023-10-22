import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { isEmpty } from 'lodash-es';
import React, { FC, useMemo, useState } from 'react';

import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/Input/ErrorMessage';
import Select from '@/components/common/Select';
import useToast from '@/components/common/Toast/useToast';
import { linkTitles, LinkType } from '@/components/projects/upload/form/constants';
import IconTrash from '@/public/icons/icon-trash.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const HTTPS_PREFIX = 'https://';

type ErrorMessage = Partial<Record<keyof LinkType, string>>;

interface LinkFieldProps {
  className?: string;
  value: LinkType;
  onChange: (value: LinkType) => void;
  onRemove: () => void;
  errorMessage?: ErrorMessage;
}

const LinkField: FC<LinkFieldProps> = ({ className, value, onChange, onRemove, errorMessage }) => {
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const isError = useMemo(() => !isEmpty(errorMessage), [errorMessage]);
  const toast = useToast();

  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const linkUrl = e.target.value;
    if (linkUrl && !/^https?:\/\//i.test(linkUrl)) {
      onChange({
        ...value,
        linkUrl: `${HTTPS_PREFIX}${linkUrl}`,
      });
    }
  };

  const onSelectLinkTitle = (linkTitle: string) => {
    onChange({
      ...value,
      linkTitle,
    });
  };

  const onChangeLinkUrl = (linkUrl: string) => {
    onChange({
      ...value,
      linkUrl,
    });
  };

  const onEdit = () => {
    setIsEdit(true);
  };

  const onEditComplete = () => {
    if (isError) {
      toast.show({
        title: '알림',
        message: '링크 필드를 모두 채워주세요.',
      });
      return;
    }
    setIsEdit(false);
  };

  return (
    <StyledLinkField className={className}>
      {isEdit ? (
        <StyledLinkEditView isError={isError}>
          <StyledFormWrapper>
            <StyledSelect
              value={value.linkTitle}
              onChange={(e) => onSelectLinkTitle(e.target.value)}
              error={!!errorMessage?.linkTitle}
            >
              {linkTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </StyledSelect>
            {errorMessage?.linkUrl && <ErrorMessage message={errorMessage.linkTitle} />}
          </StyledFormWrapper>
          <StyledInput
            placeholder={HTTPS_PREFIX}
            value={value.linkUrl}
            onChange={(e) => onChangeLinkUrl(e.target.value)}
            onBlur={onBlur}
            error={!!errorMessage?.linkUrl}
            errorMessage={errorMessage?.linkUrl}
          />
          <StyledEditCompleteButton
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onEditComplete();
            }}
          >
            완료
          </StyledEditCompleteButton>
          <IconDeleteWrapper>
            <IconTrash onClick={onRemove} />
          </IconDeleteWrapper>
        </StyledLinkEditView>
      ) : (
        <StyledLinkView onClick={onEdit}>
          <span className='title'>{value.linkTitle}</span>
          <span className='url'>{value.linkUrl}</span>
        </StyledLinkView>
      )}
    </StyledLinkField>
  );
};

export default LinkField;

const StyledLinkField = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
  width: 100%;
`;

const StyledLinkEditView = styled.div<{ isError?: boolean }>`
  display: flex;
  column-gap: 10px;
  align-items: ${({ isError }) => (isError ? 'flex-start' : 'center')};
  border-radius: 6px;
  background-color: ${colors.gray700};
  padding: 10px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    display: grid;
    grid-template-areas: 'title url';
    grid-template-columns: 135px 1fr;
    grid-row-gap: 10px;
    padding: 12px;
  }
`;

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const StyledLinkView = styled.div`
  display: flex;
  gap: 42px;
  border-radius: 6px;
  background-color: ${colors.gray700};
  cursor: pointer;
  padding: 14px 30px;
  width: 100%;
  min-height: 42px;
  white-space: nowrap;
  color: ${colors.gray500};

  ${textStyles.SUIT_14_M};

  & > .title {
    flex-basis: 105px;
  }

  & > .url {
    flex-basis: 126px;
  }
`;

const StyledSelect = styled(Select)`
  border: 1px solid ${colors.gray600};
  border-radius: 6px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-area: title;
    max-width: 135px;
  }
`;

const StyledInput = styled(Input)`
  flex: 1 1 330px;
  border-radius: 6px;

  & > input {
    border: 1px solid ${colors.gray600};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    grid-area: url;
  }
`;

const StyledEditCompleteButton = styled.button`
  border-radius: 4px;
  background-color: ${colors.gray600};
  padding: 16px 36px;
  white-space: nowrap;
  color: ${colors.gray500};

  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    align-self: center;
    justify-self: end;
    order: 2;
    padding: 6.5px 30px;
  }
`;

const IconDeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 42px;
  min-height: 42px;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-self: start;
    order: 1;
  }
`;
