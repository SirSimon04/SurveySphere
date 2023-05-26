import express from "express";

import { create, vote } from "../controllers/survey.controller.js";
import auth from "../midlleware/auth.middleware.js";

const router = express.Router();

router.post("/", create);
router.post("/vote",auth, vote);

export default router;
