import mongoose from "mongoose";

const inquerySchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  response: {
    type: String,
    required: false,
    default: "",
  },
});


const Inquery = mongoose.model("inqueries", inquerySchema);

export default Inquery;
