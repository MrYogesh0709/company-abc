import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: "string",
      required: true,
    },
    ip: {
      type: "string",
      required: true,
    },
    userAgent: {
      type: "string",
      required: true,
    },
    isValid: {
      type: "boolean",
      default: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Token", TokenSchema);
