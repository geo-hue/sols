import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const certifiedUndertakerSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    cacOrBnNumber: {
      type: String,
      required: true
    },
    servicesOffered: {
      undertaking: {
        type: String,
        required: true,
      },
    },
    portraitPhoto: {
      type: String,
      required: true,
    },
    personalInfo: {
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
      nin: {
        type: String,
        required: true,
        unique: true
      },
    },
    officeLocation: {
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      address: {
        details: {
          type: String,
          required: true,
        },
        proof: {
          type: String,
          required: true,
        },
      },
    },
    verificationStatus: {
      type: String,
      required: true,
      enum: ["Verified", "Unverified"],
      default: "Unverified"
    }
  },
  { timestamps: true }
);

export default mongoose.model("CertifiedUndertaker", certifiedUndertakerSchema);
