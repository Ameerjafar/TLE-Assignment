import { useState, useEffect } from "react";
import { fetchCodeforcesContest } from "../api/codeForces";
import { fetchLeetcodeContests } from "../api/leetcode";
import { fetchCodeChefContests } from "../api/codeChef";
import { CodeForcesType, LeetcodeType, CodeChefType } from "../types";
import ContestCard from "../ui/ContestCard";

const Contest = () => {
  const [codeForcesContests, setCodeForcesContests] = useState<CodeForcesType[]>([]);
  const [leetcodeContests, setLeetcodeContests] = useState<LeetcodeType[]>([]);
  const [codeChefUpComingContests, setCodeChefUpComingContests] = useState<CodeChefType[]>([]);
  const [codeChefPastContests, setCodeChefPastContests] = useState<CodeChefType[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [contestType, setContestType] = useState<string>("all");

  useEffect(() => {
    const fetchAllPlatformContests = async () => {
      try {
        const codeforcesData = await fetchCodeforcesContest();
        const leetcodeData = await fetchLeetcodeContests();
        const { pastContests, futureContests } = await fetchCodeChefContests();

        setCodeForcesContests(codeforcesData);
        setLeetcodeContests(leetcodeData);
        setCodeChefUpComingContests(futureContests);
        setCodeChefPastContests(pastContests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchAllPlatformContests();
  }, []);

  const getFilteredContests = () => {
    let allContests = [
      ...codeForcesContests.map((contest) => ({
        name: contest.name,
        date: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
        platform: "Codeforces",
        type: "upcoming",
      })),
      ...leetcodeContests.map((contest) => ({
        name: contest.title,
        date: new Date(contest.startTime * 1000).toLocaleString(),
        platform: "LeetCode",
        type: "upcoming",
      })),
      ...codeChefUpComingContests.map((contest) => ({
        name: contest.contest_name,
        date: contest.contest_start_date,
        platform: "CodeChef",
        type: "upcoming",
      })),
      ...codeChefPastContests.map((contest) => ({
        name: contest.contest_name,
        date: contest.contest_start_date,
        platform: "CodeChef",
        type: "past",
      }))
    ];

    return allContests.filter((contest) => {
      return (selectedPlatform === "all" || contest.platform.toLowerCase() === selectedPlatform) &&
             (contestType === "all" || contest.type === contestType);
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-1/4 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Platform</h3>
          {["all", "codeforces", "leetcode", "codechef"].map((platform) => (
            <button
              key={platform}
              className={`block w-full text-left p-2 rounded-md ${
                selectedPlatform === platform ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedPlatform(platform)}
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contest Type</h3>
          {["all", "upcoming", "past"].map((type) => (
            <button
              key={type}
              className={`block w-full text-left p-2 rounded-md ${
                contestType === type ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setContestType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </aside>

      <main className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-4">Contests</h1>
        {getFilteredContests().length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredContests().map((contest, index) => (
              <ContestCard key={index} {...contest} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No contests available.</p>
        )}
      </main>
    </div>
  );
};

export default Contest;
