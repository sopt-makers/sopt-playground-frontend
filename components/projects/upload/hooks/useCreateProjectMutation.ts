import { useMutation } from 'react-query';

import { project } from '@/api/project';
import { ProjectInput } from '@/api/project/types';

const useCreateProjectMutation = () => {
  return useMutation({
    mutationFn: async (input: ProjectInput) => {
      const { data } = await project.create(input);
      return data;
    },
  });
};

export default useCreateProjectMutation;
