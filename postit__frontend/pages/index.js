import React, { useContext } from "react";
import { Context } from "../context/context";

import { Layout, Posts } from "../components";
import { client } from "../client/client";
import { postsQuery } from "../utils/data";
import { useUser } from "../hooks/useUser";

const Home = ({ posts }) => {
  const { user, userSession } = useUser();

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
      <section className="w-full px-4 py-4 md:px-8 lg:px-10">
        <Posts posts={posts} />
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
