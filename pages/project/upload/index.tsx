import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Checkbox from 'components/common/checkbox';
import Input from 'components/common/input';
import Select from 'components/common/select';
import Text from 'components/common/text';
import React from 'react';
import { colors } from 'styles/common/colors';

const ProjectUploadPage = () => {
  return (
    <Container>
      <Status>
        <Text typography='SUIT_32_SB'>등록 진행</Text>
      </Status>
      <Project>
        <Text typography='SUIT_32_SB'>프로젝트</Text>
        <Text
          css={css`
            margin-top: 78px;
          `}
          typography='SUIT_24_SB'
        >
          프로젝트 이름
        </Text>
        <Input
          css={css`
            margin-top: 9px;
          `}
          placeholder='프로젝트 이름'
        />
        <Text
          css={css`
            margin-top: 96px;
          `}
          typography='SUIT_24_SB'
        >
          기수
        </Text>
        <Text
          typography='SUIT_20_SM'
          color={colors.gray100}
          css={css`
            margin-top: 8px;
          `}
        >
          어느 기수에서 시작된 프로젝트인지 선택해주세요.
        </Text>
        <Select
          width={236}
          css={css`
            margin-top: 12px;
          `}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Select>
        <CheckboxWrapper>
          <Checkbox />
          <Text typography='SUIT_20_SM' color={colors.gray100}>
            특정 기수 활동으로 진행하지 않았어요
          </Text>
        </CheckboxWrapper>
      </Project>
    </Container>
  );
};

export default ProjectUploadPage;

const Container = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  margin: 167px auto 0;
`;

const Status = styled.div`
  border-radius: 12px;
  background-color: ${colors.black80};
  padding: 51px 44px;
  width: 377px;
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: ${colors.black80};
  padding: 51px 44px;
  width: 1191px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 12px;
`;
