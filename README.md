
# The Competitive Programming Contest Tracker 

The Competitive Programming Contest Tracker is a tool designed to help programmers stay updated with upcoming coding contests from popular platforms like CodeChef, LeetCode, and Codeforces. It also integrates with YouTube to provide curated playlists for tutorials, solutions, and problem discussions related to these contests.

This project is built to simplify the process of tracking coding contests and accessing relevant learning resources in one place.

# VIDEO 
VIDEO LINK: https://drive.google.com/file/d/1oMbBBch5IKiU-lEfBCXS6OalJn61BPQa/view?usp=drive_link

# Note
I haven't received all the past contests from LeetCode, Codeforces, and CodeChef. I have only retrieved the contests that are available in the particular playlist.

# FEATURES

Contest Tracking: Fetch upcoming and past coding contests from:

CodeChef

LeetCode

Codeforces

YouTube Integration: Link contests to curated YouTube playlists for tutorials.
API Integration: Seamlessly integrates with third-party APIs to fetch contest data.

Customizable: Easily extendable to support more platforms or APIs.

## Workflow Overview
## Purpose
The workflow automatically updates the README.md file in your repository with a list of contributors whose PRs have been merged. This ensures that the README.md file always reflects the latest contributors without manual intervention.

# API USED

The project relies on the following APIs to fetch contest data and integrate with YouTube:

1. CodeChef API
Endpoint: https://www.codechef.com/api/list/contests/all

Description: This API fetches all upcoming and past contests from CodeChef. It provides details such as contest name, start time, end time, and contest URL.

Usage: Used to retrieve a list of contests hosted on CodeChef.

1. LeetCode API
Endpoint: https://leetcode.com/graphql

Description: This is a GraphQL API used to fetch contest details from LeetCode. It allows querying for upcoming contests, their timings, and other relevant information.

Usage: Used to retrieve contest data from LeetCode.

3. Codeforces API
Endpoint: https://codeforces.com/api/contest.list

Description: This API provides a list of all contests hosted on Codeforces, including past, upcoming, and upcoming contests. It includes details like contest ID, name, duration, and start time.

Usage: Used to fetch contest data from Codeforces.

1. YouTube API
Endpoint: https://youtube.googleapis.com/youtube/v3/playlistItems

Description: This API is used to fetch items from a specific YouTube playlist. It requires an API key for authentication and allows retrieving video details such as title, description, and video ID.

Usage: Used to fetch videos from curated playlists for tutorials, solutions, and discussions related to contests.

# Setup and Installation
git clone https://github.com/Ameerjafar/TLE-Assignment.git  

setup-frontend 

cd frontend

npm install or npm i(node has to be downloaded)
cp .env .env.sample
npm run dev

setup-backend

cd backend 

npm install or npm i 

cp .env .env.sample(fill the .env file)

tsc -b (build the typscript)

node dist/index.js(node has to be downoloaded)


<!-- CONTRIBUTORS_START -->
## Contributors

<!-- CONTRIBUTORS_END -->

for frontend you can listen on port: 5173

for backend you can listen on port: 3000



