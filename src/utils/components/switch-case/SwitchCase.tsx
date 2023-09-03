import { useState } from 'react';

interface Props<T extends string | number> {
  value: T;
  caseBy: Partial<Record<T, JSX.Element>>;
  default?: JSX.Element | null;
}

const SwitchCase = <T extends string | number>({ value, caseBy, default: defaultComponent = null }: Props<T>) => {
  return caseBy[value] ?? defaultComponent;
};

export default SwitchCase;

type AA = 'isLoading' | 'isError' | 'isSuccess';

const Home = () => {
  const [status, setStatus] = useState<AA>('isLoading');

  return (
    <SwitchCase
      value={status}
      caseBy={{
        isError: <h1>error</h1>,
        isLoading: <h1>loading</h1>,
        isSuccess: <h1>success</h1>,
      }}
    />
  );
};
