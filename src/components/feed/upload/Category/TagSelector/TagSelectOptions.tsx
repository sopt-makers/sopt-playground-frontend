import styled from '@emotion/styled';

import Responsive from '@/components/common/Responsive';
import SquareLink from '@/components/common/SquareLink';
import { CATEGORY_OPTIONS } from '@/components/feed/upload/Category/constants';
import CheckIc from '@/public/icons/icon_check.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface TagSelectOptionsProp {
  onClose: () => void;
}

export default function TagSelectOptions({ onClose }: TagSelectOptionsProp) {
  const handleSelectTag = (option: string) => {
    // TODO: 태그 저장 로직
    // TODO: 데스크탑 뷰인 경우는 태그 선택 후 onClose / 모바일 뷰인 경우는 태그 선택까지만 이루어지도록 구현
    // onClose();
  };

  const handleSubmit = () => {
    // TODO: submit 로직
  };

  return (
    <>
      <Select>
        {/* TODO: 카테고리 옵션 가져오기 */}
        {CATEGORY_OPTIONS[1].tags.map((tag) => {
          return (
            <Option key={tag} onClick={() => handleSelectTag(tag)}>
              {tag}
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
