import React, { useState, createContext } from "react";

export const Context = createContext();

const SearchContext = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Context.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </Context.Provider>
  );
};

export default SearchContext;
