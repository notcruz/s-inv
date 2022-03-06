import { getSession, Session, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Main from "../layout/main";
import { DiscordUser } from "../types/types";
import { fetchUser } from "../utils/query";
import { AiOutlineShoppingCart } from "react-icons/ai/index";
import { MdOutlineInventory2 } from "react-icons/md/index";
import { BiDollarCircle } from "react-icons/bi/index";
import InfoBox from "../components/infobox";
import { useEffect, useState } from "react";
import AddModal from "../components/addmodal";
import { Item } from "@prisma/client";
import Link from "next/link";
import { STOCKX_BASE_URL } from "../utils/config";
import { BsTrash } from "react-icons/bs";

interface props {
  user: DiscordUser;
}

const OPTIONS = ["Inventory", "Wishlist"];
const TABLE_HEADERS = [
  "Name",
  "Retail",
  "Market",
  "Size",
  "Brand",
  "Color",
  "Category",
  "Options",
];

interface invProps {
  inventory: Item[];
}

const Home = ({ user }: props) => {
  const [modal, setModal] = useState<JSX.Element>(<></>);

  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [retail, setRetail] = useState<number>(0);
  const [market, setMarket] = useState<number>(0);
  const [inv, setInv] = useState<JSX.Element[] | JSX.Element>(<tr />);

  useEffect(() => {
    const fetchInv = async () => {
      const res = await fetch("/api/inventory");
      if (res.status === 200) {
        const inventory = (await res.json())["data"] as Item[];
        setItems(inventory);
      }
      return <tr></tr>;
    };
    fetchInv();
  }, [modal]);

  useEffect(() => {
    let retailSum = 0;
    let marketSum = 0;
    setInv(
      items.map((item) => {
        retailSum += item.purchase_price;
        return (
          <tr key={item.objectID} className="text-left hover:bg-s-red group">
            <th className="px-2 py-3">{item.name}</th>
            <th className="px-2 py-3">{item.purchase_price}</th>
            <Link href={STOCKX_BASE_URL + item.urlKey} passHref>
              <th className="px-2 py-3">0</th>
            </Link>
            <th className="px-2 py-3">{item.size}</th>
            <th className="px-2 py-3">{item.brand}</th>
            <th className="px-2 py-3">{item.color}</th>
            <th className="px-2 py-3">{item.category}</th>
            <th>
              <BsTrash
                onClick={async () => {
                  await fetch(`/api/inventory?id=${item.objectID}`, {
                    method: "DELETE",
                  });
                  setModal(<></>);
                  setInv(<tr />);
                }}
                className="text-s-red group-hover:text-white hover:cursor-pointer"
                size={24}
              />
            </th>
          </tr>
        );
      })
    );
    setTotal(items.length);
    setRetail(retailSum);
    setMarket(marketSum);
  }, [items]);

  return (
    <>
      {modal}
      <Main>
        <div className="flex items-center my-auto m-10 space-x-5 max-height ">
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
              <h1 className="text-3xl font-bold">Statistics</h1>
              <div className="space-y-10">
                <InfoBox
                  icon={<MdOutlineInventory2 size={24} />}
                  title={"Total Items"}
                  value={total.toString()}
                />
                <InfoBox
                  icon={<AiOutlineShoppingCart size={24} />}
                  title={"Retail Value"}
                  value={`$${retail.toString()}`}
                />
                <InfoBox
                  icon={<BiDollarCircle size={24} />}
                  title={"Market Value"}
                  value={`$${market.toString()}`}
                />
              </div>
            </div>
            <hr className="border w-full border-white" />
            <Link href="/api/auth/logout">
              <a className="text-xl text-s-red font-bold">Logout</a>
            </Link>
          </div>
          <div className="min-h-full border" />
          <div className="flex-1 h-full py-3 space-y-5 flex flex-col">
            <h1 className="text-4xl font-bold">Inventory</h1>
            <div className="space-x-5 flex">
              <button
                onClick={() => setModal(<AddModal setModal={setModal} />)}
                className="px-3 bg-s-red shadow-card rounded items-center transition ease-in-out font-semibold duration-250 hover:scale-105"
              >
                Add New Item
              </button>
              <input
                type="text"
                className="bg-s-blue-100 p-2.5 rounded placeholder:text-white"
                placeholder="Search Inventory"
              />
            </div>
            <div className="flex" style={{ minWidth: "50rem" }}>
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
                <tbody>{inv}</tbody>
              </table>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const session = getSession(req, res) as Session;
    if (!session)
      return {
        redirect: { permanent: false, destination: "/" },
        props: {},
      };
    await fetchUser(session.user as DiscordUser, true);
    return { props: {} };
  },
});

export default Home;
