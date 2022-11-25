import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { Layout } from "../../components";
import {
  CoverImage,
  User,
  PageWrapper,
  LogoutButton,
  PostsList,
} from "../../components/User-Profile-Page";
import {
  postsByUserQuery,
  userQuery,
  postsSavedByUserQuery,
} from "../../utils/data";
import {
  fetchPostsByUser,
  fetchUser,
  fetchPostsSavedByUser,
} from "../../utils/fetchers";
import { useData } from "../../hooks/useData";
import { client } from "../../client/client";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const UserProfile = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { id } = router.query;

  const { data: user } = useData({
    queryKey: "userInfo",
    queryFn: fetchUser,
    id,
  });

  const {
    data: postsByUser,
    isFetching: isFetchingPostsByUser,
    refetch: refetchPostsByUser,
  } = useData({
    queryKey: "postsByUser",
    queryFn: fetchPostsByUser,
    id,
  });

  const {
    data: postsSavedByUser,
    isFetching: isFetchingPostsSavedByUser,
    refetch: refetchPostsSavedByUser,
  } = useData({
    queryKey: "postsSavedByUser",
    queryFn: fetchPostsSavedByUser,
    id,
  });

  return (
    <Layout
      title={`PostIt | ${user?.userName} Profile`}
      ogUrl={process.env.NEXT_PUBLIC_BASEURL + router.asPath}
      ogType="article"
    >
      <CoverImage firstPostCategory={postsByUser?.[0]?.category} />
      <PageWrapper>
        <User imageUrl={user?.image} username={user?.userName} />
        {user?._id === session?.user?.uid && <LogoutButton />}
        <PostsList
          numOfPosts={postsByUser?.length}
          descText="Posts by"
          username={user?.userName}
          posts={postsByUser}
          refresh={refetchPostsByUser}
          isFetching={isFetchingPostsByUser}
        />
        <PostsList
          numOfPosts={postsSavedByUser?.length}
          descText="Saved by"
          username={user?.userName}
          posts={postsSavedByUser}
          refresh={refetchPostsSavedByUser}
          isFetching={isFetchingPostsSavedByUser}
        />
      </PageWrapper>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  const user = userQuery(context.params.id);

  const postsByUser = postsByUserQuery(context.params.id);

  const postsSavedByUser = postsSavedByUserQuery(context.params.id);

  let foundData;

  const queriesToPrefetch = [
    queryClient.prefetchQuery(["userInfo", context.params.id], () =>
      client.fetch(user).then((data) => {
        foundData = data;
        return data[0];
      })
    ),
    queryClient.prefetchQuery(["postsByUser", context.params.id], () =>
      client.fetch(postsByUser).then((data) => data)
    ),
    queryClient.prefetchQuery(["postsSavedByUser", context.params.id], () =>
      client.fetch(postsSavedByUser).then((data) => data)
    ),
  ];

  await Promise.all(queriesToPrefetch);

  if (foundData.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default UserProfile;
