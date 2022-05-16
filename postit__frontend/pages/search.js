import React, { useContext } from "react";
import { Context } from "../context/context";
import { useUser } from "../hooks/useUser";

const Search = () => {
  const { handleUserLogout } = useContext(Context);
  const { user, userSession } = useUser();

  //Create a "No Authorized" component and display it when the userAuth Cookie is not available.
  if (!userSession) {
    return (
      <div className="grid min-h-screen place-content-center">
        No User Session
      </div>
    );
  }

  return (
    <>
      <div>Search Page</div>
      <button onClick={handleUserLogout}>Logout</button>
    </>
  );
};

export default Search;
