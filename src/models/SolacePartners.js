import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const partnersSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    ownerPersonalInformation: {
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
      },
      nin: {
        type: String,
        required: true,
      },
      referralCode: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      }
    },
    businessInformation: {
      businessName: {
        type: String,
        required: true,
      },
      cacOrBnNumber: {
        type: String,
        required: true,
        trim: true,
      },
      cacCertificateProof: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      typeOfBusiness: {
        type: String,
        required: "Type of business is required",
      },
      numberOfShops: {
        type: Number,
        required: "Number of shop(s) is required",
      },
      location: {
        state: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        detailedAddress: {
          type: String,
          required: true,
        },
        proofOfAgentAddress: {
          type: String,
        },
      },
      partnershipInterest: {
        type: String,
        required: true,
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

export default mongoose.model("partners", partnersSchema);
