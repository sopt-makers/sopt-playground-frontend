import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconChevronLeft } from '@sopt-makers/icons';
import { Button, Callout } from '@sopt-makers/ui';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import Checkbox from '@/components/common/Checkbox';
import useModalState from '@/components/common/Modal/useModalState';
import Responsive from '@/components/common/Responsive';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import useCategory from '@/components/feed/common/hooks/useCategory';
import { mentionRegex } from '@/components/feed/common/utils/parseMention';
import { GROUP_CATEGORY_ID, QUESTION_CATEGORY_ID, SOPTICLE_CATEGORY_ID } from '@/components/feed/constants';
import Category from '@/components/feed/upload/Category';
import CheckboxFormItem from '@/components/feed/upload/CheckboxFormItem';
import { useCategoryUsingRulesPreview } from '@/components/feed/upload/hooks/useCategorySelect';
import useLinkValidator from '@/components/feed/upload/hooks/useLinkValidator';
import useUploadFeedData from '@/components/feed/upload/hooks/useUploadFeedData';
import ImagePreview from '@/components/feed/upload/ImagePreview';
import ImageUploadButton from '@/components/feed/upload/ImageUploadButton';
import ContentsInput from '@/components/feed/upload/Input/ContentsInput';
import LinkInput from '@/components/feed/upload/Input/LinkInput';
import TitleInput from '@/components/feed/upload/Input/TitleInput';
import DesktopFeedUploadLayout from '@/components/feed/upload/layout/DesktopFeedUploadLayout';
import MobileFeedUploadLayout from '@/components/feed/upload/layout/MobileFeedUploadLayout';
import {
  SelectDesktop,
  SelectDesktopContent,
  SelectDesktopTrigger,
} from '@/components/feed/upload/select/SelectDesktop';
import SelectMobile from '@/components/feed/upload/select/SelectMobile';
import { PostedFeedDataType } from '@/components/feed/upload/types';
import UsingRules from '@/components/feed/upload/UsingRules';
import VoteModal from '@/components/feed/upload/voteModal';
import VotePreview from '@/components/feed/upload/votePreview';
import VoteUploadButton from '@/components/feed/upload/voteUploadButton';
import useImageUploader from '@/hooks/useImageUploader';
import BackArrow from '@/public/icons/icon_chevron_left.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface FeedUploadPageProp {
  editingId?: number;
  defaultValue: PostedFeedDataType;
  onSubmit: ({ data, id }: { data: PostedFeedDataType; id: number | null }) => void;
}

export default function FeedUploadPage({ defaultValue, editingId, onSubmit }: FeedUploadPageProp) {
  const router = useRouter();
  const isEdit = editingId !== undefined;

  const {
    feedData,
    handleSaveCategory,
    handleSaveIsBlindWriter,
    saveImageUrls,
    removeImage,
    handleSaveTitle,
    handleSaveContent,
    checkReadyToUpload,
    handleSaveSopticleUrl,
    handleSaveVote,
    handleGroupClick,
    resetVote,
  } = useUploadFeedData(defaultValue);
  useEffect(() => {
    console.log(feedData);
  }, [feedData]);

  const mobileContentsRef = useRef<HTMLDivElement>(null);
  const handleMobileKeyPressToContents = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      mobileContentsRef.current && mobileContentsRef.current.focus();
    }
  };

  const desktopContentsRef = useRef<HTMLDivElement>(null);
  const handleDesktopKeyPressToContents = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      desktopContentsRef.current && desktopContentsRef.current.focus();
    }
  };

  const { imageInputRef: desktopRef, handleClickImageInput: handleDesktopClickImageInput } = useImageUploader({
    onSuccess: saveImageUrls,
    resizeHeight: 240,
  });
  const { imageInputRef: mobileRef, handleClickImageInput: handleMobileClickImageInput } = useImageUploader({
    onSuccess: saveImageUrls,
    resizeHeight: 240,
  });

  const { isPreviewOpen, closeUsingRules } = useCategoryUsingRulesPreview(false);
  const { logClickEvent } = useEventLogger();

  const { isLinkError, validateLink, resetLinkError } = useLinkValidator();
  const { data: me } = useGetMemberOfMe();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSopticle && !validateLink(feedData.link)) {
      return;
    }
    // mention id 저장
    const mentionIds: number[] = [];
    let match: RegExpExecArray | null;

    while ((match = mentionRegex.exec(feedData.content)) !== null) {
      const idNum = parseInt(match[2], 10);
      if (!isNaN(idNum)) {
        mentionIds.push(idNum);
      }
    }

    if (feedData.categoryId === GROUP_CATEGORY_ID) {
      /** crew api 요청 크루 형식에 맞게 커스텀 **/
      const params = {
        contents: feedData.content,
        images: feedData.images,
        title: feedData.title,
        meetingId: 0,
      };
      /** api 요청 성공 시 피드 상세 페이지로 리다이렉트 **/
      // router.push(crewLink.peedDetail());
      return;
    }

    onSubmit({
      data: {
        categoryId: feedData.categoryId,
        title: feedData.title,
        content: feedData.content,
        isQuestion: feedData.isQuestion,
        isBlindWriter: feedData.isBlindWriter,
        images: feedData.images,
        link: feedData.link,
        vote: feedData.vote,
        group: feedData.group,
        mention:
          mentionIds.length > 0
            ? {
                userIds: mentionIds,
                writerName: me?.name,
              }
            : null,
      },
      id: editingId ?? null,
    });
  };

  const handleQuitUpload = () => {
    router.back();
  };

  const { findParentCategory } = useCategory();

  const parentCategory = findParentCategory(feedData.categoryId);

  const isSopticle = parentCategory?.id === SOPTICLE_CATEGORY_ID;
  const isQuestion = parentCategory?.id === QUESTION_CATEGORY_ID;
  const isGroup = parentCategory?.id === GROUP_CATEGORY_ID;

  const quitUploading = () => {
    logClickEvent('quitUploadCommunity');
  };

  useEffect(() => {
    localStorage.setItem('isFirst', 'true');
  }, []);

  useEffect(() => {
    // MEMO: 뒤로가기 감지 시, quitUploading 수행
    const handleBack = () => {
      quitUploading();
    };

    window.addEventListener('popstate', handleBack);

    return () => window.removeEventListener('popstate', handleBack);
  }, [feedData]);

  const { isOpen: isOpenVoteModal, onOpen: onOpenVoteModal, onClose: onCloseVoteModal } = useModalState();
  const hasVoteOptions = feedData.vote && feedData.vote.voteOptions?.length > 0;

  const meetingList = [
    {
      id: 466,
      title: '홈케어스터디',
      contents: '홈케어에 약 2817만원을 쓰는 모임입니다.\n\n',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2025/04/06/5ec43da8-8b0f-4eaf-80aa-96b1c9e93cc0.jpeg',
      category: '스터디',
    },
    {
      id: 464,
      title: '땀흘림 스터디',
      contents:
        '땀 나는 곳이면 어디든 ! 함께 하는 스터디 입니다\n\n페스티벌 / 공연 / 라이브클럽 / 찜질방 사랑하시는 분? 대/환/영\n인디밴드 좋아하는 사람이라면? 무조건 함께해요\uD83E\uDD29\n\n진짜 재밌게. 놀아드립니다.\n\n<스터디장 경력>\n- 2025년 관람 예정 공연 : 콜드플레이/아이묭/오아시스 내한 공연\n- 2025년 관람 희망 공연 : 서재페, 부락, dmz 등\n- 2024년 기준 인터파크 티켓에  300 지출, yes24 티켓에 200 지출\n- 공연 관련 플랫폼 스프린트 진행 중',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2025/04/06/53378154-92f2-475f-813f-18befa703182.png',
      category: '스터디',
    },
    {
      id: 441,
      title: '[메이커스] 알코칠: 알고리즘 코테 Chill~',
      contents: '입병엔? 알보칠\n코테엔? 알코칠\n\n저랑 같이 알고리즘 코테스터디 Chill~하게 뿌셔보실래요?',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2025/03/17/8ed87649-91d1-477f-9ae6-791ad99ad7bb.png',
      category: '스터디',
    },
    {
      id: 391,
      title: '[35기 솝커톤] 웹 파트 신청',
      contents:
        '\uD83D\uDD25SOPT만의 무박 2일 단기 해커톤, 솝커톤(Sopkathon)이 돌아왔습니다!\n\uD83D\uDD39본 페이지는 기획 파트 참가자 신청을 위한 페이지입니다.\n\n❗반드시 본인 파트 확인 후 신청해주세요!\n❗반드시 본인 파트 확인 후 신청해주세요!\n❗반드시 본인 파트 확인 후 신청해주세요!\n\n⬇️ 하기 진행 방식 필독\n',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2024/11/14/f4840e18-80b1-4f64-b55c-19c5abe74f2e.png',
      category: '행사',
    },
    {
      id: 386,
      title: '[\uD83C\uDF00뭉2k\uD83C\uDF00] 이거 마시면 나랑 뭉치는 거다..',
      contents:
        'Back to the 뭉2k,,, ✨\n○lつㅓ ㅁトんı면 ㄴr己б 뭉치는 つㅓ⊂ト..\n\n뭉치와 티미들과 함께 타임머신을 타고~! \uD83C\uDF00\n우리 함께 그때 그 시절로 돌아가볼까요?',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2024/10/27/4146c1a4-331c-476c-b494-e4c5f520fa3b.png',
      category: '행사',
    },
    {
      id: 378,
      title: '\uD83D\uDCAD 호기심스 (웹심화 스터디) \uD83E\uDD14',
      contents:
        '눈 깜빡하면 새로운 기술들이 촤라락 펼쳐지는 웹 개발의 세상 속에서 끊임없이 공부해야 하는 프론트 개발자의 삶.. 이미 모두 알고 계시죠?\n\n상태관리, 데이터 패칭, 컴포넌트 설계 등 다양한 기술과 개념이 넘쳐나는 와중에, 혼자서 이 많은 것들에 부딪히며 공부하기란 참 쉽지 않아요 \uD83D\uDE14\n\n그래서 준비한 스터디 ❕\n\n다양한 기술, 라이브러리를 함께 공부하고 직접 적용해보면서 나에게 필요한, 내가 원하는 기술을 습득할 수 있는 웹 심화 스터디 \uD83D\uDD25\n\n호기롭게 웹 심화 기술에 대해 공부하는 스터디, `호기심스` 입니다 \uD83D\uDCAD',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2024/10/13/d8c5b505-9571-4d2b-9c4e-8370a63f8ebc.jpeg',
      category: '스터디',
    },
    {
      id: 326,
      title: '솝케팝 6기 (YB 대환영 모셔갑니다)',
      contents:
        '✨ SOPT의 아이돌✨ 이 되고 싶다면 솝케팝에 들어오라!\n남녀노소 관계 없이 K-POP을 좋아하는 분들!! 환영합니다 :)\n\n인스타그램에서 더 많은 솝케팝의 발자취를 확인하실 수 있습니다!\ninstagram : @sopt_k_pop\nhttps://instagram.com/sopt_k_pop?igshid=YmMyMTA2M2Y=\n\n궁금한 점은 DM 주세요',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2024/10/06/7a4a1a42-8963-49ac-8610-7a28bb228e28.png',
      category: '스터디',
    },
    {
      id: 314,
      title: '타로 스터디',
      contents:
        '- \uD83C\uDCCF타로를 통해 함께 잠시 쉬어가는 스터디입니다\n- \uD83C\uDCCF취업, 연애, 인간관계 등 다양한 주제를 타로와 함께 일대일, 다대일, 다대다 중 하나를 선택해서 얘기하는 스터디입니다\n- \uD83C\uDCCF스터디장의 타로공부 실습과 도파민을 위해서 진행합니다\n',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2024/10/06/0f091a14-d7cd-49a2-ad0e-989bf99b42f3.jpeg',
      category: '스터디',
    },
    {
      id: 311,
      title: '비주류 모각작 스터디 (회기 위주)',
      contents:
        '1. 모임 성격\n따뜻합니다\n\n2. 모임 개설 배경/목적\n모각작 맨날 강남, 건대, 홍대에서만 하고 아 나는 학교 끝나고 멀어서 가지도 못하는데…\n저도 학교 끝나고 저녁 먹고 모각작 잠시 집 앞에서 땡기고 싶어요.\n저희 집 앞은 비주류예요.\n항상 솝트 사람들이 멀다고 뭐라 해요.\n회기는 왜 오라고 하면 욕만 먹죠?\n우리 집 앞을 모각작 장소로 만들자\n\n3. 모임의 효능\n용기만 조금 내면 멀리 안 나가고 모각작할 수 있어요',
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2024/10/05/8d741d89-94d7-4c5c-a6d4-b0279bffeb4f.png',
      category: '스터디',
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Responsive only='desktop'>
        <DesktopFeedUploadLayout
          header={
            <>
              <BackArrowWrapper onClick={handleQuitUpload}>
                <BackArrow />
              </BackArrowWrapper>
              <Category feedData={feedData} onSaveCategory={handleSaveCategory} isEdit={isEdit} />
              <ButtonContainer>
                <Button type='submit' theme='blue' size='sm' disabled={!checkReadyToUpload()}>
                  올리기
                </Button>
              </ButtonContainer>
            </>
          }
          body={
            <Body>
              {isSopticle ? (
                <InputWrapper>
                  <LinkInput
                    onChange={(e) => {
                      handleSaveSopticleUrl(e);
                      resetLinkError();
                    }}
                    value={feedData.link}
                    isError={isLinkError}
                  />
                  <Callout type='information' hasIcon>
                    내가 직접 작성한 아티클을 SOPT회원들에게 공유해 보세요!
                  </Callout>
                </InputWrapper>
              ) : (
                <InputWrapper>
                  {isQuestion && (
                    <Callout type='information' hasIcon>
                      SOPT회원들에게 나의 고민이나 궁금증을 공유하고 답변을 받아보세요!
                    </Callout>
                  )}
                  {isGroup && (
                    <SelectDesktop>
                      <SelectDesktopTrigger placeholder='어떤 모임의 피드를 작성할까요?' />
                      <SelectDesktopContent meetingList={meetingList} />
                    </SelectDesktop>
                  )}
                  <TitleInput
                    onChange={handleSaveTitle}
                    onKeyDown={handleDesktopKeyPressToContents}
                    value={feedData.title}
                  />
                  <ContentsInput onChange={handleSaveContent} ref={desktopContentsRef} value={feedData.content} />
                  {!(feedData.images.length !== 0 || hasVoteOptions) && (
                    <UsingRules isPreviewOpen={isPreviewOpen} onClose={closeUsingRules} />
                  )}
                </InputWrapper>
              )}
            </Body>
          }
          footer={
            <Footer>
              {!isSopticle && (
                <>
                  {feedData.images.length !== 0 && <ImagePreview images={feedData.images} onRemove={removeImage} />}
                  {feedData.vote && hasVoteOptions && (
                    <VotePreview
                      onOpenVoteModal={onOpenVoteModal}
                      resetVote={resetVote}
                      optionsLength={feedData.vote.voteOptions.length}
                      isMultiple={feedData.vote.isMultiple}
                      isDisable={isEdit}
                    />
                  )}
                </>
              )}

              <TagAndCheckboxWrapper>
                {!isSopticle && (
                  <TagsWrapper>
                    <ImageUploadButton
                      imageLength={feedData.images.length}
                      onClick={handleDesktopClickImageInput}
                      imageInputRef={desktopRef}
                    />
                    {!isGroup && <VoteUploadButton onClick={onOpenVoteModal} isDisabled={!!hasVoteOptions} />}
                    <VoteModal
                      isOpen={isOpenVoteModal}
                      onClose={onCloseVoteModal}
                      onSave={handleSaveVote}
                      options={feedData.vote?.voteOptions ?? ['', '']}
                      isMultiple={feedData.vote?.isMultiple ?? false}
                    />
                  </TagsWrapper>
                )}
                {parentCategory?.hasBlind && (
                  <CheckboxFormItem label='익명'>
                    <Checkbox
                      checked={feedData.isBlindWriter}
                      onChange={(e) => {
                        handleSaveIsBlindWriter(!feedData.isBlindWriter);
                      }}
                      size='medium'
                    />
                  </CheckboxFormItem>
                )}
              </TagAndCheckboxWrapper>
            </Footer>
          }
        />
      </Responsive>
      <Responsive only='mobile'>
        <MobileFeedUploadLayout
          header={
            <>
              <TopHeader>
                <IconLeft color={colors.white} onClick={handleQuitUpload} />
                <Button type='submit' theme='blue' size='sm' disabled={!checkReadyToUpload()}>
                  올리기
                </Button>
              </TopHeader>
              <Category feedData={feedData} onSaveCategory={handleSaveCategory} isEdit={isEdit} />
            </>
          }
          body={
            <Body>
              {isSopticle ? (
                <InputWrapper>
                  <LinkInput
                    onChange={(e) => {
                      handleSaveSopticleUrl(e);
                      resetLinkError();
                    }}
                    value={feedData.link}
                    isError={isLinkError}
                  />
                  <CalloutWrapper>
                    <Callout type='information' hasIcon>
                      내가 직접 작성한 아티클을 SOPT회원들에게 공유해 보세요!
                    </Callout>
                  </CalloutWrapper>
                </InputWrapper>
              ) : (
                <InputWrapper>
                  {isQuestion && (
                    <Callout type='information' hasIcon>
                      SOPT회원들에게 나의 고민이나 궁금증을 공유하고 답변을 받아보세요!
                    </Callout>
                  )}
                  {isGroup && (
                    <SelectMobile
                      isSelectOpen={false}
                      meetingList={meetingList}
                      selectedMeetingInfo={null}
                      onSelectItemClick={() => {
                        // TODO: 모바일에서도 Context API 사용하도록 수정
                      }}
                    />
                  )}
                  <TitleInput
                    onChange={handleSaveTitle}
                    onKeyDown={handleMobileKeyPressToContents}
                    value={feedData.title}
                  />
                  <ContentsInput onChange={handleSaveContent} ref={mobileContentsRef} value={feedData.content} />
                  {!(feedData.images.length !== 0 || hasVoteOptions) && (
                    <UsingRules isPreviewOpen={isPreviewOpen} onClose={closeUsingRules} />
                  )}
                </InputWrapper>
              )}
            </Body>
          }
          footer={
            <Footer>
              {!isSopticle && (
                <>
                  {feedData.images.length !== 0 && <ImagePreview images={feedData.images} onRemove={removeImage} />}
                  {feedData.vote && hasVoteOptions && (
                    <VotePreview
                      onOpenVoteModal={onOpenVoteModal}
                      resetVote={resetVote}
                      optionsLength={feedData.vote.voteOptions.length}
                      isMultiple={feedData.vote.isMultiple}
                      isDisable={isEdit}
                    />
                  )}
                </>
              )}
              <TagAndCheckboxWrapper>
                {!isSopticle && (
                  <TagsWrapper>
                    <ImageUploadButton
                      imageLength={feedData.images.length}
                      onClick={handleMobileClickImageInput}
                      imageInputRef={mobileRef}
                    />
                    {!isGroup && <VoteUploadButton onClick={onOpenVoteModal} isDisabled={!!hasVoteOptions} />}
                    <VoteModal
                      isOpen={isOpenVoteModal}
                      onClose={onCloseVoteModal}
                      onSave={handleSaveVote}
                      options={feedData.vote?.voteOptions ?? ['', '']}
                      isMultiple={feedData.vote?.isMultiple ?? false}
                    />
                  </TagsWrapper>
                )}
                {parentCategory?.hasBlind && (
                  <CheckboxFormItem label='익명'>
                    <Checkbox
                      checked={feedData.isBlindWriter}
                      onChange={(e) => handleSaveIsBlindWriter(!feedData.isBlindWriter)}
                      size='medium'
                    />
                  </CheckboxFormItem>
                )}
              </TagAndCheckboxWrapper>
            </Footer>
          }
        />
      </Responsive>
    </form>
  );
}

const Body = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 16px;
`;

const InputWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-width: 608px;
  max-width: 780px;
  min-height: calc(100vh - 72px - 24px - var(--footer-height, 50px));

  @media ${MOBILE_MEDIA_QUERY} {
    min-width: 100%;
    min-height: calc(100vh - 136px - var(--footer-height, 50px));
  }
`;

const BackArrowWrapper = styled.div`
  position: absolute;
  left: 0;
  cursor: pointer;
  padding-left: 32px;
`;

const IconLeft = styled(IconChevronLeft)`
  width: 28px;
  height: 28px;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  gap: 12px;
  padding-right: 32px;
`;

const TopHeader = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  background-color: ${colors.gray950};
  padding: 8px 16px;
  width: 100%;
  height: 52px;
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Footer = styled.div`
  width: 100%;
`;

const TagAndCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const CalloutWrapper = styled.div`
  margin-bottom: 12px;
`;
