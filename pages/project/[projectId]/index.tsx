import useGetProjectQuery from '@/components/project/upload/hooks/useGetProjectQuery';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { projectId } = router.query;

  const { data } = useGetProjectQuery({ id: projectId as string });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>hi</div>;
}
