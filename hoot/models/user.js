import mongoose from "mongoose";
import bcrypt from "bcrypt"; // use "bcrypt" if that's what you installed

const { Schema, model } = mongoose;
const SALT_ROUNDS = 10;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  },
  { timestamps: true }
);

// Hide password when converting to JSON
userSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.password;
    return ret;
  },
});

// Hash password if it was modified/created
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
  } catch (err) {
    next(err);
  }
});

export default model("User", userSchema);
