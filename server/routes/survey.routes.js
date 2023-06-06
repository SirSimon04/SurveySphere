import express from "express";

import { create, vote, find, getOwn, voteAll } from "../controllers/survey.controller.js";
import auth from "../midlleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, create);
router.post("/vote", auth, vote);
router.post("/vote/all", auth, voteAll)
router.get("/find/:id", find);
router.get("/own", auth, getOwn);

export default router;
