import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps, NextPage } from "next";
import Navbar from "../components/navbar";
import Main from "../layout/main";

const Home: NextPage = () => {
  return (
    <Main>
      <Navbar user={true} />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);
  if (!session)
    return { redirect: { permanent: false, destination: "/" }, props: {} };
  return { props: {} };
};

export default Home;
