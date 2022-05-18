import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const useRefresh = (changingValue) => {
  const [isRefreshing, setIsRefreshing] = useState(true);
  const router = useRouter();

  const refreshData = () => {
    setIsRefreshing(true);
    router.replace(router.asPath);
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [changingValue]);

  return { isRefreshing, refreshData };
};
