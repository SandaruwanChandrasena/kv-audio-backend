import express from "express";
import { addInquery, deleteInquiry, getInquiries } from "../controllers/inquiryCtrl.js";

const inquiryRouter = express.Router();

inquiryRouter.post("/", addInquery);
inquiryRouter.get("/", getInquiries);
inquiryRouter.delete("/:id", deleteInquiry)

export default inquiryRouter;