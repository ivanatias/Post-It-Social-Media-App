import React from "react";
import { Layout, PostForm } from "../components";
import { useRouter } from "next/router";

const CreatePost = () => {
  const router = useRouter();

  return (
    <Layout
      title="PostIt App | Create Post"
      ogUrl={process.env.NEXT_PUBLIC_BASEURL + router.pathname}
    >
      <section className="flex flex-col w-full gap-5 px-4 pt-4 pb-8 mx-auto md:pt-12 md:pb-12 max-w-7xl md:px-8 lg:px-10">
        <h1 className="text-3xl font-bold text-center text-white 2xl:text-5xl">
          Let&apos;s <span className="text-red-500">create</span> a cool post!
        </h1>

        <PostForm />
      </section>
    </Layout>
  );
};

export default CreatePost;
