import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const NotSignedIn = () => (
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
            It seems you are not signed in...
          </p>
          <Link href="/login" passHref>
            <a className="text-sm text-white 2xl:text-base">
              Click{" "}
              <span className="text-sm font-bold text-white 2xl:text-base">
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

export default NotSignedIn;
