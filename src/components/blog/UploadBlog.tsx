import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Button, Callout, Chip, SelectV2, TextField } from '@sopt-makers/ui';
import { Spacing } from '@toss/emotion-utils';
import { FC, FormEvent, useState } from 'react';

import { useGetMemberProperty } from '@/api/endpoint/members/getMemberProperty';
import BottomSheetSelect from '@/components/blog/BottomSheetSelect';
import { ACTIVITY_OPTIONS, BLOG_OPTIONS, RECRUIT_OPTIONS } from '@/components/blog/constants';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface UploadBlogProps {
  state: 'idle' | 'pending' | 'error' | 'success';
  errorMessage?: string;
  onSubmit: (url: string) => void;
}

const UploadBlog: FC<UploadBlogProps> = ({ state, errorMessage, onSubmit }) => {
  const [url, setUrl] = useState('');
  const [selectedBlogOption, setSelectedBlogOption] = useState<'activity' | 'recruit' | ''>('');
  const [selectedRecruitOption, setSelectedRecruitOption] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<number>();
  const [selectedPart, setSelectedPart] = useState('');

  const { data: property } = useGetMemberProperty();

  const toggleActivity = (value: string) => {
    setSelectedActivities((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit(url);
  }

  return (
    <>
      <Container>
        <TitleBox>
          <Title>SOPT 공식 홈페이지에{'\n'} 활동후기 올리기</Title>
        </TitleBox>
        <Callout
          buttonLabel='공식 홈페이지 바로가기'
          hasIcon
          type='information'
          onClick={() => window.open('https://www.sopt.org/blog', '_blank')}
        >
          작성하신 활동후기는 SOPT 공식 홈페이지에 업로드 돼요. SOPT 예비 지원자들에게 인사이트를 나누어보세요.
        </Callout>
        <Form onSubmit={handleSubmit}>
          <section>
            <StyledInput
              labelText='후기글 링크'
              descriptionText='한번 업로드한 링크는 삭제하기 어려워요. 신중하게 업로드해주세요.'
              required
              placeholder='ex. http://soptmakers.com'
              disabled={state === 'pending'}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              isError={state === 'error'}
              errorMessage={errorMessage}
            />
          </section>
          <section>
            <Label>
              활동 기수 및 파트 선택
              <Text typography='SUIT_14_SB' color={colors.secondary}>
                *
              </Text>
            </Label>
            <Text typography='SUIT_12_SB' color={colors.gray300}>
              어떤 활동에 대한 후기인지 모두 선택해주세요.
            </Text>
            <SelectWrapper>
              <Responsive only='desktop'>
                <SelectV2.Root
                  type='text'
                  onChange={(value) => {
                    setSelectedGeneration(Number(value));
                  }}
                >
                  <SelectV2.Trigger>
                    <StyledSelectTrigger placeholder='기수' />
                  </SelectV2.Trigger>
                  <SelectV2.Menu>
                    {property?.generation.map((option) => (
                      <SelectV2.MenuItem key={option} option={{ value: option, label: `${option}기` }} />
                    ))}
                  </SelectV2.Menu>
                </SelectV2.Root>
              </Responsive>
              <Responsive only='mobile'>
                <BottomSheetSelect
                  placeholder='기수'
                  options={
                    property?.generation.map((option) => ({
                      value: `${option}`,
                      label: `${option}기`,
                    })) as { value: string; label: string }[]
                  }
                  value={selectedGeneration?.toString() || ''}
                  onSelect={(option) => {
                    setSelectedGeneration(Number(option.value));
                  }}
                />
              </Responsive>
              <Responsive only='desktop'>
                <SelectV2.Root<string> type='text' onChange={(value) => setSelectedPart(value)}>
                  <SelectV2.Trigger>
                    <StyledSelectTrigger placeholder='파트' />
                  </SelectV2.Trigger>
                  <SelectV2.Menu>
                    {property?.part.map((option) => (
                      <SelectV2.MenuItem key={option} option={{ value: option, label: option }} />
                    ))}
                  </SelectV2.Menu>
                </SelectV2.Root>
              </Responsive>
              <Responsive only='mobile'>
                <BottomSheetSelect
                  placeholder='파트'
                  value={selectedPart}
                  options={
                    property?.part.map((option) => ({
                      value: option,
                      label: option,
                    })) as { value: string; label: string }[]
                  }
                  onSelect={(option) => {
                    setSelectedPart(option.value);
                  }}
                />
              </Responsive>
            </SelectWrapper>
          </section>
          <section>
            <Label>
              유형 선택
              <Text typography='SUIT_14_SB' color={colors.secondary}>
                *
              </Text>
            </Label>
            <SelectWrapper>
              <Responsive only='desktop'>
                <SelectV2.Root<'activity' | 'recruit' | ''>
                  type='text'
                  onChange={(value) => {
                    setSelectedBlogOption(value);
                    if (value === 'recruit' && selectedActivities !== null) setSelectedActivities([]);
                    if (value === 'activity' && selectedRecruitOption !== '') setSelectedRecruitOption('');
                  }}
                >
                  <SelectV2.Trigger>
                    <StyledSelectTrigger placeholder='후기 유형 선택' />
                  </SelectV2.Trigger>
                  <SelectV2.Menu>
                    {BLOG_OPTIONS.map((option) => (
                      <SelectV2.MenuItem key={option.value} option={option} />
                    ))}
                  </SelectV2.Menu>
                </SelectV2.Root>
              </Responsive>
              <Responsive only='mobile'>
                <BottomSheetSelect
                  placeholder='후기 유형 선택'
                  options={BLOG_OPTIONS}
                  value={selectedBlogOption}
                  onSelect={(option) => {
                    setSelectedBlogOption(option.value as 'activity' | 'recruit');
                    if (option.value === 'recruit') {
                      setSelectedActivities([]);
                    }
                  }}
                />
              </Responsive>
              {selectedBlogOption === 'recruit' && (
                <>
                  <Responsive only='desktop'>
                    <SelectV2.Root<string> type='text' onChange={(value) => setSelectedRecruitOption(value)}>
                      <SelectV2.Trigger>
                        <StyledSelectTrigger placeholder='전형 선택' />
                      </SelectV2.Trigger>
                      <SelectV2.Menu>
                        {RECRUIT_OPTIONS.map((option) => (
                          <SelectV2.MenuItem key={option.value} option={option} />
                        ))}
                      </SelectV2.Menu>
                    </SelectV2.Root>
                  </Responsive>
                  <Responsive only='mobile'>
                    <BottomSheetSelect
                      placeholder='후기 유형 선택'
                      value={selectedRecruitOption}
                      options={RECRUIT_OPTIONS}
                      onSelect={(option) => {
                        setSelectedRecruitOption(option.value);
                      }}
                    />
                  </Responsive>
                </>
              )}
            </SelectWrapper>
          </section>
          {selectedBlogOption === 'activity' && (
            <section>
              <Label>
                세부 활동 선택
                <Text typography='SUIT_14_SB' color={colors.secondary}>
                  *
                </Text>
              </Label>
              <Text typography='SUIT_12_SB' color={colors.gray300}>
                어떤 활동에 대한 후기인지 모두 선택해주세요.
              </Text>
              <ChipWrapper>
                {ACTIVITY_OPTIONS.map((option) => (
                  <Chip
                    key={option.value}
                    active={selectedActivities.includes(option.value)}
                    onClick={() => toggleActivity(option.value)}
                  >
                    {option.label}
                  </Chip>
                ))}
              </ChipWrapper>
              <Spacing size={40} />
            </section>
          )}
          <Button
            type='submit'
            size='lg'
            disabled={
              !url ||
              (selectedBlogOption === 'activity' && selectedActivities.length === 0) ||
              (selectedBlogOption === 'recruit' && selectedRecruitOption === '')
            }
          >
            활동후기 업로드하기
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UploadBlog;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;

  & > :first-child {
    margin-left: calc(-50vw + 50%);
    width: 100vw;
    max-width: none;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 32px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: ${colors.gray10};

  ${textStyles.SUIT_32_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_24_SB};

    white-space: pre;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 36px;
  align-self: stretch;
  margin-top: 32px;

  & > button:last-child {
    margin-top: 4px;
  }
`;

const Label = styled.label`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
  color: ${colors.white};

  ${textStyles.SUIT_14_SB};
`;

const StyledInput = styled(TextField)`
  margin: 8px 0;

  & input {
    border-radius: 10px;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const StyledSelectTrigger = styled(SelectV2.TriggerContent)`
  width: max-content;
  min-width: fit-content;
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
`;
