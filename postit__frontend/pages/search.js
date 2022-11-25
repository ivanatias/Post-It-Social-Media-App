import React, { useContext, useEffect } from "react";
import { Context } from "../searchContext";
import { Layout, Loading, NotSignedIn, Posts } from "../components";
import { useData } from "../hooks/useData";
import { useDebounce } from "../hooks/useDebounce";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { fetchSearchedPosts } from "../utils/fetchers";

const Search = () => {
  const { data: session } = useSession();
  const { searchTerm } = useContext(Context);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const router = useRouter();

  const {
    data: searchPosts,
    isFetching,
    refetch,
  } = useData({
    queryKey: "searchPosts",
    queryFn: fetchSearchedPosts,
    debouncedSearch,
  });

  if (!session) {
    return <NotSignedIn />;
  }

  return (
    <Layout
      title="PostIt App | Search"
      ogUrl={process.env.NEXT_PUBLIC_BASEURL + router.pathname}
    >
      <section className="w-full px-4 py-4 md:px-8 lg:px-10">
        {isFetching && <Loading />}
        {searchPosts?.length !== 0 && (
          <Posts
            posts={searchPosts}
            isFetching={isFetching}
            refresh={refetch}
          />
        )}
        {searchPosts?.length === 0 && debouncedSearch === "" && !isFetching && (
          <div className="text-lg text-white 2xl:text-2xl">
            Search posts by title or some description
          </div>
        )}
        {searchPosts?.length === 0 && debouncedSearch !== "" && !isFetching && (
          <div className="text-lg text-center text-white 2xl:text-2xl">
            No results found
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Search;
