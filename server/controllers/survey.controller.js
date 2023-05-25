import SurveyModel from "../models/survey.model.js";

export const create = async (req, res) => {
    const survey = req.body;

    const newSurvey = new SurveyModel(survey);

    try{
        
        await newSurvey.save();

        res.status(201).json(newSurvey);

    } catch (error) {
    res.status.json({ message: "Something went wrong" });
  }
}

export const vote = async (req, res) => {
    try{

        const { id: _id, aId: answerOptionsId } = req.params;

        const newSurvey = await SurveyModel.findByIdAndUpdate(_id, 
                {
                    $push: {
                    "answerOptions.$[option].answers": {
                            userID: req.userId,
                            text: "Moin"
                        },
                    },    
                },
                {
                    new: true,
                    arrayFilters: [ { "option._id": answerOptionsId } ]
                },
                // {
                //     $set: {
                //     answerOptions: [
                //         {
                //         id: answerOptionsId,
                //         answers: [
                //             {
                //                 userID: req.userID,
                //             },
                //         ],
                //         },
                //     ],
                //     },
                // },
            //     {
            //     new: true,

            // },
        );

        console.log();

        res.json(newSurvey);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
}
