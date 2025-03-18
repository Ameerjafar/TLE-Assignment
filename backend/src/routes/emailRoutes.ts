import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const emailRoute = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Format contest time based on platform
const formatContestTime = (contest: any) => {
  switch (contest.platform.toLowerCase()) {
    case 'codeforces':
      return new Date(contest.startTimeSeconds * 1000).toLocaleString();
    case 'leetcode':
      return new Date(contest.startTime * 1000).toLocaleString();
    case 'codechef':
      return new Date(contest.contest_start_date).toLocaleString();
    default:
      return 'Time not available';
  }
};

emailRoute.post('/reminder', async (req: Request, res: Response) => {
  try {
    const { contests, userEmail } = req.body;

    if (!contests || !userEmail) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Contest Reminder</h2>
        <p>You have the following contests starting in 30 minutes:</p>
        
        ${contests.map((contest: any) => `
          <div style="margin: 20px 0; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #1f2937; margin: 0 0 10px 0;">${contest.name}</h3>
            <p style="color: #4b5563; margin: 5px 0;">
              Platform: ${contest.platform}
            </p>
            <p style="color: #4b5563; margin: 5px 0;">
              Starts at: ${formatContestTime(contest)}
            </p>
          </div>
        `).join('')}
        
        <p style="color: #4b5563;">Good luck with your contests!</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: userEmail,
      subject: '🔔 Contest Starting Soon!',
      html: emailContent
    });

    res.json({ message: 'Reminder sent successfully' });
  } catch (error) {
    console.error('Error sending reminder:', error);
    res.status(500).json({ error: 'Failed to send reminder' });
  }
});

export default emailRoute;