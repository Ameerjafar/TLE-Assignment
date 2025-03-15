import { UICardType } from "../types";

const ContestCard = ({
  name,
  date,
  platform,
  isBookmarked = false,
  onBookmark,
  onRemoveBookmark,
}: UICardType) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
      <h2 className="text-lg font-bold text-gray-800">{name}</h2>
      <p className="text-gray-500">📅 {date}</p>
      <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
        {platform}
      </span>
      <button
        onClick={isBookmarked ? onRemoveBookmark : onBookmark}
        className={`mt-2 px-4 py-2 rounded-md text-sm font-semibold ${
          isBookmarked
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {isBookmarked ? "Remove Bookmark" : "Bookmark"}
      </button>
    </div>
  );
};

export default ContestCard;