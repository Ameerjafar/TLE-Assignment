import axios from 'axios';

interface Contest {
  name: string;
  platform: string;
  date: string;
  startTimeSeconds?: number;
  startTime?: number;
  contest_start_date?: string;
}

export const checkAndSendReminders = async () => {
  try {
    const userEmail = localStorage.getItem('userEmail');
    const isGuest = localStorage.getItem('isGuest') === 'true';

    // Skip if guest or no email
    if (isGuest || !userEmail) {
      return;
    }

    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const currentTime = Date.now();
    const reminderThreshold = 30 * 60 * 1000; // 30 minutes

    const contestsToRemind = bookmarks.filter((contest: Contest) => {
      let contestStartTime: number;

      switch (contest.platform.toLowerCase()) {
        case 'codeforces':
          contestStartTime = contest.startTimeSeconds! * 1000;
          break;
        case 'leetcode':
          contestStartTime = contest.startTime! * 1000;
          break;
        case 'codechef':
          contestStartTime = new Date(contest.contest_start_date!).getTime();
          break;
        default:
          return false;
      }

      const timeUntilStart = contestStartTime - currentTime;
      return timeUntilStart > 0 && timeUntilStart <= reminderThreshold;
    });

    if (contestsToRemind.length > 0) {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/email/reminder`, {
        contests: contestsToRemind,
        userEmail
      });
    }
  } catch (error) {
    console.error('Error checking reminders:', error);
  }
};