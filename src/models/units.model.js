import mongoose from "mongoose";
const unitSchemma = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    unitCode: {
        type: String,
        required: true,
        unique: true
    },
    budget: {
        type: Number,
        required: true
    },
}
const Unit = mongoose.model("units", unitSchemma);
export default Unit;
  