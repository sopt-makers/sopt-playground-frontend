import { colors } from '@sopt-makers/colors';

const mentionRegex = /@([^\[\]\s@]+)\[(\d+)\]/g;
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
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = mentionRegex.exec(text)) !== null) {
    const [full, name, id] = match;

    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }

    // span 태그로 변경
    result.push(
      <span key={`${name}-${id}-${match.index}`} data-id={id} contentEditable={false} style={{ color: colors.success }}>
        @{name}
      </span>,
    );

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
};
