import Input, { InputProps } from '@/components/common/Input';
import React, { FC, useEffect, useState } from 'react';

const DATE_REGEX = /^\d{4}.(0[1-9]|1[0-2])/;
const YEAR_LENGTH = 4;

interface DateInputProps extends InputProps {}

const DateInput: FC<DateInputProps> = () => {
  const [value, setValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _value = e.target.value;
    if (/^\d{4}/.test(_value) && _value.length === YEAR_LENGTH) {
      setValue(`${e.target.value}.`);
    } else if (_value.match(DATE_REGEX)) {
      setValue(value.match(DATE_REGEX)?.[0] ?? _value);
    } else {
      setValue(e.target.value);
    }
  };

  return <Input placeholder='YYYY.MM' value={value} onChange={onChange} />;
};

export default DateInput;

/**
 String.prototype.toDateFmt = function () {
   var PATTERN;
   var rep_str;
   var str = this.removeFmt();
 
   if (!this.isDate()) return '';
 
   if (str.length == 8) {
     PATTERN = /^(\d{4})(\d{1,2})(\d{1,2})$/g;
     rep_str = _dateFmt.replace('yyyy', '$1').replace('mm', '$2').replace('dd', '$3');
   } else if (str.length == 6) {
     PATTERN = /^(\d{4})(\d{1,2})$/g;
     rep_str = _dateFmt.substr(0, 7).replace('yyyy', '$1').replace('mm', '$2');
   } else {
     return '';
   }
   return str.replace(PATTERN, rep_str);
 };
 * 날짜,금액,숫자 형식에서 특수문자(-.,/:)들 제거
 * @example "2012/12/12".removeFmt()
 */
const removeFmt = (value: string) => {
  return value.replace(/[-|.|,|:|\/]/gi, '');
};

// react-hook-form + yup 이용해서 validation
