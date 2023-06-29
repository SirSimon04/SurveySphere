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
        res.status(500).json({ message: "Something went wrong1" });
    }
}

export const getOwn = async (req, res) => {

    try {

        const surveys = await SurveyModel.find({ creator: req.userId });

        res.json(surveys);

    } catch (error){
        console.log(error);
        res.status(500).json({ message: "Es ist ein Fehler aufgetreten" });
    }
}

export const create = async (req, res) => {
    const survey = req.body;

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

export const voteAll = async (req, res) => {
  try {
    const { id: surveyId, selectedAnswers: answers} = req.body;
    const userID = req.userId;

    const survey = await SurveyModel.findById(surveyId);
    if (!survey) {
      return res.status(404).json({ message: 'Umfrage nicht gefunden' });
    }

    const existingAnswer = survey.questions.some((question, _) => 
        question.answerOptions.some((answerOption) => 
            answerOption.answers.some((answer) => 
                answer.userID === userID
        )
      )
    );

    if (existingAnswer) {
      return res.status(409).json({ message: 'Du hast bereits an dieser Umfrage teilgenommen' });
    }

    answers.forEach((answerIds, questionIndex) => {
        const question = survey.questions[questionIndex];
        answerIds.forEach((answerId) => {
            const answerOption = question.answerOptions.find(
            (option) => option._id.toString() === answerId
            );
            if (answerOption) {
            answerOption.answers.push({ userID });
            }
        });
    });

    await survey.save();

    res.status(200).json({ message: 'Alle Antworten wurden erfolgreich gespeichert' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Es ist ein Fehler aufgetreten' });
  }
};

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
