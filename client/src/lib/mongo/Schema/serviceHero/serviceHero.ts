import mongoose from "mongoose";

const schema = new mongoose.Schema({
  image: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ServiceHero =
  mongoose.models.ServiceHero || mongoose.model("ServiceHero", schema);
export default ServiceHero;
