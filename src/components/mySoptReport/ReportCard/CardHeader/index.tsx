import { getCardConfig } from '@/components/mySoptReport/constants';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useToast } from '@sopt-makers/ui';
import { toPng } from 'html-to-image';
import { StaticImageData } from 'next/image';

interface CardHeaderProps {
  title?: string;
  image?: StaticImageData;
  type?: string;
  value?: any;
}

const CardHeader = ({ title = 'SOPT Playground', image, type, value }: CardHeaderProps) => {
  const cardConfig = type && value && getCardConfig(type, value);
  const { open } = useToast();

  const handleDownload = async () => {
    if (image) {
      const link = document.createElement('a');
      link.href = image.src;
      link.download = '마이 플그 활동 유형';
      link.click();
    } else {
      // 이미지가 없는 경우 HTML -> PNG 변환 후 다운로드
      const element = document.getElementById(`downloadableContent-${cardConfig.strongColor}`);
      if (element) {
        const dataUrl = await toPng(element);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `마이 플그 데이터 ${cardConfig.index}`;
        link.click();
      }
    }

    open({
      icon: 'success',
      content: '이미지가 저장되었어요!',
      style: {
        content: {
          whiteSpace: 'pre-wrap',
        },
      },
    });
  };

  return (
    <Wrapper>
      <Label>{title}</Label>
      <DownButton onClick={handleDownload}>
        <DownIcon />
      </DownButton>

      {/* 다운로드를 위한 숨겨진 HTML 콘텐츠 */}
      {!image && (
        <HiddenContent id={`downloadableContent-${cardConfig.strongColor}`} $bgColor={cardConfig.bgColor}>
          <Title>SOPT Playground</Title>
          <MainText
            $titleColor={cardConfig.titleColor}
            $strongColor={cardConfig.strongColor}
            dangerouslySetInnerHTML={{ __html: cardConfig.title }}
          />
          {cardConfig.description && (
            <Description $strongColor={cardConfig.strongColor}>{cardConfig.description}</Description>
          )}
          {type === 'myCrewStats' && (
            <CrewContainer>
              {cardConfig.crewList!.length > 0 ? (
                cardConfig.crewList!.slice(0, 3).map((crew: string, idx: number) => (
                  <CrewItem key={idx} $index={idx}>
                    <CrewText>{crew}</CrewText>
                  </CrewItem>
                ))
              ) : (
                <CrewItem $index={0}>작년에 신청한 모임이 없어요</CrewItem>
              )}
              {}
            </CrewContainer>
          )}
          {type === 'myWordChainGameStats' && (
            <WordChainContainer>
              {cardConfig.wordList!.length > 0 ? (
                cardConfig
                  .wordList!.slice(0, 5)
                  .map((word: string, idx: number) => <WordChainChip key={idx}>{word}</WordChainChip>)
              ) : (
                <CrewItem $index={0}>작년에 참여한 끝말잇기가 없어요</CrewItem>
              )}
              {}
            </WordChainContainer>
          )}
          {cardConfig?.subImage}
          {cardConfig?.subImage && <TypeImg src={cardConfig.subImage} />}
        </HiddenContent>
      )}
    </Wrapper>
  );
};

export default CardHeader;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Label = styled.p`
  ${fonts.TITLE_16_SB};

  color: ${colors.gray950};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.TITLE_14_SB};
  }
`;

const DownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: ${colors.gray950};
  padding: 2.8px;
  width: 28.8px;
  height: 28.8px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 2.4px;
    width: 24px;
    height: 24px;
  }
`;

const DownIcon = () => {
  return (
    <svg width='18' height='18' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Icon / Media / image-down'>
        <path
          id='Icon'
          d='M10.4001 3.8L12.2001 5.6M12.2001 5.6L14.0001 3.8M12.2001 5.6V2M8.3001 2.6H5.4801C4.472 2.6 3.96796 2.6 3.58291 2.79619C3.24422 2.96876 2.96886 3.24413 2.79629 3.58282C2.6001 3.96786 2.6001 4.47191 2.6001 5.48V10.52C2.6001 11.5281 2.6001 12.0321 2.79629 12.4172C2.96886 12.7559 3.24422 13.0312 3.58291 13.2038C3.96796 13.4 4.472 13.4 5.4801 13.4H11.0001C11.5581 13.4 11.8371 13.4 12.066 13.3387C12.6871 13.1722 13.1723 12.687 13.3388 12.0659C13.4001 11.837 13.4001 11.558 13.4001 11M7.1001 5.9C7.1001 6.56274 6.56284 7.1 5.9001 7.1C5.23736 7.1 4.7001 6.56274 4.7001 5.9C4.7001 5.23726 5.23736 4.7 5.9001 4.7C6.56284 4.7 7.1001 5.23726 7.1001 5.9ZM9.79412 7.95089L4.71879 12.5648C4.43332 12.8243 4.29058 12.9541 4.27795 13.0665C4.26701 13.1639 4.30437 13.2606 4.37801 13.3253C4.46296 13.4 4.65587 13.4 5.04167 13.4H10.6737C11.5372 13.4 11.9689 13.4 12.308 13.2549C12.7338 13.0728 13.0729 12.7337 13.255 12.3079C13.4001 11.9688 13.4001 11.5371 13.4001 10.6736C13.4001 10.383 13.4001 10.2378 13.3683 10.1025C13.3284 9.93247 13.2519 9.77321 13.1441 9.63584C13.0582 9.52652 12.9448 9.43577 12.7179 9.25427L11.0396 7.9116C10.8125 7.72995 10.699 7.63912 10.574 7.60707C10.4638 7.57881 10.3478 7.58247 10.2396 7.61761C10.1169 7.65748 10.0093 7.75529 9.79412 7.95089Z'
          stroke='white'
          strokeWidth='0.9'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
};

const HiddenContent = styled.div<{ $bgColor?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 12px;
  background-color: ${({ $bgColor }) => $bgColor || colors.gray100};
  padding: 28.8px;
  width: 294px;
  height: 403.2px;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 10px;
    padding: 24px;
    width: 245px;
    height: 336px;
  }
`;

const Title = styled.h1`
  ${fonts.LABEL_14_SB};

  color: ${colors.gray950};
`;

const MainText = styled.h2<{ $titleColor?: string; $strongColor?: string }>`
  margin-top: 28px;
  white-space: pre-line;
  color: ${({ $titleColor }) => $titleColor || colors.black};
  ${fonts.TITLE_24_SB};

  .highlight {
    color: ${({ $strongColor }) => $strongColor || colors.black};
    ${fonts.TITLE_28_SB};

    @media ${MOBILE_MEDIA_QUERY} {
      ${fonts.TITLE_24_SB};
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 24px;
    ${fonts.TITLE_20_SB};
  }
`;

const Description = styled.p<{ $strongColor?: string }>`
  margin-top: 12px;
  ${fonts.BODY_16_R};

  white-space: pre-line;
  color: ${({ $strongColor }) => $strongColor || colors.gray600};
  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_13_R};
  }
`;

const TypeImg = styled.img`
  margin-top: 14px;
`;

const CrewContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  margin-top: 28px;
  color: ${colors.gray50};

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 6px;
    margin-top: 24px;
  }
`;

const CrewItem = styled.li<{ $index: number }>`
  ${fonts.BODY_13_M};

  border-radius: 4px;
  background-color: ${({ $index }) =>
    $index === 0 ? 'rgba(15, 15, 18, 0.60)' : $index === 1 ? 'rgba(15, 15, 18, 0.40)' : 'rgba(15, 15, 18, 0.20)'};
  padding: 9.6px 12px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.LABEL_12_SB};

    padding: 8px 10px;
  }
`;

const CrewText = styled.p`
  /* stylelint-disable */
  display: -webkit-box;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const WordChainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 40px;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 35px;
  }
`;

const WordChainChip = styled.div`
  display: flex;
  padding: 7.2px 14.4px;
  justify-content: center;
  align-items: center;
  ${fonts.LABEL_14_SB};
  background-color: #bc60a7;
  border-radius: 120px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 6px 12px;

    ${fonts.LABEL_11_SB};
  }
`;
