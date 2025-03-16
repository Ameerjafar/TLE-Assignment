import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { leetCodeContestsServices } from "../services/leetCodeContestService";
import { CodeForcesType, LeetcodeType, CodeChefType } from "../types";
import ContestCard from "../ui/ContestCard";
import useBookmark from "../hooks/useBookmark";
import { codeForcesContestsServices } from "../services/codeForcesContestsServices";
import { codoChefContestsService } from '../services/codeChefContestsService'
const Contest = () => {
  const [codeForcesContests, setCodeForcesContests] = useState<
    CodeForcesType[]
  >([]);
  const [leetcodeContests, setLeetcodeContests] = useState<LeetcodeType[]>([]);
  const [ codeChefContests, setCodeChefContests] = useState<CodeChefType[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["all"]);
  const [selectedContestTypes, setSelectedContestTypes] = useState<string[]>([
    "all",
  ]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { addBookmark, removeBookmark, isBookmarked } = useBookmark();

  useEffect(() => {
    const fetchAllPlatformContests = async () => {
      try {
        const codeForcesContests: CodeForcesType[] = await codeForcesContestsServices();
        const leetcodeData = await leetCodeContestsServices();
        const codeChefContests: CodeChefType[] = await codoChefContestsService();
        setLeetcodeContests(leetcodeData || []);
        setCodeForcesContests(codeForcesContests);
        setCodeChefContests(codeChefContests);
        // setCodeChefUpComingContests(futureContests);
        // setCodeChefPastContests(pastContests);
      } catch (error) {
        console.error("Error fetching contests:", error);
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
      solutionLink: contest.solutionLink
    })),
    ...leetcodeContests.map((contest) => ({
      name: contest.title,
      date: new Date(contest.startTime * 1000).toLocaleString(),
      platform: "leetcode",
      type: new Date(contest.startTime * 1000) > new Date() ? "upcoming" : "past",
      solutionLink: contest.solutionLink
    })),
    ...codeChefContests.map((contest) => ({
      name: contest.contest_name,
      date: contest.contest_start_date,
      platform: "codechef",
      type: new Date(contest.contest_start_date) < new Date() ? "past" : "upcoming",
      solutionLink: contest.solutionLink
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

  const Sidebar = () => (
    <div className="bg-white shadow-md p-6 h-full">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Platform</h3>
        {["all", "codeforces", "leetcode", "codechef"].map((platform) => (
          <label
            key={platform}
            className="flex items-center mb-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedPlatforms.includes(platform)}
              onChange={() => handlePlatformChange(platform)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-colors duration-200"
            />
            <span className="ml-3 text-gray-700 group-hover:text-gray-900">
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Contest Type</h3>
        {["all", "upcoming", "past"].map((type) => (
          <label
            key={type}
            className="flex items-center mb-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedContestTypes.includes(type)}
              onChange={() => handleContestTypeChange(type)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-colors duration-200"
            />
            <span className="ml-3 text-gray-700 group-hover:text-gray-900">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </label>
        ))}
      </div>

      <button
        onClick={() => setShowBookmarks(!showBookmarks)}
        className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 ${
          showBookmarks
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {showBookmarks ? "Show All Contests" : "Show Bookmarks"}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="lg:hidden bg-white shadow-md p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Contests</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-white transform transition-transform duration-200 ease-in-out">
              <Sidebar />
            </div>
          </div>
        )}
        <aside className="hidden lg:block lg:w-80 sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </aside>

        <main className="flex-1 p-4 lg:p-8">
          <h1 className="text-2xl font-bold mb-6 hidden lg:block">Contests</h1>

          {getFilteredContests().length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {getFilteredContests().map((contest, index) => (
                <ContestCard
                  key={index}
                  name={contest.name}
                  date={contest.date}
                  platform={contest.platform}
                  solutionLink={contest.solutionLink}
                  isBookmarked={isBookmarked(contest)}
                  onBookmark={() => addBookmark(contest)}
                  onRemoveBookmark={() => removeBookmark(contest)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-gray-500 text-lg">No contests available.</p>
              <p className="text-gray-400 mt-2">Try adjusting your filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Contest;
