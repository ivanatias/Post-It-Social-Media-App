import React from "react";
import { Sidebar, Navbar } from "../components";
import Head from "next/head";

const Layout = ({ children, title, ogUrl, ogType, ogImage }) => {
  const defaultTitle = "PostIt App";
  const defaultOgImage = "/Postit-logofull.svg";
  const defaultOgType = "website";
  const defaultOgUrl = process.env.NEXT_PUBLIC_BASEURL;

  return (
    <div className="flex min-h-screen bg-black">
      <Head>
        <title>{title || defaultTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="PostIt is a social media web app for sharing all kind of photos with your friends."
        />
        <meta
          name="keywords"
          content="Post, Social Media, App, Share, Save, Download, Connect, Friends, Categories"
        />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:type" content={ogType || defaultOgType} />
        <meta property="og:url" content={ogUrl || defaultOgUrl} />
        <meta property="og:image" content={ogImage || defaultOgImage} />
        <meta charSet="utf-8"></meta>
        <link rel="icon" href="/Postit-logoicon.svg"></link>
      </Head>
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <main className="relative w-full h-screen overflow-y-scroll hide-scrollbar">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
