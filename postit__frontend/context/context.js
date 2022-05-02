import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

import { Loading } from "../components";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userInfo =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : null;

    if (router.pathname !== "/login" && !userInfo) {
      router.push("/login");
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }

    if (router.pathname === "/login" && !userInfo) {
      setIsLoading(false);
    }

    if (router.pathname === "/login" && userInfo) {
      router.push("/");
      setTimeout(() => {
        setIsLoading(false);
      }, 250);
    }

    if (router.pathname !== "/login" && userInfo) {
      setIsLoading(false);
    }
  }, []);

  if (isLoading)
    return <Loading isInitialLoad message="We're loading Post It App..." />;

  const handleUserLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <Context.Provider value={{ handleUserLogout }}>{children}</Context.Provider>
  );
};
