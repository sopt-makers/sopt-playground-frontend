import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';

import { ANONYMOUS_MEMBER_ID } from '@/components/feed/constants';
import { playgroundLink } from '@/constants/links';

// -1은 익명 멤버 id를 의미
export const mentionRegex = /@([^\[\]@]+?)\[((?:-1|\d+))\]/g;
const mentionSpanRegex = /<span[^>]*data-id="((?:-1|\d+))"[^>]*>@([^<]+)<\/span>/g;
export const anonymouseMentionRegex = /@([^\[\]@]+?)\[((?:-1))\]/g;

export const extractAnonymousMentionNames = (text: string) => {
  const anonymousNicknameList: string[] = [];
  let match: RegExpExecArray | null;

  anonymouseMentionRegex.lastIndex = 0;

  while ((match = anonymouseMentionRegex.exec(text)) !== null) {
    const anonymousNickname = match[1]?.trim();
    if (anonymousNickname) {
      anonymousNicknameList.push(anonymousNickname);
    }
  }

  return anonymousNicknameList;
};

export const parseMentionsToHTML = (text: string) => {
  return text
    .replace(
      mentionRegex,
      (_, name, id) => `<span data-id="${id}" contenteditable="false" style="color: ${colors.success}">@${name}</span>`,
    )
    .replace(/\n/g, '<br>');
};

export const parseHTMLToMentions = (html: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.innerHTML
    .replace(mentionSpanRegex, (_, id, name) => `@${name}[${id}]`)
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '');
};

export const parseMentionsToJSX = (text: string, router: ReturnType<typeof useRouter>) => {
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = mentionRegex.exec(text)) !== null) {
    const [full, name, id] = match;

    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index).replace(/&nbsp;/g, ' '));
    }

    result.push(
      <button
        key={`${name}-${id}-${match.index}`}
        data-id={id}
        contentEditable={false}
        style={{ color: colors.success, cursor: id !== String(ANONYMOUS_MEMBER_ID) ? 'pointer' : 'default' }}
        onClick={() => (id !== String(ANONYMOUS_MEMBER_ID) ? router.push(playgroundLink.memberDetail(id)) : null)}
      >
        @{name}
      </button>,
    );

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex).replace(/&nbsp;/g, ' '));
  }

  return result;
};
