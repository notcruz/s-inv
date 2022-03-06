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
import { ChangeEvent, useEffect, useState } from "react";

interface props {
  user: DiscordUser;
}

interface item {
  brand: string;
  objectID: string;
  colorway: string;
  productCategory: string;
  title: string;
  urlKey: string;
  retailPrice: number;
}

const OPTIONS = ["Inventory", "Wishlist"];
const TABLE_HEADERS = ["Name", "Price", "Size", "Brand", "Action"];

const Home = ({ user }: props) => {
  const [data, setData] = useState<item[] | null>(null);
  const [page, setPage] = useState<number>(1);

  let timeout: NodeJS.Timeout;
  let keyword = "";

  const registerUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      keyword = e.target.value;
      if (keyword !== "") {
        const res = await fetch(`/api/search?keyword=${keyword}`);
        if (res.status === 200) {
          const json = await res.json();
          setData(json);
        }
      } else {
        setData(null);
      }
    }, 250);
  };

  useEffect(() => {
    if (data !== null) {
      console.log(data);
    } else {
    }
  }, [data]);

  return (
    <Main>
      <div className="flex items-center my-auto m-10 space-x-5 max-height">
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
          <hr className="border w-full border-white" />
          <div className="space-y-5 my-auto">
            <h1 className="text-2xl font-bold">Statistics</h1>
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
        <div className="min-h-full border"></div>
        <div className="flex-1 h-full py-3 space-y-5 flex flex-col">
          <h1 className="text-4xl font-bold">Inventory</h1>
          <div className="space-x-5 flex">
            <button className="px-3  bg-s-red shadow-card rounded items-center transition ease-in-out font-semibold duration-250 hover:scale-105">
              Add New Item
            </button>
            <input
              type="text"
              className="bg-gray-500 p-2.5 rounded placeholder:text-white"
              placeholder="Search Item"
              onChange={(e) => registerUpdate(e)}
            />
          </div>
          <div>
            <table className="w-full divide-y-2 divide-white">
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
                {data &&
                  data.map((item) => (
                    <tr
                      key={item.title}
                      className="text-left hover:text-s-red hover:cursor-pointer"
                    >
                      <th className="py-4">{item.title}</th>
                      <th>{item.retailPrice}</th>
                      <th>11</th>
                      <th>{item.brand}</th>
                    </tr>
                  ))}
                {!data && <tr></tr>}
              </tbody>
            </table>
          </div>
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
