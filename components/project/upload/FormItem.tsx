import Text from '@/components/common/Text';
import FormTitle, { FormTitleProps } from '@/components/project/upload/FormTitle';
import styled from '@emotion/styled';
import React, { FC, PropsWithChildren } from 'react';

interface FromItemProps extends FormTitleProps {
  title: string;
  titleProps: FormTitleProps;
}

const FormItem: FC<PropsWithChildren<FromItemProps>> = ({ title, titleProps, children }) => {
  return (
    <Container>
      <FormTitle {...titleProps}>{title}</FormTitle>
      <Content>{children}</Content>
    </Container>
  );
};

export default FormItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled(Text)``;

const Content = styled.div`
  margin: 20px 0 0;
`;
