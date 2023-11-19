import styled from '@emotion/styled';

import Responsive from '@/components/common/Responsive';
import SquareLink from '@/components/common/SquareLink';
import { categories } from '@/components/feed/upload/Category/constants';
import { BasicCategory } from '@/components/feed/upload/Category/types';
import { UploadFeedDataType } from '@/components/feed/upload/types';
import CheckIcon from '@/public/icons/icon_check.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface TagSelectOptionsProp {
  onClose: () => void;
  onSave: (categoryId: number) => void;
  feedData: UploadFeedDataType;
}

export default function TagSelectOptions({ onClose, onSave, feedData }: TagSelectOptionsProp) {
  const handleSelectTagDesktop = (id: number) => {
    onSave(id);
    onClose();
  };

  const handleSelectTagMobile = (id: number) => {
    onSave(id);
  };

  const parentCategory =
    categories.find(
      (category) =>
        category.id === feedData.mainCategoryId || category.children.some((tag) => tag.id === feedData.categoryId),
    ) ?? null;

  const isInitial =
    categories.find(
      (category) =>
        category.id === feedData.mainCategoryId && category.children.some((tag) => tag.id === feedData.categoryId),
    ) ?? null;

  return (
    <>
      <Select>
        {parentCategory && parentCategory.children.length > 0 && (
          <>
            {/* TODO: 전체가 있는 경우 true면 */}
            {parentCategory.hasAll && (
              <>
                <Responsive only='desktop'>
                  <Option onClick={() => handleSelectTagDesktop(feedData.mainCategoryId)}>
                    주제 선택 안 함{!isInitial && <CheckIcon />}
                  </Option>
                </Responsive>
                <Responsive only='mobile'>
                  <Option onClick={() => handleSelectTagMobile(feedData.mainCategoryId)}>
                    주제 선택 안 함{!isInitial && <CheckIcon />}
                  </Option>
                </Responsive>
              </>
            )}
            <>
              {parentCategory.children.map((tag: BasicCategory) => {
                return (
                  <>
                    <Responsive only='desktop'>
                      <Option key={tag.id} onClick={() => handleSelectTagDesktop(tag.id)}>
                        {tag.name}
                        {tag.id === feedData.categoryId && <CheckIcon />}
                      </Option>
                    </Responsive>
                    <Responsive only='mobile'>
                      <Option key={tag.id} onClick={() => handleSelectTagMobile(tag.id)}>
                        {tag.name}
                        {tag.id === feedData.categoryId && <CheckIcon />}
                      </Option>
                    </Responsive>
                  </>
                );
              })}
            </>
          </>
        )}
      </Select>
      <SubmitButton onClick={() => onClose()}>
        <Responsive only='mobile'>
          <SquareLink variant='primary' size='medium'>
            확인
          </SquareLink>
        </Responsive>
      </SubmitButton>
    </>
  );
}

const Select = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 24px;
  }
`;

const Option = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 12px;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 0 8px;
  width: 100%;
`;
