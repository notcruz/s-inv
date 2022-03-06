import home from "../../public/home.png";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Navbar from "../components/navbar";
import Main from "../layout/main";
import { getSession } from "@auth0/nextjs-auth0";
import { useState } from "react";

const DEFAULT = "s-inv";
const NOT_DEFAULT = "sneaker-inventory";

const Index: NextPage = () => {
  const [text, setText] = useState(DEFAULT);
  return (
    <Main>
      <Navbar user={false} />
      <section className="text-center mt-14">
        <h1
          className="font-bold text-7xl 2xl:text-8xl text-s-red"
          onMouseEnter={() => setText(NOT_DEFAULT)}
          onMouseLeave={() => setText(DEFAULT)}
        >
          {text}
        </h1>
        <h2 className="font-bold text-3xl 2xl:text-4xl">
          Making your life simple.
        </h2>
        <Image src={home} alt="inventory picture" />
      </section>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);
  if (session)
    return { redirect: { permanent: false, destination: "/home" }, props: {} };
  return { props: {} };
};

export default Index;
