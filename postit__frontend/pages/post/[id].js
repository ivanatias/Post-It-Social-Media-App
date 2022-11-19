import React, { useState } from "react";
import Image from "next/image";
import { dehydrate, QueryClient } from "react-query";
import {
  Layout,
  Posts,
  CommentsBox,
  SavedByBox,
  Loading,
  PostForm,
  UserHeader,
  ConfirmModal,
} from "../../components";
import { useData } from "../../hooks/useData";
import { client } from "../../client/client";
import { postQuery, postsByCategoryQuery } from "../../utils/data";
import { fetchPost, fetchPostsByCategory } from "../../utils/fetchers";
import { useRouter } from "next/router";
import { useModal } from "../../hooks/useModal";
import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";

const PostDetails = () => {
  const [openSavedByBox, setOpenSavedByBox] = useState(false);
  const [editingPostMode, setEditingPostMode] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);
  const { data: session } = useSession();
  const { openModal, toggleModal } = useModal();

  const router = useRouter();
  const { id } = router.query;

  const {
    data: postDetails,
    isFetching: isFetchingPostDetails,
    refetch: refetchPostDetails,
  } = useData(["postDetails", id], fetchPost, id);

  const {
    data: postsByCategory,
    isFetching: isFetchingPostsByCategory,
    refetch: refetchPostsByCategory,
  } = useData(
    ["postsByCategory", id],
    fetchPostsByCategory,
    postDetails?.category,
    id
  );

  const deletePost = (postId) => {
    if (!postId) return;
    setDeletingPost(true);
    axios
      .post("/api/posts/deletePost", {
        postId: postId,
      })
      .then(() => {
        setDeletingPost(false);
        toast.success("Post deleted!");
        router.push("/");
      })
      .catch((error) => {
        setDeletingPost(false);
        toast.error(
          `Couldn't delete the post due to an error: ${error.message}`
        );
      });
  };

  return (
    <Layout
      title={`PostIt | Post by ${postDetails?.postedBy?.userName}`}
      ogUrl={process.env.NEXT_PUBLIC_BASEURL + router.asPath}
      ogType="article"
      ogImage={postDetails?.image?.asset?.url}
    >
      <section className="flex flex-col w-full gap-5 px-4 pt-4 pb-8 mx-auto md:pt-12 md:pb-12 max-w-7xl md:px-8 lg:px-10">
        {!editingPostMode ? (
          <>
            <div className="flex items-center justify-center gap-5">
              <h1 className="text-xl font-bold text-white 2xl:text-2xl">
                Posted by
              </h1>
              <UserHeader
                avatarUrl={postDetails.postedBy.image}
                userTag={postDetails.postedBy.userTag}
                userId={postDetails.postedBy._id}
              />
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-lg post__image-container">
                <Image
                  src={postDetails?.image?.asset?.url}
                  placeholder="blur"
                  blurDataURL={postDetails?.image?.asset?.url}
                  className="rounded-lg post__image"
                  layout="fill"
                  objectFit="contain"
                  alt="User's post image"
                  priority
                />
              </div>
            </div>
            {postDetails?.postedBy?._id === session?.user?.uid && (
              <div className="flex items-center justify-center w-full gap-5">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 text-base text-gray-300 transition duration-150 border-none outline-none cursor-pointer 2xl:text-lg hover:text-white"
                  onClick={() => setEditingPostMode(true)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 text-base text-red-500 transition duration-150 border-none rounded-lg outline-none cursor-pointer 2xl:text-lg hover:text-red-600"
                  onClick={() => toggleModal()}
                >
                  Delete
                </button>
              </div>
            )}
            <h2 className="text-base font-bold text-white 2xl:text-xl">
              {postDetails?.title}
            </h2>
            <p className="text-sm text-white 2xl:text-lg">
              {postDetails?.description}
            </p>
            <span className="mb-2 text-base font-bold text-white 2xl:text-xl">
              Category
            </span>

            <span className="flex items-center justify-center px-6 py-2 text-xs text-white bg-gray-800 rounded-lg w-fit 2xl:text-base">
              {postDetails?.category}
            </span>

            <div className="flex flex-col gap-2">
              <span className="mb-2 text-base font-bold text-white 2xl:text-xl">
                Saved by{" "}
                {postDetails?.saved?.length > 0
                  ? `(${postDetails?.saved.length})`
                  : "(0)"}
              </span>
              {postDetails?.saved?.length > 0 ? (
                <div
                  className="flex flex-wrap items-center cursor-pointer max-w-[250px]"
                  onClick={() => setOpenSavedByBox(true)}
                  aria-label="Users who saved this post"
                >
                  {postDetails?.saved
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
                          postDetails?.saved.length < 6 && "hidden"
                        }`}
                      >
                        ...
                      </span>
                    )}
                </div>
              ) : (
                <span className="text-xs text-gray-400 2xl:text-base">
                  No one has saved this post yet...
                </span>
              )}
            </div>
            <span className="mb-2 text-base font-bold text-white 2xl:text-xl">
              Comments{" "}
              {postDetails?.comments?.length > 0
                ? `(${postDetails?.comments.length})`
                : "(0)"}
            </span>
            <CommentsBox
              comments={postDetails?.comments}
              refresh={refetchPostDetails}
              isFetching={isFetchingPostDetails}
            />
            {postsByCategory?.length > 0 && (
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
                saved={postDetails?.saved}
                setOpenSavedByBox={setOpenSavedByBox}
              />
            )}
            {deletingPost && <Loading />}
          </>
        ) : (
          <PostForm
            editingPostMode={editingPostMode}
            setEditingPostMode={setEditingPostMode}
            postTitleToEdit={postDetails?.title}
            postDescriptionToEdit={postDetails?.description}
            postImageToEdit={postDetails?.image?.asset}
            postCategoryToEdit={postDetails?.category}
            refresh={refetchPostDetails}
          />
        )}
        {openModal && (
          <ConfirmModal
            postId={id}
            toggleModal={toggleModal}
            deletePost={deletePost}
          />
        )}
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const queryClient = new QueryClient();
  const post = postQuery(context.params.id);
  let postCategory;
  let foundData;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  await queryClient.prefetchQuery(["postDetails", context.params.id], () =>
    client.fetch(post).then((data) => {
      postCategory = data[0].category;
      foundData = data;
      return data[0];
    })
  );

  if (!foundData) {
    return {
      notFound: true,
    };
  }

  const postsByCategory = postsByCategoryQuery(postCategory, context.params.id);
  await queryClient.prefetchQuery(["postsByCategory", context.params.id], () =>
    client.fetch(postsByCategory).then((data) => data)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default PostDetails;
