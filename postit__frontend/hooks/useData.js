import { useQuery } from "react-query";

export const useData = (queryKey, queryFn, queryFnParams = null) => {
  const { data, isFetching, refetch } = useQuery(
    queryKey,
    () => queryFn(queryFnParams),
    {
      staleTime: 2.5 * 60 * 1000, //2.5 minutes
    }
  );

  return { data, isFetching, refetch };
};
