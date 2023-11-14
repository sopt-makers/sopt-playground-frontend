import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Meta } from '@storybook/react';

import CategoryHeader from '@/components/feed/upload/Category/CategoryHeader';
import MobileFeedUploadLayout from '@/components/feed/upload/layout/MobileFeedUploadLayout';
import { textStyles } from '@/styles/typography';

export default {
  component: MobileFeedUploadLayout,
} as Meta<typeof MobileFeedUploadLayout>;

export const Default = {
  render: function Render() {
    return (
      <>
        <MobileFeedUploadLayout
          header={
            <>
              <TopHeader>
                <Button type='button' disabled={false}>
                  취소
                </Button>
                {/* TODO: 내용 입력 다 되면 disabled={false}되도록 로직 수정 */}
                <Button type='submit' disabled={true}>
                  올리기
                </Button>
              </TopHeader>
              <CategoryHeader />
            </>
          }
          aside={
            <>
              <button>질문글</button>
              <button>익명</button>
            </>
          }
          body={
            <>
              <h1>안녕하세요 제목입니다 제목입니다 제목입니다</h1>
              <p>
                내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다
                내용입니다 내용입니다 내용입니다
              </p>
            </>
          }
          footer={
            <>
              <button>사진</button>
              <button>코드</button>
            </>
          }
        />
      </>
    );
  },

  name: '피드 업로드 모바일',
};

const TopHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  width: 100%;
  height: 44px;
`;

const Button = styled.button<{ disabled: boolean }>`
  ${textStyles.SUIT_16_M};

  color: ${({ disabled }) =>
    disabled
      ? css`
          ${colors.gray600}
        `
      : css`
          ${colors.gray50}
        `};
`;
