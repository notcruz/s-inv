import { getSession, useUser } from "@auth0/nextjs-auth0";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Navbar from "../components/navbar";
import Main from "../layout/main";

const Index: NextPage = () => {
  return (
    <Main>
      <Navbar user={false} />
      <section className="text-center mt-20">
        <h1 className="font-bold text-7xl 2xl:text-8xl text-s-yellow">s-inv</h1>
        <h2 className="font-bold text-3xl 2xl:text-4xl">
          Making your life simple.
        </h2>
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
