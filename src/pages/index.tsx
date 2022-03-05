import type { NextPage } from "next";
import Navbar from "../components/navbar";
import Main from "../layout/main";

const Home: NextPage = () => {
  return (
    <Main>
      <Navbar />
      <section className="text-center mt-20">
        <h1 className="font-bold text-7xl 2xl:text-8xl text-s-yellow">s-inv</h1>
        <h2 className="font-bold text-3xl 2xl:text-4xl">Making your life simple.</h2>
      </section>
    </Main>
  );
};

export default Home;
