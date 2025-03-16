import { FaYoutube } from "react-icons/fa"; 
import { UICardType } from "../types";

const ContestCard = ({
  name,
  date,
  platform,
  isBookmarked = false,
  onBookmark,
  solutionLink,
  onRemoveBookmark,
}: UICardType) => {
  const contestDate = new Date(date);
  const currentDate = new Date();

  const timeRemaining = contestDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesRemaining = Math.floor(
    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
  );

  const formattedDate = contestDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const isUpcoming = timeRemaining > 0;

  return (
    <div className="bg-white shadow-md p-4 md:p-6 rounded-lg border border-gray-200 w-full max-w-sm mx-auto transition-all duration-300 hover:shadow-lg">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-2 mb-2">{name}</h2>

      <div className="space-y-3">
        <p className="text-gray-500 text-sm md:text-base flex items-center gap-2">
          <span className="inline-block">📅</span>
          <span className="break-words">{formattedDate}</span>
        </p>

        {isUpcoming ? (
          <div className="text-sm md:text-base text-gray-600 bg-gray-50 p-2 rounded-md">
            <p className="font-medium">Time Remaining:</p>
            <p className="font-semibold text-blue-600">
              {daysRemaining > 0 ? `${daysRemaining}d ` : ""}
              {hoursRemaining}h {minutesRemaining}m
            </p>
          </div>
        ) : (
          <div className="text-sm md:text-base text-red-600 bg-red-50 p-2 rounded-md font-medium">
            Contest Ended
          </div>
        )}

        <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 pt-2">
          {/* Platform Badge */}
          <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full inline-block">
            {platform}
          </span>

          {/* Bookmark Button */}
          <button
            onClick={isBookmarked ? onRemoveBookmark : onBookmark}
            className={`flex-1 xs:flex-none px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 w-full xs:w-auto ${
              isBookmarked
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isBookmarked ? "Remove Bookmark" : "Bookmark"}
          </button>

          {solutionLink && (
            <a
              href={`${import.meta.env.VITE_YOUTUBE_SOLUTION_PLAYLIST}${solutionLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              <FaYoutube className="mr-2" /> 
              Solution
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestCard;