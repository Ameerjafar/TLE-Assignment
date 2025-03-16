import { fetchLeetcodeContests } from "../api/leetcode";
import { LeetcodeType } from "../types";
export const leetCodeContestsServices = async () => {
  const { leetCodeContests, titles, videoLink } = await fetchLeetcodeContests();

  const leetcodefilterContests: LeetcodeType[] = [];
  leetcodefilterContests.push(leetCodeContests[0], leetCodeContests[1]);
  const titleNumber: string[] = [];
  const contestNumber: string[] = [];
  titles.forEach((title) => {
    titleNumber.push(title.split(" ").reverse()[1]);
  });
  leetCodeContests.forEach((contest) => {
    contestNumber.push(contest.title.split(" ")[2]);
  });
  titleNumber.forEach((titleNumber, ind) => {
    const present = contestNumber.indexOf(titleNumber);
    if (present !== -1) {
      leetCodeContests[present].solutionLink = videoLink[ind];
      leetcodefilterContests.push(leetCodeContests[present]);
    }
  });
  return leetcodefilterContests;

};
