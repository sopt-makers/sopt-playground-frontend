export const parseTextToLink = (content: string) => {
  const urlRegex = /(https?:\/\/[^\s\]\)]+)|(www\.[^\s\]\)]+)/g;
  const fragmentList = content.split(urlRegex);
  return fragmentList.map((fragment, index) => {
    if (urlRegex.test(fragment)) {
      const url = fragment.startsWith('https') ? fragment : `https://${fragment}`;
      return (
        <a key={index} href={url} target='_blank' rel='noopener noreferrer'>
          {fragment}
        </a>
      );
    }
    return fragment;
  });
};
