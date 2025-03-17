import mongoose from "mongoose";
import { generateUniqueCustomId } from "../utils/customIdGenerator.js";

const farewellCoverBeneficiarySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    relationshipWithBeneficiary: {
      type: String,
      trim: true,
      required: true,
    },
    subscriberDetails: {
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
        validate: {
          validator: function (v) {
            return /^\d{10,15}$/.test(v); // Basic phone number validation (10 to 15 digits)
          },
          message: (props) => `${props.value} is not a valid phone number!`,
        },
      },
    },
    beneficiaryPersonalDetails: {
      title: {
        type: String,
        trim: true,
        required: true,
      },
      firstName: {
        type: String,
        trim: true,
        required: true,
      },
      lastName: {
        type: String,
        trim: true,
        required: true,
      },
      // email: {
      //   type: String,
      //   trim: true,
      //   required: true,
      // },
      photo: {
        type: String,
        // required: true,
      },
      phoneNumber: {
        type: String,
        trim: true,
        required: true,
      },
      dob: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum: ["male", "female", "Male", "Female"],
        required: true,
      },
      address: {
        stateOfResidence: {
          type: String,
          trim: true,
          required: true,
        },
        localGovtOfResidence: {
          type: String,
          trim: true,
          required: true,
        },
        detailedResidentialAddress: {
          type: String,
          trim: true,
          required: true,
        },
      },
    },
    beneficiaryHealthDetails: {
      healthCondition: {
        type: String,
        trim: true,
        required: true,
      },
    },
    subscriptionDetails: {
      farewellPlan: {
        type: String,
        enum: ["Pink Diamond Plan", "Blue Diamond Plan", "Red Diamond Plan"],
        trim: true,
        required: true,
      },
      serviceBenefitWorth: {
        type: Number,
        min: 0,
      },
      serviceDuration: {
        type: String,
        enum: ["per quarterly", "per bi-annual", "per annual"],
        trim: true,
        required: true,
      },
      subscriptionAmount: {
        type: Number,
        required: true,
        min: 0,
        required: true,
      },
      subscriptionStatus: {
        type: String,
        default: "inactive",
        required: true,
        trim: true,
      },
      autoRenewal: {
        type: String,
        enum: ["on", "off"],
        trim: true,
      },
      paymentMethod: {
        type: String,
        trim: true,
      },
      nextRenewal: {
        type: Date,
      },
      referralCode: {
        type: String,
        trim: true,
      },
      referrerName: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate a unique ID before saving the document
farewellCoverBeneficiarySchema.pre("validate", async function (next) {
  if (!this._id) {
    this._id = await generateUniqueCustomId("SFC-");
  }
  next();
});

export default mongoose.model("FarewellCover", farewellCoverBeneficiarySchema);
