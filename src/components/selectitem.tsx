import { Dispatch, SetStateAction } from "react";
import { item } from "../types/types";

interface props {
  data: item[] | null;
  setItem: Dispatch<SetStateAction<item | null>>;
}
const SelectItem = ({ data, setItem }: props) => {
  return (
    data && (
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
    )
  );
};

export default SelectItem;
