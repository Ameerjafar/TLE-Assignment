import { FaYoutube } from "react-icons/fa";
import { Calendar, Clock, Bookmark, BookmarkMinus } from "lucide-react";
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
    <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl border border-gray-100 dark:border-gray-700 w-full max-w-sm mx-auto transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-blue-100 dark:hover:border-blue-900">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 leading-tight line-clamp-2 flex-1 mr-4">
          {name}
        </h2>
        <span className="px-3 py-1 text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-sm whitespace-nowrap">
          {platform}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{formattedDate}</span>
        </div>

        {isUpcoming ? (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Time Remaining</span>
            </div>
            <p className="text-lg font-bold text-blue-700 dark:text-blue-300 mt-1">
              {daysRemaining > 0 ? `${daysRemaining}d ` : ""}
              {hoursRemaining}h {minutesRemaining}m
            </p>
          </div>
        ) : (
          <div className="bg-red-50 dark:bg-red-900 p-3 rounded-lg border border-red-100 dark:border-red-800">
            <p className="text-red-600 dark:text-red-200 font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Contest Ended
            </p>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={isBookmarked ? onRemoveBookmark : onBookmark}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              isBookmarked
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isBookmarked ? (
              <>
                <BookmarkMinus className="w-4 h-4" />
                Remove
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                Bookmark
              </>
            )}
          </button>

          {solutionLink && (
            <a
              href={`${import.meta.env.VITE_YOUTUBE_SOLUTION_PLAYLIST}${solutionLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow group"
              title="Watch Solution"
            >
              <FaYoutube className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestCard;