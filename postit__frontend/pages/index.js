import React, { useContext } from "react";
import { Context } from "../context/context";

import { Layout, Posts } from "../components";
import { client } from "../client/client";
import { postsQuery } from "../utils/data";
import { useUser } from "../hooks/useUser";
import Link from "next/link";

const Home = ({ posts }) => {
  const { handleUserLogout } = useContext(Context);
  const { userSession } = useUser();
  console.log(posts);

  //Create a "No Authorized" component and display it when the userAuth Cookie is not available.
  if (!userSession) {
    return (
      <div className="grid min-h-screen place-content-center">
        No User Session
      </div>
    );
  }

  return (
    <Layout>
      <section className="w-full">
        <Posts posts={posts && posts} />
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const query = postsQuery();
  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    },
  };
}

export default Home;
