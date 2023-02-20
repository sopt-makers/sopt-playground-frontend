import * as z from 'zod';

const DATE_PATTERN = /^\d{4}.(0[1-9]|1[0-2])/g;

describe('projectUploadSchema', () => {
  test('', () => {
    expect(
      z.string().regex(DATE_PATTERN, '날짜 형식에 맞게 입력해주세요.').safeParse('2010-12-03').success,
    ).toBeTruthy();
  });
});

export {};
