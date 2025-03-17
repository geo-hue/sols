import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, expires: '1h', default: Date.now } 
});

const Blacklist = mongoose.model("Blacklists", blacklistSchema);
export default Blacklist;
