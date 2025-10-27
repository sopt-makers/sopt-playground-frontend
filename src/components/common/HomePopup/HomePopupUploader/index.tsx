import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Button, CheckBox, Dialog, TextField } from '@sopt-makers/ui';
import { useState } from 'react';

import { usePostHomePopup } from '@/api/endpoint/homePopup/postHomePopup';
import useImageUploader from '@/hooks/useImageUploader';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const INITIAL_FORM_DATA = {
  startDate: '',
  endDate: '',
  pcImageUrl: '',
  mobileImageUrl: '',
  linkUrl: '',
  openInNewTab: false,
  showOnlyToRecentGeneration: false,
};

const IMAGE_SIZES = {
  PC: '422 * 500',
  MOBILE: '295 * 334',
} as const;

const HomePopupUploader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: postHomePopup, isPending } = usePostHomePopup();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const updateFormData = (key: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  const { imageInputRef: pcImageInputRef, handleClickImageInput: handlePcImageClick } = useImageUploader({
    onSuccess: (urls) => {
      if (urls.length > 0) {
        setFormData((prev) => ({ ...prev, pcImageUrl: urls[0] }));
      }
    },
    maxImageLength: 1,
  });

  const { imageInputRef: mobileImageInputRef, handleClickImageInput: handleMobileImageClick } = useImageUploader({
    onSuccess: (urls) => {
      if (urls.length > 0) {
        setFormData((prev) => ({ ...prev, mobileImageUrl: urls[0] }));
      }
    },
    maxImageLength: 1,
  });

  const isFormValid = formData.startDate && formData.endDate && formData.pcImageUrl && formData.mobileImageUrl;

  const handleSubmit = async () => {
    if (!isFormValid) {
      alert('시작, 종료 날짜, PC 이미지, 모바일 이미지를 모두 입력해주세요');
      return;
    }

    postHomePopup(
      {
        ...formData,
        linkUrl: formData.linkUrl || null,
      },
      {
        onSuccess: () => {
          alert('홈 팝업이 등록되었습니다!');
          setIsModalOpen(false);
          resetForm();
        },
        onError: (error) => {
          alert(`등록 실패: ${error.message}`);
        },
      },
    );
  };

  return (
    <>
      <StFloatingButton onClick={() => setIsModalOpen(true)}>홈 팝업 등록</StFloatingButton>

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Dialog.Title>홈 팝업 등록</Dialog.Title>
        <Dialog.Description>
          가장 최근에 등록된 홈 팝업이 우선적으로 노출됩니다
          <br />
          기존 팝업의 수정 및 삭제는{' '}
          <StLink href='https://playground-dev.sopt.org/admin' target='_blank' rel='noopener noreferrer'>
            여기
          </StLink>
          에서 진행해 주세요
        </Dialog.Description>

        <StFormWrapper onSubmit={handleSubmit}>
          <StFormGroup>
            <label htmlFor='startDate'>시작 날짜</label>
            <StDateInput
              type='date'
              id='startDate'
              value={formData.startDate}
              onChange={(e) => updateFormData('startDate', e.target.value)}
              required
            />
          </StFormGroup>

          <StFormGroup>
            <label htmlFor='endDate'>종료 날짜</label>
            <StDateInput
              type='date'
              id='endDate'
              value={formData.endDate}
              onChange={(e) => updateFormData('endDate', e.target.value)}
              required
            />
          </StFormGroup>

          <StFormGroup>
            <label>PC 이미지 ({IMAGE_SIZES.PC})</label>
            <input ref={pcImageInputRef} type='file' accept='image/*' style={{ display: 'none' }} />
            <StUploadButton type='button' onClick={handlePcImageClick}>
              이미지 업로드
            </StUploadButton>
            {formData.pcImageUrl && (
              <StImagePreview>
                <StRemoveButton
                  type='button'
                  onClick={() => updateFormData('pcImageUrl', '')}
                  aria-label='PC 이미지 제거'
                >
                  ✕
                </StRemoveButton>
                <img src={formData.pcImageUrl} alt='PC 이미지 미리보기' />
              </StImagePreview>
            )}
          </StFormGroup>

          <StFormGroup>
            <label>Mobile 이미지 ({IMAGE_SIZES.MOBILE})</label>
            <input ref={mobileImageInputRef} type='file' accept='image/*' style={{ display: 'none' }} />
            <StUploadButton type='button' onClick={handleMobileImageClick}>
              이미지 업로드
            </StUploadButton>
            {formData.mobileImageUrl && (
              <StImagePreview>
                <StRemoveButton
                  type='button'
                  onClick={() => updateFormData('mobileImageUrl', '')}
                  aria-label='모바일 이미지 제거'
                >
                  ✕
                </StRemoveButton>
                <img src={formData.mobileImageUrl} alt='모바일 이미지 미리보기' />
              </StImagePreview>
            )}
          </StFormGroup>

          <StFormGroup>
            <label htmlFor='linkUrl'>링크 URL (선택)</label>
            <StTextField
              value={formData.linkUrl}
              onChange={(e) => updateFormData('linkUrl', e.target.value)}
              placeholder='https://...'
            />
          </StFormGroup>

          <StCheckboxGroup>
            <label>
              <CheckBox
                type='checkbox'
                checked={formData.openInNewTab}
                onChange={(e) => updateFormData('openInNewTab', e.target.checked)}
              />
              링크 새 탭에서 열기
            </label>
          </StCheckboxGroup>

          <StCheckboxGroup>
            <label>
              <CheckBox
                type='checkbox'
                checked={formData.showOnlyToRecentGeneration}
                onChange={(e) => updateFormData('showOnlyToRecentGeneration', e.target.checked)}
              />
              활동 기수에게만 보이기
            </label>
          </StCheckboxGroup>
        </StFormWrapper>

        <Dialog.Footer align='right'>
          <Button type='button' onClick={() => setIsModalOpen(false)} theme='black' size='md' rounded='md'>
            취소
          </Button>
          <Button
            type='submit'
            onClick={handleSubmit}
            theme='white'
            size='md'
            rounded='md'
            variant='outlined'
            disabled={!isFormValid || isPending}
          >
            {isPending ? '등록 중...' : '등록'}
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};

const StFloatingButton = styled.button`
  position: fixed;
  top: 100px;
  right: 10px;
  z-index: 200;
  border-radius: 8px;
  background-color: ${colors.success};
  cursor: pointer;
  padding: 5px;
  color: ${colors.white};
  font: ${fonts.LABEL_14_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    top: 20px;
    right: 2px;
  }
`;

const StFormWrapper = styled.form`
  padding: 20px 4px 0;
  max-height: 60vh;
  overflow-y: auto;
`;

const StFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    margin-bottom: 8px;
    color: ${colors.white};
    font: ${fonts.LABEL_14_SB};
  }
`;

const StCheckboxGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
    font: ${fonts.BODY_14_M};
  }
`;

const StUploadButton = styled.button`
  border: 1px solid ${colors.gray300};
  border-radius: 8px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 14px 16px;
  color: ${colors.white};
  font: ${fonts.LABEL_14_SB};

  &:hover {
    background-color: ${colors.gray700};
  }
`;

const StImagePreview = styled.div`
  position: relative;
  margin-top: 12px;
  border: 1px solid ${colors.gray200};
  border-radius: 8px;
  max-width: 150px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const StRemoveButton = styled.button`
  display: flex;
  position: absolute;
  top: 8px;
  right: 8px;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 50%;
  background-color: rgb(0 0 0 / 60%);
  cursor: pointer;
  padding: 4px;
  width: 24px;
  height: 24px;
  line-height: 1;
  color: ${colors.white};
  font-size: 16px;

  &:hover {
    background-color: rgb(0 0 0 / 80%);
  }
`;

const StTextField = styled(TextField)`
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
`;

const StDateInput = styled.input`
  display: block;
  border: 1px solid ${colors.gray300};
  border-radius: 10px;
  background-color: ${colors.gray800};
  padding: 14px 16px;
  width: 100%;
  color: ${colors.white};
`;

const StLink = styled.a`
  text-decoration: underline;
`;
export default HomePopupUploader;
