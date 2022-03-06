import Image from "next/image";
import Link from "next/link";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { item } from "../types/types";
import { ITEM_IMAGE, STOCKX_BASE_URL } from "../utils/config";

interface props {
  setModal: Dispatch<SetStateAction<JSX.Element>>;
  item: item;
}

interface inputProps {
  value?: string | number;
  className?: string;
  register?: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
}

const CustomInput = ({
  value,
  className,
  register,
  name,
  placeholder,
}: inputProps) => {
  const merged = twMerge("bg-s-blue-100 h-8 p-2.5 rounded", className);
  return (
    <input
      name={name}
      type="text"
      className={merged}
      value={value && value.toString()}
      placeholder={placeholder && placeholder.toString()}
      onChange={register ? (e) => register(e) : undefined}
    />
  );
};

const PriceDiv = ({ price }: { price: string }) => {
  return (
    <div className="text-sm space-y-1">
      <h3>Market Price</h3>
      <CustomInput name={"market_price"} value={price + ".00"} />
    </div>
  );
};

const ItemInfo = ({ setModal, item }: props) => {
  const [div, setDiv] = useState(<PriceDiv price={"0"} />);
  const [size, setSize] = useState("");

  let timeout: NodeJS.Timeout;

  const searchItem = async (url: string): Promise<any> => {
    const res = await fetch(url);
    if (res.status === 200) return (await res.json())["data"];
    return null;
  };

  const registerUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      setSize(e.target.value);
      let res = await searchItem(
        `/api/market?key=${item.urlKey}&size=${e.target.value}`
      );
      if (res) {
        setDiv(<PriceDiv price={res[0]["localAmount"].toString()} />);
      }
    }, 500);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/add", {
      method: "POST",
      body: JSON.stringify({
        name: item.title,
        color: item.colorway,
        brand: item.brand,
        size: size,
        category: item.productCategory,
        purchase_price: item.retailPrice,
        image: item.media.thumbUrl,
        id: item.objectID,
        urlKey: item.urlKey,
      }),
    });
    setModal(<></>);
  };

  return (
    <form
      method="POST"
      action="/api/add"
      className="p-3 space-y-5 flex-1"
      onSubmit={(e) => onSubmit(e)}
    >
      <div className="flex space-x-5">
        <div className="text-sm space-y-1">
          <h3>Name</h3>
          <CustomInput name={"name"} className="w-64" value={item.title} />
        </div>
        <div className="text-sm space-y-1">
          <h3>Color</h3>
          <CustomInput name={"color"} className="w-36" value={item.colorway} />
        </div>
        <div className="text-sm space-y-1">
          <h3>Brand</h3>
          <CustomInput name={"brand"} className="w-20" value={item.brand} />
        </div>
        <div className="text-sm space-y-1">
          <h3>Size</h3>
          <CustomInput name="size" className="w-20" register={registerUpdate} />
        </div>
        <div className="text-sm space-y-1">
          <h3>Category</h3>
          <CustomInput
            name={"category"}
            className="w-20"
            value={item.productCategory}
          />
        </div>
      </div>
      <div className="flex space-x-5 flex-1">
        <div className="text-sm space-y-1">
          <h3>Purchase Price</h3>
          <CustomInput
            name={"purchase_price"}
            value={item.retailPrice.toString() + ".00"}
          />
        </div>
        {div}
        <div className="flex flex-1">
          <Link href={STOCKX_BASE_URL + item.urlKey}>
            <a target="_parent">
              <Image
                src={ITEM_IMAGE(item.shortDescription)}
                width={128}
                height={128}
                alt="item image"
                className="rounded"
              />
            </a>
          </Link>
          <div className="ml-auto mt-auto mr-3">
            <button
              type="submit"
              className="px-3 py-2 bg-s-red shadow-card rounded items-center transition ease-in-out font-semibold duration-250 hover:scale-105"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ItemInfo;
