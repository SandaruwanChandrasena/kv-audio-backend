import Inquery from "../models/inquiry.js";
import { isItCustomer } from "./userCtrl.js";

export async function addInquery(req, res) {
   
   try{

      if(isItCustomer) {

         const data = req.body;

         data.email = req.user.email;
         data.phone = req.user.phone;
         
         let id = 0;

         const inquaries = await Inquery.find()
      }

   }catch(error) {
      res.status(500).json({
         message: "Faield to add inquary"
      })
   }
}