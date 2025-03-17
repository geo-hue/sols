import mongoose from 'mongoose';
import { generateUniqueCustomId } from '../utils/customIdGenerator.js';

const healthyEldersClubBeneficiarySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    subscriberDetails:{
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
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
      }
    },
    beneficiaryDetails: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
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
        trim: true,
        validate: {
          validator: function (v) {
            return /^\d{10,15}$/.test(v); // Basic phone number validation (10 to 15 digits)
          },
          message: (props) => `${props.value} is not a valid phone number!`,
        },
      },
      location: {
        state: {
          type: String,
          trim: true,
          required: true,
        },
        city: {
          type: String,
          trim: true,
          required: true,
        },
        detailedAddress: {
          type: String,
          required: true,
          trim: true,
        },
      },
    },
    paymentInformation: {
      membershipFee: {
        type: Number,
        min: 0,
        default: 1000
      },
      totalAmountToBePaid: {
        type: Number,
        default: 12000,
        min: 0,
        // required: true,
      },
      autoRenewal: {
        type: String,
        enum: ['on', 'off'],
        default: 'on', // Set a default value
      },
      paymentMethod: {
        type: String,
        trim: true,
        default: "card"
      },
      status: {
        type: String,
        enum: ['unverified', 'verified'],
        default: 'unverified',
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

healthyEldersClubBeneficiarySchema.pre("validate", async function (next) {
  if (!this._id) {
    this._id = await generateUniqueCustomId("HEC-");
  }
  next();
});

export default mongoose.model('HealthyEldersClub', healthyEldersClubBeneficiarySchema);
