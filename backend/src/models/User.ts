import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
console.log(process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  googleId: { type: String, required: true, unique: true },
  picture: String,
  bookmarkedContests: [
    {
      name: String,
      platform: String,
      date: String,
      type: String,
      solutionLink: String,
    },
  ],
});

export const User = mongoose.model("User", userSchema);
