import styled from '@emotion/styled';
import { FC } from 'react';

import SoulmateIcon from '@/components/soulmate/icons/SoulmateIcon';
import SoulmateModal from '@/components/soulmate/view/common/SoulmateModal';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface RegisterSuccessModalProps {
  open?: boolean;
  onOpenChange?: (val: boolean) => void;
}

const RegisterSuccessModal: FC<RegisterSuccessModalProps> = ({ open, onOpenChange }) => {
  return (
    <SoulmateModal open={open} onOpenChange={onOpenChange}>
      <Container>
        <ImageWrapper>
          <SoulmateIcon />
        </ImageWrapper>
        <Description>
          소울메이트 신청이 완료되었어요.
          <br />
          매칭 시 문자로 알림드릴게요!
        </Description>
      </Container>
    </SoulmateModal>
  );
};

export default RegisterSuccessModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  margin-top: 26px;

  & > img {
    width: 55px;
    height: 55px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 16px;

    & > img {
      width: 40px;
      height: 40px;
    }
  }
`;

const Description = styled.div`
  margin-top: 10px;
  text-align: center;
  line-height: 140%;
  letter-spacing: -0.2px;

  ${textStyles.SUIT_20_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_B};
  }
`;
