import React from "react";
import Image from "next/image";
import { Layout, Loading, Posts } from "../../components";
import { useData } from "../../hooks/useData";
import { useRouter } from "next/router";
import { fetchPostsByCategory } from "../../utils/fetchers";

const PostsByCategory = () => {
  const router = useRouter();
  const { category } = router.query;

  const {
    data: postsByCategory,
    isFetching,
    refetch,
  } = useData({
    queryKey: "postsByCategoryFeed",
    queryFn: fetchPostsByCategory,
    category,
  });

  return (
    <Layout
      title={`PostIt | ${category} Posts`}
      ogUrl={process.env.NEXT_PUBLIC_BASEURL + router.asPath}
    >
      {isFetching && <Loading />}
      <section className="w-full px-4 py-4 md:px-8 lg:px-10">
        {postsByCategory?.length === 0 && !isFetching ? (
          <div className="grid w-full py-10 place-content-center">
            <Image
              src="/empty.svg"
              width={280}
              height={200}
              alt="No results"
              priority
            />
            <p className="w-full mt-10 text-2xl font-bold text-center text-white 2xl:text-3xl">
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
