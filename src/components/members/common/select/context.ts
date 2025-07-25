import { createContext, ReactNode, useContext } from 'react';
type Size = 'medium' | 'small';

export type SelectContextValue = {
  value?: string;
  label?: ReactNode;
  onChangeLabel: (label?: ReactNode) => void;
  size?: Size;
};

export const SelectContext = createContext<SelectContextValue>({
  value: undefined,
  label: undefined,
  onChangeLabel: () => undefined,
  size: undefined,
});

export function useSelectContext() {
  const context = useContext(SelectContext);
  if (context == null) {
    throw new Error('<select/> 컴포넌트와 관련된 컴포넌트를 사용해주세요');
  }
  return context;
}
