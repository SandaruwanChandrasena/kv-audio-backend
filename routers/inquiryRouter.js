import express from "express";
import { addInquery, getInquiries } from "../controllers/inquiryCtrl.js";

const inquiryRouter = express.Router();

inquiryRouter.post("/", addInquery);
inquiryRouter.get("/", getInquiries);

export default inquiryRouter;