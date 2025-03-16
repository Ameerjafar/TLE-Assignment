import { useState, useEffect } from "react";
import { Menu, X, Filter, BookmarkCheck, Bookmark } from "lucide-react";
import { leetCodeContestsServices } from "../services/leetCodeContestService";
import { CodeForcesType, LeetcodeType, CodeChefType } from "../types";
import ContestCard from "../ui/ContestCard";
import useBookmark from "../hooks/useBookmark";
import { codeForcesContestsServices } from "../services/codeForcesContestsServices";
import { codoChefContestsService } from "../services/codeChefContestsService";
import { useTheme } from "../context/ThemeContext";

const Contest = () => {
  const [codeForcesContests, setCodeForcesContests] = useState<CodeForcesType[]>([]);
  const [leetcodeContests, setLeetcodeContests] = useState<LeetcodeType[]>([]);
  const [codeChefContests, setCodeChefContests] = useState<CodeChefType[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["all"]);
  const [selectedContestTypes, setSelectedContestTypes] = useState<string[]>(["all"]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { addBookmark, removeBookmark, isBookmarked } = useBookmark();
  const { isDarkMode, toggleTheme } = useTheme(); // Use the theme context

  useEffect(() => {
    const fetchAllPlatformContests = async () => {
      try {
        setIsLoading(true);
        const [codeForcesData, leetcodeData, codeChefData] = await Promise.all([
          codeForcesContestsServices(),
          leetCodeContestsServices(),
          codoChefContestsService(),
        ]);

        setLeetcodeContests(leetcodeData || []);
        setCodeForcesContests(codeForcesData);
        setCodeChefContests(codeChefData);
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPlatformContests();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatforms((prev) => {
      if (platform === "all") {
        return ["all"];
      } else {
        const newPlatforms = prev.includes(platform)
          ? prev.filter((p) => p !== platform)
          : [...prev.filter((p) => p !== "all"), platform];
        return newPlatforms.length === 0 ? ["all"] : newPlatforms;
      }
    });
  };

  const handleContestTypeChange = (type: string) => {
    setSelectedContestTypes((prev) => {
      if (type === "all") {
        return ["all"];
      } else {
        const newTypes = prev.includes(type)
          ? prev.filter((t) => t !== type)
          : [...prev.filter((t) => t !== "all"), type];
        return newTypes.length === 0 ? ["all"] : newTypes;
      }
    });
  };

  const allContests = [
    ...codeForcesContests.map((contest) => ({
      name: contest.name,
      date: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
      platform: "codeforces",
      type: contest.phase.toLowerCase() === "before" ? "upcoming" : "past",
      solutionLink: contest.solutionLink,
    })),
    ...leetcodeContests.map((contest) => ({
      name: contest.title,
      date: new Date(contest.startTime * 1000).toLocaleString(),
      platform: "leetcode",
      type: new Date(contest.startTime * 1000) > new Date() ? "upcoming" : "past",
      solutionLink: contest.solutionLink,
    })),
    ...codeChefContests.map((contest) => ({
      name: contest.contest_name,
      date: contest.contest_start_date,
      platform: "codechef",
      type: new Date(contest.contest_start_date) < new Date() ? "past" : "upcoming",
      solutionLink: contest.solutionLink,
    })),
  ];

  const getFilteredContests = () => {
    let filteredContests = allContests.filter((contest) => {
      const platformMatch =
        selectedPlatforms.includes("all") ||
        selectedPlatforms.includes(contest.platform);
      const typeMatch =
        selectedContestTypes.includes("all") ||
        selectedContestTypes.includes(contest.type);
      return platformMatch && typeMatch;
    });

    if (showBookmarks) {
      filteredContests = filteredContests.filter((contest) =>
        isBookmarked(contest)
      );
    }

    return filteredContests;
  };

  const FilterCheckbox = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <label className="flex items-center mb-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 border-2 rounded transition-all duration-200 ${
            checked
              ? "border-blue-500 bg-blue-500"
              : "border-gray-300 bg-white group-hover:border-blue-400 dark:border-gray-600 dark:bg-gray-700"
          }`}
        >
          {checked && (
            <svg
              className="w-3 h-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-200 dark:text-gray-300 dark:group-hover:text-gray-100">
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </span>
    </label>
  );

  const Sidebar = () => (
    <div className="bg-white dark:bg-gray-800 shadow-lg p-6 h-full rounded-r-xl">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Filters</h2>
      </div>

      <div className="space-y-6">
        <div className="border-b pb-6 dark:border-gray-700">
          <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Platform</h3>
          {["all", "codeforces", "leetcode", "codechef"].map((platform) => (
            <FilterCheckbox
              key={platform}
              label={platform}
              checked={selectedPlatforms.includes(platform)}
              onChange={() => handlePlatformChange(platform)}
            />
          ))}
        </div>

        <div className="border-b pb-6 dark:border-gray-700">
          <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Contest Type</h3>
          {["all", "upcoming", "past"].map((type) => (
            <FilterCheckbox
              key={type}
              label={type}
              checked={selectedContestTypes.includes(type)}
              onChange={() => handleContestTypeChange(type)}
            />
          ))}
        </div>

        <button
          onClick={() => setShowBookmarks(!showBookmarks)}
          className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            showBookmarks
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {showBookmarks ? (
            <>
              <BookmarkCheck className="w-4 h-4" />
              Show All Contests
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4" />
              Show Bookmarks
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="lg:hidden bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Contests</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {isDarkMode ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-80 transform transition-transform duration-300 ease-out"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar />
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:w-80 sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold hidden lg:block text-gray-800 dark:text-gray-100">
                Coding Contests
              </h1>
              <button
                onClick={toggleTheme}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 hidden lg:flex"
              >
                {isDarkMode ? "🌙" : "☀️"}
              </button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : getFilteredContests().length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {getFilteredContests().map((contest, index) => (
                  <div
                    key={index}
                    className="transform transition-all duration-300 hover:translate-y-[-4px]"
                  >
                    <ContestCard
                      name={contest.name}
                      date={contest.date}
                      platform={contest.platform}
                      solutionLink={contest.solutionLink}
                      isBookmarked={isBookmarked(contest)}
                      onBookmark={() => addBookmark(contest)}
                      onRemoveBookmark={() => removeBookmark(contest)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-12 h-12" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                  No contests found
                </p>
                <p className="text-gray-400 dark:text-gray-500 mt-2">
                  Try adjusting your filters
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contest;