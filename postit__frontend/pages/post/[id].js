import React, { useState } from "react";
import Image from "next/image";
import { dehydrate, QueryClient } from "react-query";
import { Layout, Posts, CommentsBox, SavedByBox } from "../../components";
import { useData } from "../../hooks/useData";
import { client } from "../../client/client";
import { postQuery, postsQuery, postsByCategoryQuery } from "../../utils/data";
import { fetchPost, fetchPostsByCategory } from "../../utils/fetchers";
import { useRouter } from "next/router";

const PostDetails = () => {
  const [openSavedByBox, setOpenSavedByBox] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const {
    data: postDetails,
    isFetching: isFetchingPostDetails,
    refetch: refetchPostDetails,
  } = useData("postDetails", fetchPost, id);

  const {
    data: postsByCategory,
    isFetching: isFetchingPostsByCategory,
    refetch: refetchPostsByCategory,
  } = useData(
    "postsByCategory",
    fetchPostsByCategory,
    postDetails[0]?.category,
    id
  );

  return (
    <Layout
      title={`PostIt | Post by ${postDetails[0]?.postedBy?.userName}`}
      ogUrl={process.env.NEXT_PUBLIC_BASEURL + router.asPath}
      ogType="article"
      ogImage={postDetails[0]?.image?.asset?.url}
    >
      <section className="flex flex-col w-full gap-5 px-4 py-12 mx-auto max-w-7xl md:px-8 lg:px-10">
        <div className="flex items-center justify-center gap-5">
          <h1 className="text-xl font-bold text-white 2xl:text-2xl">
            Posted by
          </h1>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() =>
              router.push(`/user/${postDetails[0]?.postedBy?._id}`)
            }
          >
            <img
              src={postDetails[0]?.postedBy?.image}
              alt="User avatar"
              className="object-cover w-8 h-8 rounded-full"
            />
            <div className="text-sm font-bold text-white 2xl:text-base">
              {postDetails[0]?.postedBy?.userTag}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-lg post__image-container">
            <Image
              src={postDetails[0]?.image?.asset?.url}
              placeholder="blur"
              blurDataURL={postDetails[0]?.image?.asset?.url}
              className="rounded-lg post__image"
              layout="fill"
              objectFit="contain"
              alt="User's post image"
            />
          </div>
        </div>
        <h2 className="text-base font-bold text-white 2xl:text-xl">
          {postDetails[0]?.title}
        </h2>
        <p className="text-sm text-white 2xl:text-lg">
          {postDetails[0]?.description}
        </p>
        <span className="mb-2 text-base font-bold text-white 2xl:text-xl">
          Category
        </span>

        <span className="flex items-center justify-center px-6 py-2 text-xs text-white bg-gray-800 rounded-lg w-fit 2xl:text-base">
          {postDetails[0]?.category}
        </span>

        <div className="flex flex-col gap-2">
          <span className="mb-2 text-base font-bold text-white 2xl:text-xl">
            Saved by{" "}
            {postDetails[0]?.saved?.length > 0
              ? `(${postDetails[0]?.saved.length})`
              : "(0)"}
          </span>
          {postDetails[0]?.saved?.length > 0 ? (
            <div
              className="flex flex-wrap items-center cursor-pointer max-w-[250px]"
              onClick={() => setOpenSavedByBox(true)}
              aria-description="See more users who saved this post"
            >
              {postDetails[0]?.saved
                .map((item) => (
                  <img
                    key={item._key}
                    src={item.postedBy.image}
                    alt="User Avatar"
                    className="object-cover w-8 h-8 rounded-full mr-[-6px]"
                  />
                ))
                .slice(0, 6)
                .concat(
                  <span
                    key={"dots"}
                    className={`h-8 ml-2 text-xl text-white ${
                      postDetails[0]?.saved.length < 6 && "hidden"
                    }`}
                  >
                    ...
                  </span>
                )}
            </div>
          ) : (
            <span className="text-xs text-gray-500 2xl:text-base">
              No one has saved this post yet...
            </span>
          )}
        </div>
        <span className="mb-2 text-base font-bold text-white 2xl:text-xl">
          Comments{" "}
          {postDetails[0]?.comments?.length > 0
            ? `(${postDetails[0]?.comments.length})`
            : "(0)"}
        </span>
        <CommentsBox
          comments={postDetails[0]?.comments}
          refresh={refetchPostDetails}
          isFetching={isFetchingPostDetails}
        />
        {postsByCategory.length > 0 && (
          <>
            <span className="mt-6 mb-2 text-base font-bold text-white 2xl:text-xl">
              You may also like
            </span>
            <Posts
              posts={postsByCategory}
              refresh={refetchPostsByCategory}
              isFetching={isFetchingPostsByCategory}
            />
          </>
        )}
        {openSavedByBox && (
          <SavedByBox
            saved={postDetails[0]?.saved}
            setOpenSavedByBox={setOpenSavedByBox}
          />
        )}
      </section>
    </Layout>
  );
};

export async function getStaticPaths() {
  const query = postsQuery();
  const posts = await client.fetch(query);

  const paths = posts.map((post) => ({
    params: { id: post._id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const queryClient = new QueryClient();
  const post = postQuery(params.id);
  let postCategory;

  await queryClient.prefetchQuery("postDetails", () =>
    client.fetch(post).then((data) => {
      postCategory = data[0].category;
      return data;
    })
  );

  const postsByCategory = postsByCategoryQuery(postCategory, params.id);
  await queryClient.prefetchQuery("postsByCategory", () =>
    client.fetch(postsByCategory)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 30,
  };
}

export default PostDetails;
