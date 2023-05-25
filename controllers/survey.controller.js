import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
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
