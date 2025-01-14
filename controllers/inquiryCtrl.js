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

      if(inquiries.length == 0) {
         id = 1;
      } else {
         id = inquiries[0].id + 1;
      }

      data.id = id;

      const newInquiry = new Inquiry(data);

      const response = await newInquiry.save();

      res.json({
         message: "Inquiry added Successfully",
         id: response.id
      })


    }
  } catch (error) {
    res.status(500).json({
      message: "Faield to add inquary",
      error:error.message
    });
  }
}

export async function getInquiries(req, res) {
   try{

      if(isItCustomer(req)) {
         const inquiries = await Inquiry.find({email: req.user.email});
         res.json(inquiries);
         
         return;

      } else if (isItAdmin(req)) {
         const inquiries = await Inquiry.find();
         res.json(inquiries);
         
         return;
      } else {
         res.status(403).json({
            message: "you are not authorized to do this action"
         })

         return;
      }

   } catch(error) {
      res.status(500).json({
         message: "Failed to get Inquiry",
         error: error.message
      })
   }
}
