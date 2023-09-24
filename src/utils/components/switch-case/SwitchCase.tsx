interface Props<T extends string | number> {
  value: T;
  caseBy: Partial<Record<T, JSX.Element | null>>;
  default?: JSX.Element | null;
}

export const SwitchCase = <T extends string | number>({
  value,
  caseBy,
  default: defaultComponent = null,
}: Props<T>) => {
  return caseBy[value] ?? defaultComponent;
};
