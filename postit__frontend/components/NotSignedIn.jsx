import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const NotSignedIn = () => {
  return (
    <>
      <Head>
        <title>PostIt App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8"></meta>
        <link rel="icon" href="/Postit-logoicon.svg"></link>
      </Head>

      <section className="h-screen grid place-content-center bg-black">
        <div className="flex flex-col p-4 items-center justify-center sm:p-8 md:p-12 gap-5 max-w-4xl">
          <Image
            src="/Postit-logofull.svg"
            placeholder="blur"
            blurDataURL="/Postit-logofull.svg"
            width={140}
            height={80}
            alt="logo"
          />
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-white text-center text-base 2xl:text-xl font-bold">
              It seems you are not signed in...
            </p>
            <Link href="/login" passHref>
              <a className="text-white text-sm 2xl:text-base">
                Click{" "}
                <span className="text-white text-sm 2xl:text-base font-bold">
                  here
                </span>{" "}
                to go to login page
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotSignedIn;
