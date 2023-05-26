import mongoose from "mongoose";

//single-/multi-select
//freitext
//slider
const surveySchema = mongoose.Schema({
    name: { type: String, required: true },
    isMultiSelect: { type: Boolean, required: true }, //if not multiselect, then its single select
    questions: [ { question: String, answerOptions: [ { text: String, answers: [ { userID: { type: String, required: true}, text: String } ] } ] },  ]
});



export default mongoose.model("Survey", surveySchema);