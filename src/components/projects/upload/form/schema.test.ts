import { dateStringSchema } from '@/components/projects/upload/form/schema';

describe('projectFormSchema', () => {
  test('dateStringSchema', () => {
    expect(dateStringSchema.safeParse('2010-12-03').success).toBeTruthy();
  });
});

export {};
