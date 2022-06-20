import Text from '@/components/common/Text';
import FormTitle, { FormTitleProps } from '@/components/project/upload/FormTitle';
import styled from '@emotion/styled';
import React, { FC, PropsWithChildren } from 'react';

interface FromItemProps extends FormTitleProps {
  title: string;
}

const FormItem: FC<PropsWithChildren<FromItemProps>> = ({ title, children, ...props }) => {
  return (
    <Container>
      <FormTitle {...props}>{title}</FormTitle>
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
