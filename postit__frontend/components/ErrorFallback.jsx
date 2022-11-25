import React from "react";
import Head from "next/head";
import Image from "next/image";

const ErrorFallback = ({ resetErrorState }) => {
  return (
    <>
      <Head>
        <title>PostIt App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8"></meta>
        <link rel="icon" href="/Postit-logoicon.svg"></link>
      </Head>

      <section className="grid h-screen bg-black place-content-center">
        <div className="flex flex-col items-center justify-center max-w-4xl gap-5 p-4 sm:p-8 md:p-12">
          <Image
            src="/Postit-logofull.svg"
            placeholder="blur"
            blurDataURL="/Postit-logofull.svg"
            width={140}
            height={80}
            alt="logo"
          />
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-base font-bold text-center text-white 2xl:text-xl">
              It seems there was an unexpected error on client side...
            </p>
            <button
              type="button"
              className="flex items-center justify-center w-full text-sm font-bold text-white bg-transparent border-none outline-none 2xl:text-base"
              onClick={resetErrorState}
            >
              Click here to refresh the page and try again.
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorFallback;
