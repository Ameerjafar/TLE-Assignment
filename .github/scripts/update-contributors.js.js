const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const REPO = process.env.GITHUB_REPOSITORY; 
const README_FILE = path.join(__dirname, '../../README.md'); 
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchMergedPRContributors() {
  const url = `https://api.github.com/repos/Ameerjafar/TLE-Assignment/pulls?state=closed&per_page=100`;
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };

  try {
    const response = await axios.get(url, { headers });
    const mergedPRs = response.data.filter((pr) => pr.merged_at !== null); 
    const contributors = new Set(); 

    mergedPRs.forEach((pr) => {
      contributors.add(pr.user.login); 
    });

    return Array.from(contributors).map((login) => ({
      login,
      html_url: `https://github.com/${login}`,
    }));
  } catch (error) {
    console.error('Failed to fetch merged PR contributors:', error.message);
    process.exit(1);
  }
}

function updateReadme(contributors) {
  let readmeContent = fs.readFileSync(README_FILE, 'utf8');

  const contributorsList = contributors
    .map((contributor) => `- [${contributor.login}](${contributor.html_url})`)
    .join('\n');

  const startMarker = '<!-- CONTRIBUTORS_START -->';
  const endMarker = '<!-- CONTRIBUTORS_END -->';

  const newContributorsSection = `${startMarker}\n## Contributors\n\n${contributorsList}\n${endMarker}`;

  const updatedReadmeContent = readmeContent.replace(
    new RegExp(`${startMarker}[\\s\\S]*${endMarker}`),
    newContributorsSection
  );

  fs.writeFileSync(README_FILE, updatedReadmeContent, 'utf8');
  console.log('README.md updated with latest contributors.');
}

async function main() {
  const contributors = await fetchMergedPRContributors();
  updateReadme(contributors);
}

main();