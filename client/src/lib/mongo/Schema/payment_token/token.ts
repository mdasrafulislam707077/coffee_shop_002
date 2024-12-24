import mongoose from "mongoose";

const schema = new mongoose.Schema({  
  items: { type: Array, required: true },
  email: { type: Object, required: true },
});
const Payment_token =
  mongoose.models.Payment_token || mongoose.model("Payment_token", schema);
export default Payment_token;
