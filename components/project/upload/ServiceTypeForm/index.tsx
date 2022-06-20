import { ProjectUploadForm, ServiceType } from '@/components/project/upload/constants';
import FormItem from '@/components/project/upload/FormItem';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

const ServiceTypeForm = () => {
  const { watch, register } = useFormContext<ProjectUploadForm>();
  const selectedServices = watch('serviceType');

  return (
    <FormItem
      title='서비스 형태'
      titleProps={{
        essential: true,
        description: '복수 선택 가능',
      }}
    >
      <Content>
        <StyledLabel checked={selectedServices.includes(ServiceType.WEB)}>
          <input type='checkbox' value={ServiceType.WEB} {...register('serviceType')} />
          <span>웹</span>
        </StyledLabel>
        <StyledLabel checked={selectedServices.includes(ServiceType.APP)}>
          <input type='checkbox' value={ServiceType.APP} {...register('serviceType')} />
          <span>앱</span>
        </StyledLabel>
      </Content>
    </FormItem>
  );
};

export default ServiceTypeForm;

const Content = styled.div`
  display: flex;
  align-items: center;

  & > :last-child {
    margin: 0 0 0 10px;
  }
`;

const StyledLabel = styled.label<{ checked?: boolean }>`
  transition: background-color 0.2s, color 0.2s;
  border-radius: 100px;
  background-color: ${colors.black60};
  cursor: pointer;
  padding: 14px 75px;
  width: 163px;
  height: 42px;
  color: ${colors.gray100};

  ${({ checked }) =>
    checked &&
    css`
      background-color: ${colors.purple100};
      color: ${colors.white};
    `}
  ${textStyles.SUIT_14_M};
`;
