import { getSession, Session, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps, NextPage } from "next";
import Navbar from "../components/navbar";
import Main from "../layout/main";
import { DiscordUser } from "../types/types";
import { fetchUser } from "../utils/query";

const Home: NextPage<DiscordUser> = ({ user }: DiscordUser) => {
  return (
    <Main>
      <Navbar user={true} />
      <div>
        
      </div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const session = getSession(req, res) as Session;
    const user = await fetchUser(session.user as DiscordUser, true);
    if (!user)
      return {
        redirect: { permanent: false, destination: "/" },
        props: {},
      };
    return { props: {} };
  },
});

export default Home;
