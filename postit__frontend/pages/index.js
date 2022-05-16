import React from "react";

import { Layout, Posts } from "../components";
import { client } from "../client/client";
import { postsQuery } from "../utils/data";

import { getSession } from "next-auth/react";

const Home = ({ posts }) => {
  return (
    <Layout>
      <section className="w-full px-4 py-4 md:px-8 lg:px-10">
        <Posts posts={posts} />
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const doc = {
    _type: "user",
    _id: session.user.uid,
    userName: session.user.name,
    image: session.user.image,
    userTag: session.user.tag,
  };

  await client.createIfNotExists(doc);
  const query = postsQuery();
  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    },
  };
}

export default Home;
