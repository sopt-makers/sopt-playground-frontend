import useAlert from '@/components/common/Modal/useAlert';
import { zIndex } from '@/styles/zIndex';

export default function useBlindWriterPromise() {
  const { alert } = useAlert();

  const handleShowBlindWriterPromise = () => {
    alert({
      title: '기분좋은 소통을 부탁드려요!',
      description:
        '익명으로 타인을 비난하거나 문제가 될 수 있는 글을 작성하면, 커뮤니티 이용규칙 및 SOPT 회칙에 따라 이용이 제한될 수 있어요.',
      hideCloseButton: true,
      buttonText: '확인',
      buttonColor: 'white',
      buttonTextColor: 'black',
      maxWidth: 324,
      zIndex: zIndex.헤더 + 1,
    });
  };

  return { handleShowBlindWriterPromise };
}
