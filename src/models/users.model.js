import mongoose from "mongoose";


const userSchema = {
    name: String,
    password: String,
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