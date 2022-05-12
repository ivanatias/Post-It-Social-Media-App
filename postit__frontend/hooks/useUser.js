import { useState, useEffect } from "react";
import { apiGetUser } from "../utils/api";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const userInfo =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    setUserSession(userInfo);

    if (userSession) {
      apiGetUser(userSession.googleId).then((response) => {
        setUser(response.data[0]);
      });
    } else {
      return;
    }
  }, []);

  return { user, userSession };
};
