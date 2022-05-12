import React from "react";
import Image from "next/image";

import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";

import { useRouter } from "next/router";

import { apiUserLogin } from "../utils/api";

const Login = () => {
  const router = useRouter();

  //Add OnFailure function if login is not succesful...

  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response?.profileObj;

    apiUserLogin(name, googleId, imageUrl).then(() => {
      router.replace("/");
    });
  };

  return (
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
          />
        </div>

        <GoogleLogin
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
          render={(renderProps) => (
            <button
              type="button"
              className="flex items-center justify-center px-8 py-3 text-lg font-bold text-black bg-white border-none rounded-lg outline-none cursor-pointer"
              onClick={renderProps.onClick}
            >
              <FcGoogle size={21} className="mr-2" /> Sign in with Google
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </div>
    </div>
  );
};

export default Login;
