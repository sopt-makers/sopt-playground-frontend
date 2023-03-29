import styled from '@emotion/styled';
import { FC, PropsWithChildren, ReactChild } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface InfoItemProps {
  label: string;
  content?: ReactChild;
}

const InfoItem: FC<PropsWithChildren<InfoItemProps>> = ({ label, content, children }) => {
  const element = children || content;

  return (
    <Container>
      <div className='label'>{label}</div>
      <div className='content'>{element}</div>
    </Container>
  );
};

const Container = styled.div`
  .label {
    line-height: 100%;
    color: #989ba0;
    font-size: 16px;
    font-weight: 600;
    @media ${MOBILE_MEDIA_QUERY} {
      font-size: 14px;
    }
  }

  .content {
    margin-top: 16px;
    line-height: 160%;
    font-size: 18px;

    @media ${MOBILE_MEDIA_QUERY} {
      margin-top: 12px;
      line-height: 140%;
      font-size: 16px;
    }
  }
`;

export default InfoItem;
