import styled from '@emotion/styled';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconDotsVertical, IconEdit, IconTrash } from '@sopt-makers/icons';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { useState } from 'react';

import Responsive from '@/components/common/Responsive';
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

export default function SeemoreSelect({ memberId }: SeemoreSelectProp) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(playgroundLink.coffeechatEdit(memberId));
  };

  const handleDelete = () => {
    router.push(playgroundLink.coffeechat());
  };

  return (
    <>
      <Responsive only='desktop'>
        <DropdownSeemore />
      </Responsive>
      <Responsive only='mobile'>
        <BottomSheetSeemore />
      </Responsive>
    </>
  );
}

const DropdownSeemore = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <DotsVerticalIcon />
      </DropdownMenu.Trigger>
      <DropdownPortal>
        <DropdownMenu.Content sideOffset={10} align='end' side='bottom' asChild>
          <StyledContent>
            <StyledItem
              onClick={() => {
                //
              }}
            >
              <EditIcon />
              <>수정</>
            </StyledItem>
            <StyledItem
              onClick={() => {
                //
              }}
            >
              <TrashIcon />
              <>삭제</>
            </StyledItem>
          </StyledContent>
        </DropdownMenu.Content>
      </DropdownPortal>
    </DropdownMenu.Root>
  );
};

const BottomSheetSeemore = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <DotsVerticalIcon />
      </Dialog.Trigger>
      <DialogPortal>
        <Dialog.Overlay asChild>
          <Overlay />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <StyledContent>
            <StyledContentItem
              onClick={() => {
                //
                setOpen(false);
              }}
            >
              <EditIcon />
              <>수정</>
            </StyledContentItem>
            <StyledContentItem
              onClick={() => {
                //
                setOpen(false);
              }}
            >
              <TrashIcon />
              <>삭제</>
            </StyledContentItem>
          </StyledContent>
        </Dialog.Content>
      </DialogPortal>
    </Dialog.Root>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 101;
  background-color: rgb(0 0 0 / 70%);
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

const StyledItem = styled(DropdownMenu.Item)`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px 12px;
  ${fonts.BODY_16_M};
`;

const StyledContentItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  ${fonts.BODY_14_M};
`;

const EditIcon = styled(IconEdit)`
  width: 24px;
  height: 24px;
`;

const TrashIcon = styled(IconTrash)`
  width: 24px;
  height: 24px;
  color: ${colors.red400};
`;

const DotsVerticalIcon = styled(IconDotsVertical)`
  margin-top: 12px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;
