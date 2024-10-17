import { COFFEECHAT_MOBILE_MEDIA_QUERY } from '@/components/coffeechat/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

interface FieldLabelProps {
  label: string;
  description?: string;
  essential?: boolean;
}

export default function FieldLabel({ label, description, essential }: FieldLabelProps) {
  return (
    <FieldLabelWrapper>
      <Label>
        <>{label}</>
        <>{essential && <Essential>*</Essential>}</>
      </Label>
      <Descripiton>{description}</Descripiton>
    </FieldLabelWrapper>
  );
}

const FieldLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.h2`
  display: flex;
  gap: 4px;
  color: ${colors.white};
  ${fonts.LABEL_16_SB};
  margin-bottom: 8px;

  @media ${COFFEECHAT_MOBILE_MEDIA_QUERY} {
    ${fonts.LABEL_14_SB};
  }
`;

const Essential = styled.p`
  color: ${colors.orange400};
`;

const Descripiton = styled.p`
  color: ${colors.gray300};
  ${fonts.LABEL_14_SB};

  @media ${COFFEECHAT_MOBILE_MEDIA_QUERY} {
    ${fonts.LABEL_12_SB};
  }
`;
