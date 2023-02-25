import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: [50, "Name can not be more than 100 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        msg: "Please provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["manager", "employee"],
      default: "employee",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};
export default mongoose.model("User", UserSchema);
