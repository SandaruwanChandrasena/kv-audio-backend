import express from "express";
import { addInquery, deleteInquiry, getInquiries, updateInquiry } from "../controllers/inquiryCtrl.js";

const inquiryRouter = express.Router();

inquiryRouter.post("/", addInquery);
inquiryRouter.get("/", getInquiries);
inquiryRouter.delete("/:id", deleteInquiry)
inquiryRouter.put("/:id", updateInquiry)

export default inquiryRouter;