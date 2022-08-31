import { user } from '@/api/user';
import React from 'react';
import { useQuery } from 'react-query';

interface GetUsersByNameQueryVariables {
  name: string;
}
const useGetUsersByNameQuery = (variables: GetUsersByNameQueryVariables) => {
  const { name } = variables;
  return useQuery(
    ['useGetUsersByNameQuery', variables],
    () => {
      if (!name) {
        return;
      }
      return user.getUsersByName(name);
    },
    {
      onError: (error: { message: string }) => {
        console.error(error.message);
      },
      keepPreviousData: true,
    },
  );
};

export default useGetUsersByNameQuery;
