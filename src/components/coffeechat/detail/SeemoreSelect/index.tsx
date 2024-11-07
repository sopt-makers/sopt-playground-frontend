import styled from '@emotion/styled';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconDotsVertical, IconEdit, IconTrash } from '@sopt-makers/icons';
import { DialogOptionType, useDialog, useToast } from '@sopt-makers/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { useState } from 'react';

import { deleteCoffeechat } from '@/api/endpoint/coffeechat/deleteCoffeechat';
import Responsive from '@/components/common/Responsive';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const DropdownPortal = dynamic<DropdownMenu.DropdownMenuPortalProps>(
  () => import('@radix-ui/react-dropdown-menu').then((r) => r.DropdownMenuPortal),
  {
    ssr: false,
  },
);

const DialogPortal = dynamic<Dialog.DialogPortalProps>(
  () => import('@radix-ui/react-dialog').then((r) => r.DialogPortal),
  {
    ssr: false,
  },
);

interface SeemoreSelectProp {
  memberId: string;
}

interface SeemoreContentProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function SeemoreSelect({ memberId }: SeemoreSelectProp) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { open: toastOpen } = useToast();
  const { open } = useDialog();
  const option: DialogOptionType = {
    title: '커피챗을 삭제하시겠습니까?',
    description: '새 커피챗을 다시 열 수 있지만, 작성했던 내용은 저장되지 않아요.',
    type: 'danger',
    typeOptions: {
      cancelButtonText: '취소',
      approveButtonText: '삭제하기',
      buttonFunction: () => handleDelete(),
    },
  };
  const { logSubmitEvent } = useEventLogger();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteCoffeechat.request(),
  });

  const onEdit = () => {
    router.push(playgroundLink.coffeechatEdit(memberId));
  };

  const handleDelete = async () => {
    mutate(undefined, {
      onSuccess: async () => {
        try {
          logSubmitEvent('coffeechatDelete');

          await Promise.all([
            queryClient.refetchQueries({ queryKey: ['getRecentCoffeeChat'] }),
            queryClient.refetchQueries({ queryKey: ['getMembersCoffeeChat'] }),
            queryClient.invalidateQueries({ queryKey: ['getMemberOfMe'] }),
          ]);

          await toastOpen({ icon: 'success', content: '커피챗이 삭제되었어요. 다음에 또 만나요!' });
          await router.push(playgroundLink.coffeechat());
        } catch (error) {
          console.error('쿼리 무효화 실패:', error);
          await toastOpen({ icon: 'success', content: '커피챗이 삭제되었어요. 다음에 또 만나요!' });
          await router.push(playgroundLink.coffeechat());
        }
      },
    });
  };

  const onDelete = () => {
    open(option);
  };

  return (
    <>
      <Responsive only='desktop'>
        <DropdownSeemore onEdit={onEdit} onDelete={onDelete} />
      </Responsive>
      <Responsive only='mobile'>
        <BottomSheetSeemore onEdit={onEdit} onDelete={onDelete} />
      </Responsive>
    </>
  );
}

const DropdownSeemore = ({ onEdit, onDelete }: SeemoreContentProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild>
        <DotsVerticalIcon />
      </DropdownMenu.Trigger>
      <DropdownPortal>
        <DropdownMenu.Content sideOffset={10} align='end' side='bottom' asChild>
          <StyledContent>
            <StyledItem onClick={onEdit}>
              <EditIcon />
              <>수정</>
            </StyledItem>
            <StyledItem onClick={onDelete} isTrash>
              <TrashIcon />
              <>삭제</>
            </StyledItem>
          </StyledContent>
        </DropdownMenu.Content>
      </DropdownPortal>
    </DropdownMenu.Root>
  );
};

const BottomSheetSeemore = ({ onEdit, onDelete }: SeemoreContentProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
      <Dialog.Trigger asChild>
        <DotsVerticalIcon />
      </Dialog.Trigger>
      <DialogPortal>
        <Dialog.Content asChild>
          <StyledContent>
            <StyledContentItem
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
            >
              <EditIcon />
              <>수정</>
            </StyledContentItem>
            <StyledContentItem
              onClick={() => {
                setOpen(false);
                onDelete();
              }}
              isTrash
            >
              <TrashIcon />
              <>삭제</>
            </StyledContentItem>
          </StyledContent>
        </Dialog.Content>
        <Overlay />
      </DialogPortal>
    </Dialog.Root>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 101;
  background-color: ${colors.backgroundDimmed};
  animation: overlay-show 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes overlay-show {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 13px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    position: fixed;
    right: 16px;
    bottom: 42px;
    left: 16px;
    z-index: 102;
    border-radius: 20px;
    padding: 12px 8px;
    width: calc(100% - 32px);
  }
`;

const StyledItem = styled(DropdownMenu.Item)<{ isTrash?: boolean }>`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px 12px;
  color: ${({ isTrash }) => isTrash && colors.red400};
  ${fonts.BODY_16_M};
`;

const StyledContentItem = styled.div<{ isTrash?: boolean }>`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  color: ${({ isTrash }) => isTrash && colors.red400};

  ${fonts.BODY_14_M};
`;

const EditIcon = styled(IconEdit)`
  width: 16px;
  height: 16px;
`;

const TrashIcon = styled(IconTrash)`
  width: 16px;
  height: 16px;
  color: ${colors.red400};
`;

const DotsVerticalIcon = styled(IconDotsVertical)`
  margin-top: 12px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;
