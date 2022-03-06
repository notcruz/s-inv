import { getSession, Session, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Main from "../layout/main";
import { DiscordUser } from "../types/types";
import { fetchUser } from "../utils/query";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai/index";
import { MdOutlineInventory2 } from "react-icons/md/index";
import { BiDollarCircle } from "react-icons/bi/index";
import InfoBox from "../components/infobox";
import Link from "next/link";

interface props {
  user: DiscordUser;
}

const OPTIONS = ["Inventory", "Wishlist"];
const TABLE_HEADERS = ["Name", "Price", "Size", "Brand"];

const Home = ({ user }: props) => {
  console.log(user);
  return (
    <Main>
      <div className="flex items-center my-auto m-10 space-x-5">
        <div className="flex flex-col space-y-5 text-center items-center">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="flex-none">
                <Image
                  src={user.picture}
                  height={96}
                  width={96}
                  alt={`${user.name}'s profile picture`}
                  className="rounded"
                />
              </div>
              <h1 className="text-2xl font-bold">
                Welcome back,{" "}
                <span className="text-s-red shadow-code">{user.name}</span>
              </h1>
              <h2 className="text-lg font-semibold text-gray-500">
                {user.email}
              </h2>
            </div>
          </div>
          <hr className="w-full" />
          <div className="space-y-5 my-auto">
            <h1 className="text-2xl font-bold">Inventory Statistics</h1>
            <div className="space-y-10">
              <InfoBox
                icon={<MdOutlineInventory2 size={24} />}
                title={"Total Items"}
                value={"0"}
              />
              <InfoBox
                icon={<AiOutlineShoppingCart size={24} />}
                title={"Retail Value"}
                value={"$0"}
              />
              <InfoBox
                icon={<BiDollarCircle size={24} />}
                title={"Market Value"}
                value={"$0"}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full divide-y divide-gray-400">
            <thead>
              <tr>
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="font-bold text-xl py-2 text-left tracking-wider hover:cursor-pointer hover:opacity-75"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 text-lg overflow-clip max-w-xs">Supreme Boxreme Box Logo Supreme Supreme SupremeSupreme  BoxLogo Supreme Box Logo</td>
                <td className="py-2 px-4 text-lg">$160</td>
                <td className="py-2 px-4 text-lg">L</td>
                <td className="py-2 px-4 text-lg">Nike</td>
              </tr>
            </tbody>
          </table>
        </div>
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
