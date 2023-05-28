import SurveyModel from "../models/survey.model.js";

export const find = async (req, res) => {
    const { id: surveyID } = req.params;

    try{

        const survey = await SurveyModel.findById(surveyID);

        if (!survey) {
            res.status(404).json({ error: "Umfrage nicht gefunden"});
        return;
        }

        return res.json(survey);

    } catch (error){
        res.status.json({ message: "Something went wrong" });
    }
}

export const create = async (req, res) => {
    const survey = req.body;

    //TODO: destructuring of body, check if values are all given

    const newSurvey = new SurveyModel(survey);

    try{
        
        newSurvey.creator = req.userId;

        await newSurvey.save();

        res.status(201).json(newSurvey);

    } catch (error) {
        console.log(error);
        res.json({ message: "Something went wrong" });
  }
}

export const vote = async (req, res) => {
    try{

        const { surveyID, questionID, answerOptionID } = req.body;

        const userID = req.userId;

        const survey = await SurveyModel.findById(surveyID);

        if (!survey) {
            res.status(404).json({ error: "Umfrage nicht gefunden"});
        return;
        }

        const question = survey.questions.find((q) => q._id.toString() === questionID);

        if (!question) {
            res.status(404).json({ error: "Frage nicht gefunden"});
        return;
        }

        const answerOption = question.answerOptions.find((option) => option._id.toString() === answerOptionID);

        if (!answerOption) {
            res.status(404).json({ error: "Antwortoption nicht gefunden"});
        return;
        }

        if(!survey.isMultiSelect){
            question.answerOptions.forEach((option) => {
                const existingAnswer = option.answers.find((answer) => answer.userID === userID);
            if (existingAnswer) {
                option.answers.pull(existingAnswer._id);
            }
        });
        }

        const existingAnswer = answerOption.answers.find((answer) => answer.userID === userID);

        if (existingAnswer) {
            return res.status(400).json({ error: "Du hast bereits eine Antwort für diese Frage abgegeben abgegeben" });
        }

        const newAnswer = {
            userID: userID,
        };

        answerOption.answers.push(newAnswer);

        await survey.save();

        res.json(survey);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
}
