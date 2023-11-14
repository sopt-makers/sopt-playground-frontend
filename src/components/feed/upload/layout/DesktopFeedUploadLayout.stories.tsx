import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Meta } from '@storybook/react';

import CategoryHeader from '@/components/feed/upload/Category/CategoryHeader';
import DesktopFeedUploadLayout from '@/components/feed/upload/layout/DesktopFeedUploadLayout';
import UsingRulesButton from '@/components/feed/upload/UsingRules/UsingRulesButton';
import BackArrow from '@/public/icons/icon_chevron_left.svg';

export default {
  component: DesktopFeedUploadLayout,
} as Meta<typeof DesktopFeedUploadLayout>;

export const Default = {
  render: function Render() {
    return (
      <>
        <DesktopFeedUploadLayout
          header={
            <>
              <UsingRulesButtonWrapper>
                <UsingRulesButton />
              </UsingRulesButtonWrapper>
              <BackArrow />
              <CategoryHeader />
              <SubmitButton disabled={false}>올리기</SubmitButton>
            </>
          }
          body={
            <>
              <h1>제목</h1>
              <p>내용</p>
            </>
          }
          footer={
            <>
              <TagsWrapper>
                <button>사진</button>
                <button>코드</button>
              </TagsWrapper>
              <CheckBoxesWrapper>
                <button>질문글</button>
                <button>익명</button>
              </CheckBoxesWrapper>
            </>
          }
        />
      </>
    );
  },

  name: '피드 업로드 데스크탑',
};

const SubmitButton = styled.button<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${({ disabled }) =>
    disabled
      ? css`
          ${colors.gray700}
        `
      : css`
          ${colors.blue400}
        `};
  padding: 8px 12px;
  color: ${({ disabled }) =>
    disabled
      ? css`
          ${colors.gray300}
        `
      : css`
          ${colors.gray50}
        `};
`;

const UsingRulesButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 122px;
  justify-content: flex-end;
  width: 100%;
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const CheckBoxesWrapper = styled.div`
  display: flex;
  gap: 16px;
`;
