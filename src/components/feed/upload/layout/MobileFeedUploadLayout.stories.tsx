import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Meta } from '@storybook/react';
import { useState } from 'react';

import Category from '@/components/feed/upload/Category';
import MobileFeedUploadLayout from '@/components/feed/upload/layout/MobileFeedUploadLayout';
import UsingRulesButton from '@/components/feed/upload/UsingRules/UsingRulesButton';
import UsingRulesPreview from '@/components/feed/upload/UsingRules/UsingRulesPreview';
import { textStyles } from '@/styles/typography';

export default {
  component: MobileFeedUploadLayout,
} as Meta<typeof MobileFeedUploadLayout>;

export const Default = {
  render: function Render() {
    const [id, setId] = useState(1);
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
              <Category categoryId={id} onSave={setId} />
            </>
          }
          body={
            <>
              <CheckBoxesWrapper>
                <button>질문글</button>
                <button>익명</button>
              </CheckBoxesWrapper>
              <h1>안녕하세요 제목입니다 제목입니다 제목입니다</h1>
              <p>
                내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다
                내용입니다 내용입니다 내용입니다
              </p>
              <TagsWrapper>
                <button>사진</button>
                <button>코드</button>
              </TagsWrapper>
            </>
          }
          footer={
            <>
              <UsingRulesPreview />
              <UsingRulesButton />
            </>
          }
        />
      </>
    );
  },

  name: '피드 업로드 모바일',
};

const TagsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const CheckBoxesWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin: 24px 0;
`;

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
