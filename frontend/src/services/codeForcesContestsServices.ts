import { fetchCodeforcesContest } from "../api/codeForces";
import { CodeForcesType } from "../types";

export const codeForcesContestsServices = async () => {
  const { codeForcesContests, videoLink, codeForcesContestTitles } =
    await fetchCodeforcesContest();
  const filterCodeForcesContests: CodeForcesType[] = [];
  const contestsName: string[] = [];
  codeForcesContests?.forEach((contest) => {
    if (contest.type === "BEFORE") filterCodeForcesContests.push(contest);
    contestsName.push(
      contest.name.toLowerCase().replace(/\s/g, "").replace(/\.|,/g, "")
    );
  });
//   console.log("This is contestName", contestsName);
//   console.log("This is the codeforces title", codeForcesContestTitles);
  codeForcesContestTitles.forEach((title: string, ind) => {
    console.log(title.toLowerCase().replace(/\s/g, ""));
    const present = contestsName.indexOf(
      title.toLowerCase().replace(/\s/g, "")
    );
    if (present !== -1) {
      codeForcesContests[present].solutionLink = videoLink[ind];
      filterCodeForcesContests.push(codeForcesContests[present]);
    }
  });
  return filterCodeForcesContests;
};
