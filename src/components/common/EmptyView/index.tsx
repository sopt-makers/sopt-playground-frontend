import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const EmptyView = () => {
  return (
    <StyledEmpty>
      <EmptyTitle>OMG... 검색 결과가 없어요.</EmptyTitle>
      <EmptyDescription>검색어를 바르게 입력했는지 확인하거나, 필터를 변경해보세요.</EmptyDescription>
    </StyledEmpty>
  );
};

export default EmptyView;

const StyledEmpty = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 300px;
  max-height: 100%;

  & > span {
    display: block;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
  }
`;

const EmptyTitle = styled.span`
  ${fonts.HEADING_32_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_24_B};
  }
`;

const EmptyDescription = styled.span`
  color: ${colors.gray400};
  ${fonts.BODY_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_14_M};
  }
`;
