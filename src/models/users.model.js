import mongoose from "mongoose";


const userSchema = {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "unitMember"],
        default: "unitMember",
    },
    unit: {
        type: String,
        required: true,
    },
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;