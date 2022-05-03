import { useState, useEffect } from "react";
import { apiGetUser } from "../utils/api";

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();
    apiGetUser(userInfo?.googleId).then((response) => {
      setUser(response.data[0]);
    });
  }, []);

  return { user };
};
