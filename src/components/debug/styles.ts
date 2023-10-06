import styled from '@emotion/styled';

import Button from '@/components/common/Button';
import { textStyles } from '@/styles/typography';

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 15px;
  width: 100%;
`;

export const ActionBox = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const ActionButton = styled(Button)`
  width: 100%;
  line-height: 100%;

  ${textStyles.SUIT_16_M}
`;
