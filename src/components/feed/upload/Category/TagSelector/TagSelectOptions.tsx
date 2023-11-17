import styled from '@emotion/styled';

import Responsive from '@/components/common/Responsive';
import SquareLink from '@/components/common/SquareLink';
import { categories } from '@/components/feed/upload/Category/constants';
import { BasicCategory } from '@/components/feed/upload/Category/types';
import CheckIc from '@/public/icons/icon_check.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface TagSelectOptionsProp {
  onClose: () => void;
  onSave: (categoryId: number) => void;
}

export default function TagSelectOptions({ onClose, onSave }: TagSelectOptionsProp) {
  const handleSelectTag = (id: number) => {
    // TODO: 데스크탑 뷰인 경우는 태그 선택 후 onClose / 모바일 뷰인 경우는 태그 선택까지만 이루어지도록 구현
    // onSave(id);
    // onClose();
  };

  const handleSubmit = () => {
    // TODO: submit 로직
  };

  return (
    <>
      <Select>
        {/* TODO: 카테고리 옵션 가져오기 */}
        {categories[3].children.length > 0 &&
          categories[3].children.map((tag: BasicCategory) => {
            return (
              <Option key={tag.id} onClick={() => handleSelectTag(tag.id)}>
                {tag.name}
                <CheckIc />
              </Option>
            );
          })}
      </Select>
      <SubmitButton onClick={handleSubmit}>
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
`;

const SubmitButton = styled.button`
  padding: 0 8px;
  width: 100%;
`;
