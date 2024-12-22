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

const AboutHero =
  mongoose.models.AboutHero || mongoose.model("AboutHero", schema);
export default AboutHero;
