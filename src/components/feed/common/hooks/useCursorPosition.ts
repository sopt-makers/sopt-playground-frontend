import { useRef } from 'react';

const getNodePath = (root: Node, target: Node): number[] => {
  const path: number[] = [];
  for (let node = target; node && node !== root; node = node.parentNode!) {
    // 부모를 통해 루트까지 접근
    const parent = node.parentNode;
    if (!parent) break;
    path.unshift(Array.prototype.indexOf.call(parent.childNodes, node)); // 부모 -> 자식 순서대로 위치 저장
  }
  return path;
};

const getNodeFromPath = (root: Node, path: number[]): Node | null =>
  path.reduce<Node | null>((node, idx) => node?.childNodes[idx] || null, root);

export const useCursorPosition = (editableRef: React.RefObject<HTMLDivElement>) => {
  const cursorInfoRef = useRef<{ path: number[]; offset: number } | null>(null);

  const saveCursor = () => {
    const editableDiv = editableRef.current;
    const selection = window.getSelection();
    if (!editableDiv || !selection?.rangeCount) return;

    const range = selection.getRangeAt(0); // 커서 위치 가져오기
    cursorInfoRef.current = {
      path: getNodePath(editableDiv, range.startContainer), // 커서가 있는 노드
      offset: range.startOffset, // 노드에서의 위치
    };
  };

  const restoreCursor = () => {
    const editableDiv = editableRef.current;
    const selection = window.getSelection();
    if (!editableDiv || !selection || !cursorInfoRef.current) return;

    const node = getNodeFromPath(editableDiv, cursorInfoRef.current.path);
    if (!node) return;

    const range = document.createRange();
    const offset = Math.min(cursorInfoRef.current.offset, node.textContent?.length ?? 0); // 텍스트보다 커서가 뒤에 올 수 없도록
    // 저장된 위치로 커서 이동
    range.setStart(node, offset);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  return { saveCursor, restoreCursor, cursorInfoRef };
};
