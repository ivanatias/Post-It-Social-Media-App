import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <section className="flex flex-col w-full gap-5 px-4 pt-4 pb-8 mx-auto md:pt-12 md:pb-12 max-w-7xl md:px-8 lg:px-10">
      {children}
    </section>
  );
};

export default PageWrapper;
