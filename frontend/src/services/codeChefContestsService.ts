import { fetchCodeChefContests } from "../api/codeChef";
import { CodeChefType } from "../types";

export const codoChefContestsService = async () => {
  const { futureContests, pastContests, videos, codeChefTitle } =
    await fetchCodeChefContests();
  const filterCodeChefContests: CodeChefType[] = [];
  const contestsName: string[] = [];
  futureContests.forEach((contest: CodeChefType) => {
    filterCodeChefContests.push(contest);
    contestsName.push(
      contest.contest_name
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/\.|,/g, "")
        .split("(")[0]
    );
  });
  pastContests.forEach((contest: CodeChefType) => {
    contestsName.push(
      contest.contest_name
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/\.|,/g, "")
        .split("(")[0]
    );
  });
  for (let i = 0; i < contestsName.length; i++) {
    contestsName[i] = "codechef" + contestsName[i];
  }
//   console.log("This is the video", videos)
  console.log("This is contestName", contestsName);
  codeChefTitle.forEach((title: string, ind: number) => {
    console.log(title.toLowerCase().replace(/\s/g, ""));
    const present = contestsName.indexOf(
      title.toLowerCase().replace(/\s/g, "")
    );
    if (present !== -1 && present <= pastContests.length - 1) {
      console.log("This is the video", videos[ind])
        pastContests[present].solutionLink = videos[ind];

      filterCodeChefContests.push(pastContests[present]);
    }
  });
  return filterCodeChefContests;
};
