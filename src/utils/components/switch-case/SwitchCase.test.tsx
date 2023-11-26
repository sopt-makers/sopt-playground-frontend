import { render } from '@testing-library/react';

import { SwitchCase } from './SwitchCase';

describe('SwitchCase', () => {
  function describeGeneration(generation: number) {
    return render(
      <SwitchCase
        value={generation}
        caseBy={{
          27: <>{'27기엔 웹파트를 만들었어요.'}</>,
          28: <>{'28기엔 파트원으로 홛동했어요.'}</>,
        }}
        default={<>{'26기엔 디자인도 했고, 지금은 PM도 할 줄 알아요.'}</>}
      />,
    );
  }
  it(`'27' 을 입력하면, 27기의 설명이 나타나요.`, () => {
    const generation = describeGeneration(27);

    expect(generation.getByText('27기엔 웹파트를 만들었어요.')).toBeInTheDocument();
  });

  it(`28을 입력하면, 27기의 설명은 나타나면 안돼요.`, () => {
    const generation = describeGeneration(28);

    expect(generation.getByText('28기엔 파트원으로 홛동했어요.')).toBeInTheDocument();
    expect(generation.queryByText('27기엔 웹파트를 만들었어요.')).not.toBeInTheDocument();
  });

  it(`value의 값을 만족하지 못하는 경우엔 default 값이 렌더링 돼요.`, () => {
    const generation = describeGeneration(26);

    expect(generation.queryByText('27기엔 웹파트를 만들었어요.')).not.toBeInTheDocument();
    expect(generation.queryByText('28기엔 파트원으로 홛동했어요.')).not.toBeInTheDocument();
    expect(generation.getByText('26기엔 디자인도 했고, 지금은 PM도 할 줄 알아요.')).toBeInTheDocument();
  });
});
