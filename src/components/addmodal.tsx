import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs/index";
import { item } from "../types/types";
import ItemInfo from "./iteminfo";
import SelectItem from "./selectitem";

interface props {
  setModal: Dispatch<SetStateAction<JSX.Element>>;
}

const AddModal = ({ setModal }: props) => {
  const [data, setData] = useState<item[] | null>(null);
  const [item, setItem] = useState<item | null>(null);
  const [child, setChild] = useState<JSX.Element>(
    <SelectItem data={data} setItem={setItem} setData={setData} />
  );

  useEffect(() => {
    setChild(<SelectItem data={data} setItem={setItem} setData={setData} />);
  }, [data]);

  useEffect(() => {
    if (item !== null) setChild(<ItemInfo setModal={setModal} item={item} />);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

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
        {child}
      </div>
    </div>
  );
};

export default AddModal;
