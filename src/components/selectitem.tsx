import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { item } from "../types/types";

interface props {
  data: item[] | null;
  setItem: Dispatch<SetStateAction<item | null>>;
  setData: Dispatch<SetStateAction<item[] | null>>;
}
const SelectItem = ({ data, setItem, setData }: props) => {
  let timeout: NodeJS.Timeout;
  let keyword = "";

  const searchItem = async (keyword: string): Promise<any> => {
    const res = await fetch(`/api/products?keyword=${keyword}`);
    if (res.status === 200) return (await res.json())["data"];
    return null;
  };

  const registerUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      keyword = e.target.value;
      setData(await searchItem(keyword));
    }, 250);
  };

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <h2 className="font-bold text-3xl mt-12 mb-4">
        What is the name of the item?
      </h2>
      <div className="mb-auto">
        <input
          type="text"
          className="bg-s-blue-100 w-80 h-15 p-2.5 rounded placeholder:text-white"
          placeholder="Search Product"
          onChange={(e) => registerUpdate(e)}
        />
      </div>
      {data && (
        <div className="overflow-y-auto text-center rounded mt-2  bg-s-blue-100">
          {data.map((item) => (
            <p
              onClick={() => setItem(item)}
              key={item.title}
              className="p-1 font-semibold hover:bg-s-red hover:rounded hover:cursor-pointer"
            >
              {item.title}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectItem;
