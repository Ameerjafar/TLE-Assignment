import { useState, useEffect } from "react";
import { fetchCodeforcesContest } from "../api/codeForces";
import { fetchLeetcodeContests } from "../api/leetcode";
import { fetchCodeChefContests } from "../api/codeChef";
import { CodeForcesType, LeetcodeType } from "../types";

const Contest = () => {
  const [codeForcesContests, setCodeForcesContests] = useState<CodeForcesType[]>([]);
  const [leetcodeContests, setLeetcodeContests] = useState<LeetcodeType[]>([]);
  const [codeChefContests, setCodeChefContests] = useState([]);

  useEffect(() => {
    const fetchAllPlatformContests = async () => {
      try {
        const codeforcesData = await fetchCodeforcesContest();
        const leetcodeData = await fetchLeetcodeContests();
        const codechefData = await fetchCodeChefContests();
        setCodeForcesContests(codeforcesData);
        setLeetcodeContests(leetcodeData);
        setCodeChefContests(codechefData);
        console.log(leetcodeData);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };
    fetchAllPlatformContests();
  }, []);

  return (
    <div>
      <div>
        {codeForcesContests.length > 0 ? (
          codeForcesContests.map((contest) => (
            <div key={contest.id} className="text-red-500 font-bold">
              {contest.name}
            </div>
          ))
        ) : (
          <p>Loading Codeforces contests...</p>
        )}
      </div>

      <div>
        {leetcodeContests.length > 0 ? (
          leetcodeContests.map((contest, index) => (
            <div key={index} className="text-blue-500 font-bold">
              {contest.title}
            </div>
          ))
        ) : (
          <p>Loading LeetCode contests...</p>
        )}
      </div>
      {/* <div>
        {.length > 0 ? (
          leetcodeContests.map((contest, index) => (
            <div key={index} className="text-blue-500 font-bold">
              {contest.title}
            </div>
          ))
        ) : (
          <p>Loading LeetCode contests...</p>
        )}
      </div> */}
    </div>
  );
};

export default Contest;
