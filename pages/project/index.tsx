import useGetProjectListQuery from '@/components/project/upload/hooks/useGetProjectListQuery';

const ProjectPage = () => {
  const { data } = useGetProjectListQuery();

  console.log('[data]: ', data);
  return <div>ProjectPage</div>;
};

export default ProjectPage;
