interface MemberSelectOptionsProps {
  options: string[];
}

export default function MemberSelectOptions({ options }: MemberSelectOptionsProps) {
  return (
    <>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </>
  );
}
