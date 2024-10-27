import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    verificationCode: {
        type: String, 
      },
      isVerified: {
        type: Boolean,
        default: false, 
      }, 
      selectedCategories:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
