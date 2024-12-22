// Our Responsivle waiter's
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  imageItems: { type: Array, required: false },
  mainImage: { type: Object, required: true },
  _id: { type: String, required: true },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fb: {
    type: String,
    required: false,
  },
  SX: {
    type: String,
    required: false,
  },
  in: {
    type: String,
    required: false,
  },
  lin: {
    type: String,
    required: false,
  },
  prevId: {
    type: Number,
    required: false,
  },
});

const OurResponsivleWaiter =
  mongoose.models.OurResponsivleWaiter ||
  mongoose.model("OurResponsivleWaiter", schema);
export default OurResponsivleWaiter;
