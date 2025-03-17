import mongoose from "mongoose";

const WaitlistSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Basic email validation
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10,15}$/.test(v); // Basic phone number validation (10 to 15 digits)
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    stateOfResidence: {
      type: String,
      required: true,
    },
    cityOfResidence: {
      type: String,
      required: true,
    },
    whatInterestsYouAboutLaceAi: {
      type: String,
      required: true,
    },
    whereDidYouHearAboutUs: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LaceAiWaitlist", WaitlistSchema);
