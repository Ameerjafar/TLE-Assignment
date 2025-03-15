import { useState, useEffect } from "react";
import { fetchCodeforcesContest } from "../api/codeForces";
import { fetchLeetcodeContests } from "../api/leetcode";
import { fetchCodeChefContests } from "../api/codeChef";
import { CodeForcesType, LeetcodeType, CodeChefType } from "../types";
import ContestCard from "../ui/ContestCard";

const Contest = () => {
  const [codeForcesContests, setCodeForcesContests] = useState<
    CodeForcesType[]
  >([]);
  const [leetcodeContests, setLeetcodeContests] = useState<LeetcodeType[]>([]);
  const [codeChefUpComingContests, setCodeChefUpComingContests] = useState<
    CodeChefType[]
  >([]);
  const [codeChefPastContests, setCodeChefPastContests] = useState<
    CodeChefType[]
  >([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["all"]);
  const [selectedContestTypes, setSelectedContestTypes] = useState<string[]>([
    "all",
  ]);

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

  const getFilteredContests = () => {
    const allContests = [
      ...codeForcesContests.map((contest) => ({
        name: contest.name,
        date: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
        platform: "codeforces",
        type: contest.phase.toLowerCase() === "before" ? "upcoming" : "past"
      })),
      ...leetcodeContests.map((contest) => ({
        name: contest.title,
        date: new Date(contest.startTime * 1000).toLocaleString(),
        platform: "leetcode",
        type: "upcoming",
      })),
      ...codeChefUpComingContests.map((contest) => ({
        name: contest.contest_name,
        date: contest.contest_start_date,
        platform: "codechef",
        type: "upcoming",
      })),
      ...codeChefPastContests.map((contest) => ({
        name: contest.contest_name,
        date: contest.contest_start_date,
        platform: "codechef",
        type: "past",
      })),
    ];

    return allContests.filter((contest) => {
      const platformMatch =
        selectedPlatforms.includes("all") ||
        selectedPlatforms.includes(contest.platform);
      const typeMatch =
        selectedContestTypes.includes("all") ||
        selectedContestTypes.includes(contest.type);
      return platformMatch && typeMatch;
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-1/4 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className = 'flex'>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Platform</h3>
            {["all", "codeforces", "leetcode", "codechef"].map((platform) => (
              <label key={platform} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform)}
                  onChange={() => handlePlatformChange(platform)}
                  className="mr-2"
                />
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </label>
            ))}
          </div>
          <button onClick={() => {
            setSelectedPlatforms(['all'])
          }} className = 'flex font-semibold ml-48'>Clear</button>
        </div>
        <div>
          <div className="flex">
            <div>
              <h3 className="font-semibold mb-2">Contest Type</h3>
              {["all", "upcoming", "past"].map((type) => (
                <label key={type} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedContestTypes.includes(type)}
                    onChange={() => handleContestTypeChange(type)}
                    className="mr-2"
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
            <button onClick = {
              () => {
                setSelectedContestTypes(['all']);
              }
            }  className="flex font-semibold ml-48">
              Clear
            </button>
          </div>
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
