import React from "react";
import Image from "next/image";
import { dehydrate, QueryClient } from "react-query";
import { Layout, Loading, Posts } from "../../components";
import {
  postsByUserQuery,
  userQuery,
  usersQuery,
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
import { useSession, signOut, getSession } from "next-auth/react";

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  const { data: user } = useData(["userInfo", id], fetchUser, id);

  const {
    data: postsByUser,
    isFetching: isFetchingPostsByUser,
    refetch: refetchPostsByUser,
  } = useData(["postsByUser", id], fetchPostsByUser, id);

  const {
    data: postsSavedByUser,
    isFetching: isFetchingPostsSavedByUser,
    refetch: refetchPostsSavedByUser,
  } = useData(["postsSavedByUser", id], fetchPostsSavedByUser, id);

  if (!session && typeof window !== "undefined") {
    router.push("/login");
  }
  return (
    <Layout
      title={`PostIt | ${user?.userName} Profile`}
      ogUrl={process.env.NEXT_PUBLIC_BASEURL + router.asPath}
      ogType="article"
    >
      {router.isFallback ? (
        <Loading />
      ) : (
        <>
          <div className="relative w-full h-[250px] 2xl:h-[350px]">
            <Image
              layout="fill"
              placeholder="blur"
              blurDataURL={`https://source.unsplash.com/1600x900/?${
                postsByUser[0]?.category || "nature"
              }`}
              src={`https://source.unsplash.com/1600x900/?${
                postsByUser[0]?.category || "nature"
              }`}
              alt="user-Cover-Pic"
              objectFit="cover"
              priority
            />
          </div>
          <section className="flex flex-col w-full gap-5 px-4 py-12 mx-auto max-w-7xl md:px-8 lg:px-10">
            <div className="flex flex-col justify-center items-center gap-8">
              <h1 className="text-center text-2xl 2xl:text-4xl text-white font-bold">
                {user?.userName}
              </h1>
              <div className="ring-2 ring-gray-100 p-1 flex items-center justify-center rounded-full w-60 h-60 2xl:w-80 2xl:h-80">
                <div className="relative w-full h-full">
                  <Image
                    src={user?.image}
                    layout="fill"
                    className="rounded-full"
                    alt="User Avatar"
                    objectFit="cover"
                  />
                </div>
              </div>
              {user?._id === session?.user?.uid && (
                <div className="w-full flex items-center justify-center">
                  <button
                    type="button"
                    className="mt-2 w-full max-w-[120px] rounded-lg text-base 2xl:text-lg text-white font-bold border-none outline-none bg-red-500 p-2 flex items-center justify-center transition duration-150 hover:bg-red-700"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    Logout
                  </button>
                </div>
              )}
              <div className="flex flex-col gap-2 mt-5 w-full">
                <span className="text-white text-base 2xl:text-xl font-bold">
                  Posts by {user?.userName}{" "}
                  {postsByUser?.length > 0 ? `(${postsByUser.length})` : `(0)`}
                </span>
                {postsByUser?.length > 0 ? (
                  <Posts
                    posts={postsByUser}
                    refresh={refetchPostsByUser}
                    isFetching={isFetchingPostsByUser}
                  />
                ) : (
                  <p className="text-sm 2xl:text-lg text-gray-400 w-full">
                    This user has not posted anything yet.
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-5 w-full">
                <span className="text-white text-base 2xl:text-xl font-bold">
                  Saved by {user?.userName}{" "}
                  {postsSavedByUser?.length > 0
                    ? `(${postsSavedByUser.length})`
                    : `(0)`}
                </span>
                {postsSavedByUser?.length > 0 ? (
                  <Posts
                    posts={postsSavedByUser}
                    refresh={refetchPostsSavedByUser}
                    isFetching={isFetchingPostsSavedByUser}
                  />
                ) : (
                  <p className="text-sm 2xl:text-lg text-gray-400 w-full">
                    This user has not saved any post yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const queryClient = new QueryClient();
  const user = userQuery(context.params.id);
  const postsByUser = postsByUserQuery(context.params.id);
  const postsSavedByUser = postsSavedByUserQuery(context.params.id);
  let foundUser;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  await queryClient.prefetchQuery(["userInfo", context.params.id], () =>
    client.fetch(user).then((data) => {
      foundUser = data;
      return data[0];
    })
  );

  if (!foundUser) {
    return {
      notFound: true,
    };
  }

  await queryClient.prefetchQuery(["postsByUser", context.params.id], () =>
    client.fetch(postsByUser).then((data) => data)
  );

  await queryClient.prefetchQuery(["postsSavedByUser", context.params.id], () =>
    client.fetch(postsSavedByUser).then((data) => data)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default UserProfile;
