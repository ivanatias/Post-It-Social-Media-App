import { useQuery } from "react-query";
import { toast } from "react-toastify";

export const useData = (params) => {
  const { queryKey, queryFn, ...queryParams } = params;

  const queryParamsValues = Object.values(queryParams);

  const { data, isFetching, refetch } = useQuery(
    [queryKey, ...queryParamsValues],
    () => queryFn(...queryParamsValues),
    {
      staleTime: 2.5 * 60 * 1000, //2.5 minutes
      onError: (error) => {
        toast.error(
          `Couldn't establish connection due to error: ${error.message}`
        );
      },
      useErrorBoundary: (error) => error.response?.status >= 500,
    }
  );

  return { data, isFetching, refetch };
};
