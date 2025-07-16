import { playgroundLink } from '@/constants/links';
import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';

export const mentionRegex = /@([^\[\]\s@]+)\[(\d+)\]/g;
const mentionSpanRegex = /<span[^>]*data-id="(\d+)"[^>]*>@([^<]+)<\/span>/g;

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

export const parseMentionsToJSX = (text: string) => {
  const router = useRouter();
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
        style={{ color: colors.success }}
        onClick={() => router.push(playgroundLink.memberDetail(id))}
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
