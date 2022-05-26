import { useQuery } from "react-query";
import { toast } from "react-toastify";

export const useData = (queryKey, queryFn, queryFnParam1, queryFnParam2) => {
  const { data, isFetching, refetch } = useQuery(
    queryKey,
    () => queryFn(queryFnParam1, queryFnParam2),
    {
      staleTime: 2.5 * 60 * 1000, //2.5 minutes
      onError: (error) => {
        toast.error(
          `Couldn't establish connection due to error: ${error.message}`
        );
      },
    }
  );

  return { data, isFetching, refetch };
};
