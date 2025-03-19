import mongoose, {Schema } from "mongoose";
const meetingSchema= new Schema(
    {
        name:{type: String},
        meetingCode:{type: String, required: true, unique: true},
        date:{type: Date, default:Date.now, required: true},
    }
)
const Meeting=mongoose.model("Meeting",meetingSchema);
export {Meeting};
