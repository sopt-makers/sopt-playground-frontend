import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import Responsive from '@/components/common/Responsive';
import SquareLink from '@/components/common/SquareLink';
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

  const { data: categories } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  const parentCategory =
    (categories &&
      categories.find(
        (category: BasicCategory) =>
          category.id === feedData.mainCategoryId || category.children.some((tag) => tag.id === feedData.categoryId),
      )) ??
    null;

  const isInitial =
    (categories &&
      categories.find(
        (category: BasicCategory) =>
          category.id === feedData.mainCategoryId && category.children.some((tag) => tag.id === feedData.categoryId),
      )) ??
    null;

  return (
    <>
      <Select>
        {parentCategory && parentCategory.children.length > 0 && (
          <>
            {parentCategory.hasAll && (
              <>
                <Responsive only='desktop'>
                  <Option onClick={() => handleSelectTagDesktop(feedData.mainCategoryId ?? 0)}>
                    주제 선택 안 함{!isInitial && <CheckIcon />}
                  </Option>
                </Responsive>
                <Responsive only='mobile'>
                  <Option onClick={() => handleSelectTagMobile(feedData.mainCategoryId ?? 0)}>
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
