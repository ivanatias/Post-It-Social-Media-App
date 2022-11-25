import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import Head from "next/head";

import { signIn } from "next-auth/react";

const Login = () => (
  <>
    <Head>
      <title>PostIt App | Login </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="PostIt is a social media web app for sharing all kind of photos with your friends."
      />
      <meta charSet="utf-8"></meta>
      <link rel="icon" href="/Postit-logoicon.svg"></link>
    </Head>

    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <video
        src="/PostItvideo2.mp4"
        type="video/mp4"
        loop
        controls={false}
        muted
        autoPlay
        className="object-cover w-full h-full brightness-50"
      />

      <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center">
        <div className="mb-3">
          <Image
            src="/Postit-logofull.svg"
            width={140}
            height={80}
            alt="logo"
            priority
          />
        </div>
        <button
          type="button"
          className="flex items-center justify-center px-8 py-3 text-lg font-bold text-black bg-white border-none rounded-lg outline-none cursor-pointer"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <FcGoogle size={21} className="mr-2" /> Sign in with Google
        </button>
      </div>
    </div>
  </>
);

export default Login;
