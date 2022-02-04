import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const varificationSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

varificationSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const hash = await bcrypt.hash(this.token, 8);
    this.token = hash;
  }
  next();
});

varificationSchema.methods.compareOTP = async function (token) {
  const result = await bcrypt.compareSync(token, this.token);
  return result;
};

const VarificationOTP = mongoose.model("VerificationOTP", varificationSchema);

export default VarificationOTP;