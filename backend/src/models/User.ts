import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export interface IUser {
  email: string;
  username: string;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email", //use email as the login field
});

export default mongoose.model("User", UserSchema);
