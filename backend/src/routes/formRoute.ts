import express from "express";
import { authenticate } from "./authRoute.js";
import { createForm } from "../controllers/formController.js";

const router = express.Router();

router.post("/", authenticate, createForm);

export default router;
