import mongoose from "mongoose";

const surveySchema = mongoose.Schema({
    name: { type: String, required: true },
    creator : { type: String, required: true},
    questions: [ { question: String, isSingleSelect: { type: Boolean, required: true }, answerOptions: [ { text: String, answers: [ { userID: { type: String, required: true}, text: String } ] } ] },  ]
});



export default mongoose.model("Survey", surveySchema);