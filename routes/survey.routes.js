import express from "express";

import { create } from "../controllers/survey.controller.js";

const router = express.Router();

router.post("/", create);

export default router;
