import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// middlewares
Schema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

Schema.methods.ConfirmPassword = async function (String_password) {
  const isMatch = bcrypt.compare(String_password, this.password);
  return isMatch;
};

export const UserModel = mongoose.models.user || mongoose.model("user", Schema);
