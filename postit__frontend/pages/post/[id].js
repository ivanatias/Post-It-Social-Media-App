import React from "react";
import { dehydrate, QueryClient } from "react-query";
import {
  Layout,
  Posts,
  CommentsBox,
  SavedByBox,
  Loading,
  PostForm,
  ConfirmModal,
} from "../../components";
import {
  Header,
  PostImage,
  ActionButtons,
  PostContent,
  SavedByUsers,
  Comments,
  PageWrapper,
} from "../../components/Post-Details-Page";
import { useData } from "../../hooks/useData";
import { client } from "../../client/client";
import { postQuery, postsByCategoryQuery } from "../../utils/data";
import { fetchPost, fetchPostsByCategory } from "../../utils/fetchers";
import { useRouter } from "next/router";
import { useToggle } from "../../hooks/useToggle";
import { getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { deletePost } from "../../services/post/deletePost";

const PostDetails = () => {
  const { data: session } = useSession();

  const { value: openSavedByBox, toggleValue: toggleSavedByBox } = useToggle();

  const { value: editingPostMode, toggleValue: toggleEditingPostMode } =
    useToggle();

  const { value: deletingPost, toggleValue: toggleDeletingPost } = useToggle();

  const { value: openModal, toggleValue: toggleOpenModal } = useToggle();

  const router = useRouter();
  const { id } = router.query;

  const {
    data: postDetails,
    isFetching: isFetchingPostDetails,
    refetch: refetchPostDetails,
  } = useData({ queryKey: "postDetails", queryFn: fetchPost, id });

  const {
    data: postsByCategory,
    isFetching: isFetchingPostsByCategory,
    refetch: refetchPostsByCategory,
  } = useData({
    queryKey: "postsByCategory",
    queryFn: fetchPostsByCategory,
    category: postDetails?.category,
    id,
  });

  const handleDeletePost = async (postId) => {
    toggleDeletingPost();
    try {
      await deletePost(postId);
      toast.success("Post deleted!");
      router.push("/");
    } catch (err) {
      toast.error(`Couldn't delete the post due to an error: ${err.message}`);
    } finally {
      toggleDeletingPost();
    }
  };

  return (
    <Layout
      title={`PostIt | Post by ${postDetails?.postedBy?.userName}`}
      ogUrl={process.env.NEXT_PUBLIC_BASEURL + router.asPath}
      ogType="article"
      ogImage={postDetails?.image?.asset?.url}
    >
      <PageWrapper>
        {!editingPostMode ? (
          <>
            <Header
              avatarUrl={postDetails?.postedBy?.image}
              userTag={postDetails?.postedBy?.userTag}
              userId={postDetails?.postedBy?._id}
            />
            <PostImage imageUrl={postDetails?.image?.asset?.url} />
            {postDetails?.postedBy?._id === session?.user?.uid && (
              <ActionButtons
                toggleEditingPostMode={toggleEditingPostMode}
                toggleOpenModal={toggleOpenModal}
              />
            )}
            <PostContent
              postTitle={postDetails?.title}
              postDescription={postDetails?.description}
              postCategory={postDetails?.category}
            />
            <SavedByUsers
              numOfSaves={postDetails?.saved?.length}
              saves={postDetails?.saved}
              toggleSavedByBox={toggleSavedByBox}
            />
            <Comments numOfComments={postDetails?.comments?.length} />
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
                toggleSavedByBox={toggleSavedByBox}
              />
            )}
            {deletingPost && <Loading />}
          </>
        ) : (
          <PostForm
            editingPostMode={editingPostMode}
            toggleEditingPostMode={toggleEditingPostMode}
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
            toggleModal={toggleOpenModal}
            deletePost={handleDeletePost}
          />
        )}
      </PageWrapper>
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
