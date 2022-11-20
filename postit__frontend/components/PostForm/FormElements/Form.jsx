import React from "react";

const Form = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-full gap-8"
    >
      {children}
    </form>
  );
};

export default Form;
