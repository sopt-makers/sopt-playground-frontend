import { DEFAULT_LINK, DEFAULT_LINK_KEY } from './constants';
import { Link } from '@/components/project/upload/LinkForm/constants';
import { useRef, useState, useCallback } from 'react';

interface Links {
  [linkKey: number]: Link;
}

const useLinkForm = () => {
  const [links, setLinks] = useState<Links>({
    [DEFAULT_LINK.key]: DEFAULT_LINK,
  });
  const _links = Object.values(links);
  const linkKey = useRef<number>(DEFAULT_LINK_KEY + 1);

  const onCreate = useCallback(() => {
    const _linkKey = linkKey.current;
    const defaultLink: Link = {
      ...DEFAULT_LINK,
      key: _linkKey,
    };
    setLinks((links) => ({
      ...links,
      [_linkKey]: defaultLink,
    }));
    linkKey.current += 1;
  }, []);

  const onDelete = useCallback(
    (linkKey: number) => {
      setLinks((links) => {
        const _links: Link[] = Object.values(links).filter((link) => link.key !== linkKey);
        return _links.reduce(
          (acc, cur) => ({
            ...acc,
            [cur.key]: cur,
          }),
          {},
        );
      });
    },
    [setLinks],
  );

  const onChange = useCallback((link: Link) => {
    setLinks((links) => ({
      ...links,
      [link.key]: link,
    }));
  }, []);

  return { links: _links, onCreate, onDelete, onChange };
};

export default useLinkForm;
