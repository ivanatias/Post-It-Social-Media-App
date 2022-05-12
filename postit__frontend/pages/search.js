import React, { useContext } from "react";
import { Context } from "../context/context";

const Search = () => {
  const { handleUserLogout } = useContext(Context);

  return (
    <>
      <div>Search Page</div>
      <button onClick={handleUserLogout}>Logout</button>
    </>
  );
};

export default Search;
