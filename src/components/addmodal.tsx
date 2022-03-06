import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BsPlus } from "react-icons/bs/index";
import { item } from "../types/types";

interface props {
  setModal: Dispatch<SetStateAction<JSX.Element>>;
  child: JSX.Element;
}

const AddModal = ({ setModal, child }: props) => {
  const [data, setData] = useState<item[] | null>(null);

  let timeout: NodeJS.Timeout;
  let keyword = "";

  const searchItem = async (keyword: string): Promise<item[] | null> => {
    const res = await fetch(`/api/search?keyword=${keyword}`);
    if (res.status === 200) return await res.json();
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
    <div className="bg-black bg-opacity-50 absolute inset-0 z-10 flex justify-center items-center">
      <div className="flex flex-col bg-s-blue-300 rounded modal-dim p-5">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl">Add New Item</h1>
          <BsPlus
            className="ml-auto rotate-45 hover:cursor-pointer hover:text-s-red transition ease-in-out duration-250 hover:scale-125"
            size={32}
            onClick={() => setModal(<></>)}
          />
        </div>
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
        </div>
        {child}
      </div>
    </div>
  );
};

export default AddModal;
