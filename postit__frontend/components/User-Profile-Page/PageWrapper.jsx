import React from "react";

const PageWrapper = ({ children }) => (
  <section className="flex flex-col w-full gap-5 px-4 py-12 mx-auto max-w-7xl md:px-8 lg:px-10">
    <div className="flex flex-col items-center justify-center gap-8">
      {children}
    </div>
  </section>
);

export default PageWrapper;
