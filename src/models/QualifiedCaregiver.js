import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const certifiedCaregiverSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    training: {
      isTrained: {
        type: String,
        required: true
      },
      schoolAttended: {
        type: String,
        required: true,
      },
      yearGraduated: {
        type: Date,
      },
      certificationProof: {
        type: String,
        required: true,
      },
    },
    specialty: {
      type: String,
      required: true,
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
    employment: {
      status: {
        type: String,
        required: true,
      },
      currentJobRole: {
        type: String,
        required: true,
      },
      currentWorkPlaceName: {
        type: String,
      },
      yearsWithCurrentEmployer: {
        type: Number,
      },
    },
    location: {
      stateOfResidence: {
        type: String,
        required: true,
      },
      cityOfResidence: {
        type: String,
        required: true,
      },
      currentResidentialAddress: {
        type: String,
        required: true,
      },
      residentialAddressProof: {
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

export default mongoose.model("QualifiedCaregiver", certifiedCaregiverSchema);
