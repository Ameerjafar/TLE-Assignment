import { UICardType } from "../types";



const ContestCard = ({ name, date, platform }: UICardType) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
      <h2 className="text-lg font-bold text-gray-800">{name}</h2>
      <p className="text-gray-500">📅 {date}</p>
      <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
        {platform}
      </span>
    </div>
  );
};

export default ContestCard
