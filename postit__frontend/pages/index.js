import React, { useContext } from "react";
import { Context } from "../context/context";
import Link from "next/link";

import { Layout } from "../components";

const Home = () => {
  const { handleUserLogout } = useContext(Context);

  return (
    <Layout>
      <button
        className="bg-white text-black font-extrabold"
        type="button"
        onClick={handleUserLogout}
      >
        Logout
      </button>
      <Link href="/search">
        <p className="text-white text-xl cursor-pointer">Go to search</p>
      </Link>
    </Layout>
  );
};

export default Home;
