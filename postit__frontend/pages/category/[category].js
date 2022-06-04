import React from "react";
import Image from "next/image";
import { Layout, Loading, Posts, NotSignedIn } from "../../components";
import { useData } from "../../hooks/useData";
import { useRouter } from "next/router";
import { fetchPostsByCategory } from "../../utils/fetchers";
import { useSession } from "next-auth/react";

const PostsByCategory = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { category } = router.query;

  const {
    data: postsByCategory,
    isFetching,
    refetch,
  } = useData(
    ["postsByCategoryFeed", category],
    fetchPostsByCategory,
    category
  );

  if (!session) {
    return <NotSignedIn />;
  }

  return (
    <Layout
      title={`PostIt | ${category} Posts`}
      ogUrl={process.env.NEXT_PUBLIC_BASEURL + router.asPath}
    >
      {isFetching && <Loading />}
      <section className="w-full px-4 py-4 md:px-8 lg:px-10">
        {postsByCategory?.length === 0 && !isFetching ? (
          <div className="grid place-content-center py-10 w-full">
            <Image
              src="/empty.svg"
              width={280}
              height={200}
              alt="No results"
              priority
            />
            <p className="mt-10 text-center text-2xl 2xl:text-3xl font-bold text-white w-full">
              Wow, so empty!
            </p>
          </div>
        ) : (
          <Posts
            posts={postsByCategory}
            refresh={refetch}
            isFetching={isFetching}
          />
        )}
      </section>
    </Layout>
  );
};

export default PostsByCategory;
