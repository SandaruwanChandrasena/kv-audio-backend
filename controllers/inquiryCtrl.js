import Inquiry from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./userCtrl.js";

export async function addInquery(req, res) {
  try {
    if (isItCustomer) {
      const data = req.body;

      data.email = req.user.email;
      data.phone = req.user.phone;

      let id = 0;

      const inquiries = await Inquiry.find().sort({ id: -1 }).limit(1);

      if (inquiries.length == 0) {
        id = 1;
      } else {
        id = inquiries[0].id + 1;
      }

      data.id = id;

      const newInquiry = new Inquiry(data);

      const response = await newInquiry.save();

      res.json({
        message: "Inquiry added Successfully",
        id: response.id,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Faield to add inquary",
      error: error.message,
    });
  }
}

export async function getInquiries(req, res) {
  try {
    if (isItCustomer(req)) {
      const inquiries = await Inquiry.find({ email: req.user.email });
      res.json(inquiries);

      return;
    } else if (isItAdmin(req)) {
      const inquiries = await Inquiry.find();
      res.json(inquiries);

      return;
    } else {
      res.status(403).json({
        message: "you are not authorized to do this action",
      });

      return;
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to get Inquiry",
      error: error.message,
    });
  }
}

export async function deleteInquiry(req, res) {

  try {

    if (isItAdmin(req)) {
      
      const id = req.params.id;
      await Inquiry.deleteOne({ id: id });
      res.json({ message: "Delete the Inquiry Successfully" });
      return;

    } else if (isItCustomer) {
      const id = req.params.id;
      const inquiry = await Inquiry.findOne({ id: id });

      if (inquiry == null) {
        res.status(404).json({ message: "Inquriry not Found" });
        return;

      } else {

        if (inquiry.email == req.user.email) {
          await Inquiry.deleteOne({ id: id });
          res.json({ message: "Your Inquiry deleted Successfully" });
          return;

        } else {
          res.status(403).json({ message: "Your are not authorized to do it" });
        }
      }

    } else {
      res.status(403).json({ message: "Your are not authorized to do it" });
    }

  } catch (error) {
    res.status(500).json({
      message: "Failed to get Inquiry",
      error: error.message,
    });
  }
}
