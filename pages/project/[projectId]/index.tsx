import useGetProjectQuery from '@/components/project/upload/hooks/useGetProjectQuery';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { projectId } = router.query;

  const { data } = useGetProjectQuery({ id: projectId as string });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container>
      <Header>
        <LogoImageWrapper>
          <LogoImage src={data?.logo_image} alt={data?.name} />
        </LogoImageWrapper>
        <div></div>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  border: 1px solid red;
  width: 100%;
  max-width: 1200px;
`;
const Header = styled.div`
  display: flex;
  gap: 44px;
  align-items: flex-end;
`;
const LogoImageWrapper = styled.div`
  flex-shrink: 0;
  border-radius: 20px;
  width: 150px;
  height: 150px;
  overflow: hidden;
`;
const LogoImage = styled.img`
  object-fit: cover;
`;
