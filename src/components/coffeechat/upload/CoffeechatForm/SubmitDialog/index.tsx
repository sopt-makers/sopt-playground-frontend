import styled from '@emotion/styled';
import { Button, Dialog } from '@sopt-makers/ui';
import { FieldValues, useFormContext } from 'react-hook-form';

import Responsive from '@/components/common/Responsive';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SubmitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: <T extends FieldValues>(values: T) => void;
  uploadType: '오픈' | '수정';
}

export default function SubmitDialog({ isOpen, onClose, onSubmit, uploadType }: SubmitDialogProps) {
  const { getValues } = useFormContext();

  return (
    <>
      <Dialog isOpen={isOpen} onClose={onClose}>
        <Dialog.Title>커피챗을 {uploadType}하시겠습니까?</Dialog.Title>
        <DescriptionWrapper>
          <Dialog.Description>
            커피챗은 한 개만 오픈할 수 있어요. 커피챗에 대한 설명이 충분히 작성되었는지 확인해주세요.
          </Dialog.Description>
        </DescriptionWrapper>
        <Responsive only='desktop'>
          <Dialog.Footer align={'right'}>
            <Button type='button' onClick={onClose} rounded='md' size='md' theme='black'>
              취소
            </Button>
            <Button type='button' onClick={() => onSubmit(getValues())} rounded='md' size='md' theme='white'>
              {uploadType}하기
            </Button>
          </Dialog.Footer>
        </Responsive>
        <Responsive only='mobile'>
          <Dialog.Footer align={'center'}>
            <Button type='button' onClick={onClose} rounded='md' size='md' theme='black' style={{ width: '100%' }}>
              취소
            </Button>
            <Button
              type='button'
              onClick={() => onSubmit(getValues())}
              rounded='md'
              size='md'
              theme='white'
              style={{ width: '100%' }}
            >
              {uploadType}하기
            </Button>
          </Dialog.Footer>
        </Responsive>
      </Dialog>
    </>
  );
}

const DescriptionWrapper = styled.div`
  margin-top: 12px;
  margin-bottom: 36px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    margin-bottom: 24px;
  }
`;
