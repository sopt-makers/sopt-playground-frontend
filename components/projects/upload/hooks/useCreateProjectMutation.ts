import { useMutation } from '@tanstack/react-query';

import { postProject } from '@/api/endpoint_LEGACY/projects';
import { ProjectInput } from '@/api/endpoint_LEGACY/projects/type';

const useCreateProjectMutation = () => {
  return useMutation({
    mutationFn: async (input: ProjectInput) => {
      const { data } = await postProject(input);
      return data;
    },
    onError: (error: { message: string }) => alert(error.message),
  });
};

export default useCreateProjectMutation;
