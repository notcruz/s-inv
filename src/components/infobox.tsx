import { ReactChild } from "react";
import { props } from "../types/types";

interface propsExtended extends props {
  title: string;
  value: string;
  icon: ReactChild;
}

const InfoBox = ({ icon, title, value }: propsExtended) => {
  return (
    <div className="flex flex-col p-3 bg-s-red shadow-card rounded items-center transition ease-in-out duration-250 hover:scale-105">
      <div className="flex items-center space-x-1">
        {icon}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <h1 className="font-bold text-xl">{value}</h1>
    </div>
  );
};

export default InfoBox;
