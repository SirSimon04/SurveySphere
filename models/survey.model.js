import mongoose from "mongoose";

const surveySchema = mongoose.Schema({
    name: { type: String, required: true },
});

export default mongoose.model("Survey", surveySchema);