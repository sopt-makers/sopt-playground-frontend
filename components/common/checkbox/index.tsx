// https://dev.to/tomdohnal/custom-checkbox-in-react-animated-and-accessible-3jk9
import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes, useCallback, useState } from 'react';
import { colors } from '@/styles/colors';
import { animated, useSpring, config, useSpringRef, useChain } from 'react-spring';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
}

// TODO: checked 로 확장하기
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ checked, children, ...props }, ref) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const onChange = useCallback(() => {
    setIsChecked((isChecked) => !isChecked);
  }, []);

  const [checkmarkLength, setCheckmarkLength] = useState<number>();
  const checkboxAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    config: config.gentle,
    ref: checkboxAnimationRef,
  });
  const checkmarkAnimationRef = useSpringRef();
  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef,
  });

  useChain(
    isChecked ? [checkboxAnimationRef, checkmarkAnimationRef] : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1],
  );
  const checkboxStyle = useSpring({
    backgroundColor: isChecked ? colors.purple100 : colors.black80,
    borderColor: isChecked ? colors.purple80 : colors.gray100,
  });

  return (
    <StyledLabel htmlFor='check'>
      <input id='check' ref={ref} type='checkbox' onChange={onChange} {...props} />
      <StyledCheckbox style={checkboxStyle}>
        <CheckIcon
          width='14'
          height='9'
          viewBox='0 0 17 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={checkboxAnimationStyle}
        >
          <animated.path
            stroke='#F0E9FF'
            strokeWidth='2'
            d='M1 4.5L5 9L14 1'
            ref={(ref) => {
              if (ref) {
                setCheckmarkLength(ref.getTotalLength());
              }
            }}
            strokeDasharray={checkmarkLength}
            strokeDashoffset={checkmarkAnimationStyle.x}
          />
        </CheckIcon>
      </StyledCheckbox>
    </StyledLabel>
  );
});

export default Checkbox;

const StyledLabel = styled(animated.label)`
  input[type='checkbox'] {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
  }
`;

const StyledCheckbox = styled(animated.span)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.gray100};
  border-radius: 4px;
  width: 22.5px;
  height: 22.5px;
`;

const CheckIcon = styled(animated.svg)``;
