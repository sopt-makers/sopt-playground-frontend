import styled from '@emotion/styled';
import { Slot } from '@radix-ui/react-slot';
import {
  Children,
  createContext,
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ReactModalSheet from 'react-modal-sheet';

import IconCheck from '@/public/icons/icon-filter-check.svg';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface Option<T> {
  value: T;
  label: ReactNode;
}

interface MemberListFilterContextValue<T = string> {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  onChangePlaceholder: (placeholder?: string) => void;
}

const MemberListFilterContext = createContext<MemberListFilterContextValue>(
  new Proxy({} as MemberListFilterContextValue, {
    get() {
      throw new Error('MemberListFilterProvider가 필요합니다.');
    },
  }),
);

interface MemberListFilterProps {
  trigger: (placeholder: string) => ReactNode;
}

const MemberListFilterRoot: FC<PropsWithChildren<MemberListFilterProps>> = ({ children }: { children?: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<MemberListFilterContextValue['value']>();
  const [placeholder, setPlaceholder] = useState<string>();

  const context = useMemo(() => {
    return {
      isOpen,
      onOpen: () => setIsOpen(true),
      onClose: () => setIsOpen(false),
      value,
      onChange: setValue,
      placeholder,
      onChangePlaceholder: setPlaceholder,
    };
  }, [isOpen, value, placeholder]);

  return (
    <MemberListFilterContext.Provider value={context}>
      {}
      {children}
    </MemberListFilterContext.Provider>
  );
};

interface SheetProps {
  value: MemberListFilterContextValue['value'];
  onChange: MemberListFilterContextValue['onChange'];
  options: Option<string>[];
  defaultOption?: Option<string>;
}
const Sheet: FC<PropsWithChildren<SheetProps>> = ({ value, onChange, defaultOption, options }) => {
  const { isOpen, onClose } = useContext(MemberListFilterContext);

  useEffect(() => {
    if (value) {
      onChange(value);
    }
  }, [value, onChange]);

  return (
    <CustomSheet isOpen={isOpen} onClose={onClose} detent='content-height'>
      <ReactModalSheet.Container>
        <ReactModalSheet.Header />
        <ReactModalSheet.Content>
          {defaultOption && <Item value={defaultOption.value}>{defaultOption.label}</Item>}
          {options.map((option) => (
            <Item key={option.value} value={option.value}>
              <>{option.label}</>
            </Item>
          ))}
        </ReactModalSheet.Content>
      </ReactModalSheet.Container>
      <ReactModalSheet.Backdrop onTap={onClose} />
    </CustomSheet>
  );
};

const CustomSheet = styled(ReactModalSheet)`
  .react-modal-sheet-container {
    background-color: ${colors.black60} !important;
  }

  .react-modal-sheet-header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: ${colors.black60};
  }

  .react-modal-sheet-drag-indicator {
    width: 48px !important;
  }

  .react-modal-sheet-content {
    background-color: ${colors.black60};
    padding: 16px 24px 24px;
  }
`;

interface ItemProps {
  value: string;
}
const Item: FC<PropsWithChildren<ItemProps>> = ({ value: valueProp, children }) => {
  const { value, onChange, onClose, onChangePlaceholder } = useContext(MemberListFilterContext);
  const isSelected = valueProp === value;

  const handleSelect = () => {
    onChange(valueProp);
    const childrenLabel = `${(Children.only(children) as ReactElement | undefined)?.props.children}` ?? '';
    onChangePlaceholder(childrenLabel);
    onClose();
  };

  return (
    <StyledItem onClick={handleSelect}>
      {children}
      {isSelected && <IconCheck />}
    </StyledItem>
  );
};

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  ${textStyles.SUIT_16_SB};
`;

interface TriggerProps {
  render: (placeholder?: string) => ReactNode;
}
const Trigger: FC<TriggerProps> = ({ ...props }) => {
  const { placeholder, onOpen } = useContext(MemberListFilterContext);

  return (
    <Slot onClick={onOpen} {...props}>
      {props.render(placeholder)}
    </Slot>
  );
};

// TODO: MemberListFilter에 통합해서, Select, Sheet, Trigger 요걸 세개로 내보내는 구조도 괜찮겠다!
// example => MemberListFilter.Select / MemberListFilter.Sheet / MemberListFilter.Trigger
const MemberListFilterSheet = Object.assign(MemberListFilterRoot, {
  Sheet,
  Trigger,
});

export default MemberListFilterSheet;
