import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Button, Callout, Chip, SelectV2, TextField } from '@sopt-makers/ui';
import { FC, FormEvent, useState } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetMemberProperty } from '@/api/endpoint/members/getMemberProperty';
import { RequestBody } from '@/api/endpoint/review/postReview';
import BottomSheetSelect from '@/components/blog/BottomSheetSelect';
import {
  ACTIVITY_OPTIONS,
  BLOG_OPTIONS,
  BlogOptionValue,
  PART_KR_TO_ENUM,
  RECRUIT_OPTIONS,
} from '@/components/blog/constants';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface UploadBlogProps {
  state: 'idle' | 'pending' | 'error' | 'success';
  errorMessage?: string;
  onSubmit: (requestBody: RequestBody) => void;
}

const UploadBlog: FC<UploadBlogProps> = ({ state, errorMessage, onSubmit }) => {
  const [url, setUrl] = useState('');
  const [selectedBlogOption, setSelectedBlogOption] = useState<BlogOptionValue | ''>('');
  const [selectedRecruitOption, setSelectedRecruitOption] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<number>();
  const [selectedPart, setSelectedPart] = useState('');

  const { data: property } = useGetMemberProperty();
  const { data: profile } = useGetMemberOfMe();

  const toggleActivity = (value: string) => {
    setSelectedActivities((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!selectedGeneration || !selectedPart || !profile?.name || selectedBlogOption === '') {
      throw new Error('필수 입력값이 누락되었습니다.');
    }

    const requestBody = {
      generation: selectedGeneration,
      part: PART_KR_TO_ENUM[selectedPart as keyof typeof PART_KR_TO_ENUM],
      mainCategory: selectedBlogOption,
      link: url,
      author: profile.name,
      ...(selectedBlogOption === BLOG_OPTIONS[0].value &&
        selectedActivities.length > 0 && { subActivities: selectedActivities }),
      ...(selectedBlogOption === BLOG_OPTIONS[1].value &&
        selectedRecruitOption && { subRecruiting: selectedRecruitOption as RequestBody['subRecruiting'] }),
      ...(profile?.profileImage && { authorProfileImageUrl: profile.profileImage }),
    };

    onSubmit(requestBody);
  }

  const handleGenerationSelect = (value: string) => {
    const numericValue = Number(value);
    setSelectedGeneration(numericValue);

    const index = property?.generation.findIndex((g) => g === numericValue);
    if (index !== undefined && index !== -1) {
      const part = property?.part[index];
      if (part !== undefined) {
        setSelectedPart(part);
      }
    }
  };

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
            <TextField
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
              어떤 활동에 대한 후기인지 선택해주세요.
            </Text>
            <SelectWrapper>
              <Responsive only='desktop'>
                <SelectV2.Root
                  type='text'
                  onChange={handleGenerationSelect}
                  visibleOptions={
                    property?.generation.length && property.generation.length < 3 ? property.generation.length : 3
                  }
                >
                  <SelectV2.Trigger>
                    <StyledSelectTrigger placeholder='기수 및 파트' />
                  </SelectV2.Trigger>
                  <SelectV2.Menu>
                    {property?.generation.map((gen, index) => (
                      <SelectV2.MenuItem key={gen} option={{ value: gen, label: `${gen}기 ${property.part[index]}` }} />
                    ))}
                  </SelectV2.Menu>
                </SelectV2.Root>
              </Responsive>
              <Responsive only='mobile'>
                <BottomSheetSelect
                  placeholder='기수 및 파트'
                  options={
                    property?.generation.map((gen, index) => ({
                      value: `${gen}`,
                      label: `${gen}기 ${property.part[index]}`,
                    })) as { value: string; label: string }[]
                  }
                  value={selectedGeneration?.toString() || ''}
                  onSelect={(option) => {
                    handleGenerationSelect(option.value);
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
                <SelectV2.Root<BlogOptionValue | ''>
                  type='text'
                  onChange={(value) => {
                    setSelectedBlogOption(value);
                    if (value === BLOG_OPTIONS[0].value && selectedRecruitOption !== '') setSelectedRecruitOption('');
                    if (value === BLOG_OPTIONS[1].value && selectedActivities !== null) setSelectedActivities([]);
                  }}
                  visibleOptions={2}
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
                    setSelectedBlogOption(option.value as BlogOptionValue);
                    if (option.value === BLOG_OPTIONS[0].value && selectedRecruitOption !== '')
                      setSelectedRecruitOption('');
                    if (option.value === BLOG_OPTIONS[1].value && selectedActivities !== null)
                      setSelectedActivities([]);
                  }}
                />
              </Responsive>
              {selectedBlogOption === BLOG_OPTIONS[1].value && (
                <>
                  <Responsive only='desktop'>
                    <SelectV2.Root<string>
                      type='text'
                      onChange={(value) => setSelectedRecruitOption(value)}
                      visibleOptions={3}
                    >
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
          {selectedBlogOption === BLOG_OPTIONS[0].value && (
            <section>
              <Label>
                세부 활동 선택
                <Text typography='SUIT_14_SB' color={colors.secondary}>
                  *
                </Text>
              </Label>
              <Text typography='SUIT_12_SB' color={colors.gray300}>
                후기와 관련된 활동을 모두 선택해주세요.
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
            </section>
          )}
          <Button
            type='submit'
            size='lg'
            disabled={
              !url ||
              selectedBlogOption === '' ||
              (selectedBlogOption === BLOG_OPTIONS[0].value && selectedActivities.length === 0) ||
              (selectedBlogOption === BLOG_OPTIONS[1].value && selectedRecruitOption === '') ||
              !selectedGeneration ||
              !selectedPart
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

  & > div:first-of-type {
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
    margin-bottom: 24px;
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
