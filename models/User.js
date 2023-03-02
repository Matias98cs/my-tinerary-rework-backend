import mongoose from "mongoose";
import brcypt from "brcypt";
import { v4 as uuidv4 } from "uuid";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  token: { type: String, default: uuidv4() },
  verified: { type: Boolean, default: false },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await brcypt.genSalt(10);
  this.password = await brcypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function (passwordForm) {
  return await brcypt.compareSync(passwordForm, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
