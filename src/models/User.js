import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
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
    password: {
      type: String,
      required: true,
      select: false,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10,15}$/.test(v); // Basic phone number validation (10 to 15 digits)
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    mostRecentOTP: {
      type: Number,
    },
    howDidYouHearAboutUs: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    walletStatus: {
      type: String,
      enum: ["not created", "created"],
      default: "not created",
    },
    walletFundingStatus: {
      type: String,
      enum: ["empty", "funded"],
      default: "empty",
    },
    userStatus: {
      type: String,
      enum: ["Verified", "Unverified"],
      default: "Unverified",
    },
    referralCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware
UserSchema.pre("save", async function (next) {
  const user = this;

  // Convert role to lowercase if it exists
  // if (user.role) {
  //   user.role = user.role.toLowerCase();
  // }

  // If password is not modified, skip hashing
  if (!user.isModified("password")) {
    return next();
  }

  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Users", UserSchema);
