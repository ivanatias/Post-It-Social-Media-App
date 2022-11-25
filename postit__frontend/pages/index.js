import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { useData } from "../hooks/useData";
import { Layout, Posts } from "../components";
import { client } from "../client/client";
import { getSession } from "next-auth/react";
import { fetchAllPosts } from "../utils/fetchers";
import { postsQuery } from "../utils/data";

const Home = () => {
  const {
    data: posts,
    isFetching,
    refetch,
  } = useData({ queryKey: "feedPosts", queryFn: fetchAllPosts });

  return (
    <Layout>
      <section className="w-full px-4 py-4 md:px-8 lg:px-10">
        <Posts posts={posts} refresh={refetch} isFetching={isFetching} />
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const queryClient = new QueryClient();
  const query = postsQuery();

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

  await queryClient.prefetchQuery("feedPosts", () =>
    client.fetch(query).then((data) => data)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
