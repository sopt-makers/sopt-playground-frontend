import { colors } from '@sopt-makers/colors';

export const parseMentionsToHTML = (text: string) => {
  const mentionRegex = /@([^\[\]\s@]+)\[(\d+)\]/g;
  return text.replace(
    mentionRegex,
    (_, name, id) => `<span data-id="${id}" contenteditable="false" style="color: ${colors.success}">@${name}</span>`,
  );
};

export const parseHTMLToMentions = (html: string) => {
  const mentionSpanRegex = /<span[^>]*data-id="(\d+)"[^>]*>@([^<]+)<\/span>/g;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.innerHTML.replace(mentionSpanRegex, (_, id, name) => `@${name}[${id}]`).replace(/<[^>]+>/g, '');
};
