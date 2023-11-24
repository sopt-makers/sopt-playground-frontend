import useAlert from '@/components/common/Modal/useAlert';

export default function useBlindWriterPromise() {
  const { alert } = useAlert();

  const handleShowBlindWriterPromise = () => {
    alert({
      title: '플레이그라운드는 건전하고 기분좋은 소통을 지향해요',
      description:
        '타인을 비난하거나 저격하는 글을 작성하는 등 커뮤니티 이용규칙을 위반할 경우, 서비스 이용이 제한될 수 있으며 내부 절차에 따라 익명 작성자를 식별하여 징계위원회를 열 수 있습니다.',
      hideCloseButton: true,
      buttonText: '명심할게요',
      buttonColor: 'white',
      buttonTextColor: 'black',
    });
  };

  return { handleShowBlindWriterPromise };
}
