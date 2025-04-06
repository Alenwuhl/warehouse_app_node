import mongoose from "mongoose";


const userSchema = {
    id: {
        type: String,
        required: true,
        unique: true,
    },
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