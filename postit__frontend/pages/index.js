import React, { useContext } from "react";
import { Context } from "../context/context";
import Link from "next/link";

import { Layout } from "../components";

const Home = () => {
  const { handleUserLogout } = useContext(Context);

  return (
    <Layout>
      <button
        className="font-extrabold text-black bg-white"
        type="button"
        onClick={handleUserLogout}
      >
        Logout
      </button>
      <Link href="/search">
        <p className="text-xl text-white cursor-pointer">Go to search</p>
      </Link>
    </Layout>
  );
};

export default Home;
