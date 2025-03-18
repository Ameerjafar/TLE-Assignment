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
  for(let i = 0; i < codeChefTitle.length; i++) {
    codeChefTitle[i] = codeChefTitle[i].toLowerCase().replace(/\s/g, "")
  }
  // console.log("This is contestName fetch from the url", contestsName);
  // console.log("This is the contestName fetch from the youTube", codeChefTitle);
  // console.log("This is the you tube vidoe link", videos);
  contestsName.forEach((title: string) => {
    console.log(title.toLowerCase().replace(/\s/g, ""));
    const present = codeChefTitle.indexOf(
      title
    );
    if (present !== -1) {
      // console.log("This is the video", videos[ind])
        pastContests[present].solutionLink = videos[present];

      filterCodeChefContests.push(pastContests[present]);
    }
  });
  return filterCodeChefContests;
};
