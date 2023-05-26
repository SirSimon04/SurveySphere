import express from "express";

import { create, vote, find } from "../controllers/survey.controller.js";
import auth from "../midlleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, create);
router.post("/vote",auth, vote);
router.get("/:id", auth, find)

export default router;
