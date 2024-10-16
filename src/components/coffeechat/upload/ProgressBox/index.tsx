import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconCheck } from '@sopt-makers/icons';

interface ProgressBoxProps {
  uploadType: string;
  myInfoInprogress: boolean;
  coffeechatInfoInprogress: boolean;
}

export default function ProgressBox({ uploadType, myInfoInprogress, coffeechatInfoInprogress }: ProgressBoxProps) {
  return (
    <Box>
      <SubTitle>커피챗 {uploadType}</SubTitle>
      <Border />
      <ProgressWrapper>
        <Content>
          <Label>
            <ProgressCheck isInprogress={myInfoInprogress} />
            <p>1. 내 정보</p>
          </Label>
          <Label>
            <ProgressCheck isInprogress={coffeechatInfoInprogress} />
            <p>2. 커피챗 정보</p>
          </Label>
        </Content>
      </ProgressWrapper>
    </Box>
  );
}

const Box = styled.aside`
  display: flex;
  position: fixed;
  flex-direction: column;
  gap: 36px;
  align-items: flex-start;
  border: 1px solid ${colors.gray800};
  border-radius: 15px;
  padding: 50px 40px 60px;
  width: 100%;
  color: ${colors.gray10};
`;

const Border = styled.div`
  border-bottom: 1px solid ${colors.gray800};
  width: 100%;
`;

const SubTitle = styled.h2`
  ${fonts.HEADING_24_B};
`;

const Label = styled.label`
  display: flex;
  gap: 24px;
  align-items: center;

  ${fonts.BODY_16_M};
`;

const ProgressWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &::before {
    position: absolute;
    top: 20px;
    bottom: 20px;
    left: 7px;
    transform: translateX(-50%); /* 세로줄을 정확히 가운데로 이동 */
    background-color: ${colors.gray800};
    width: 1px;
    content: '';
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 51px;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ProgressCheck = ({ isInprogress }: { isInprogress: boolean }) => {
  return (
    <>
      {isInprogress ? (
        <IconCheckCircle isInprogress>
          <IconCheck />
        </IconCheckCircle>
      ) : (
        <IconCheckCircle isInprogress={isInprogress} />
      )}
    </>
  );
};

const IconCheckCircle = styled.div<{ isInprogress: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ isInprogress }) => (isInprogress ? colors.blue400 : colors.gray600)};
  padding: 3px;
  width: 14px;
  height: 14px;
`;
