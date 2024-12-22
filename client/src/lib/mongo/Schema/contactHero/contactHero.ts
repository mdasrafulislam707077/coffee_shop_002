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

const ContactHero =
  mongoose.models.ContactHero || mongoose.model("ContactHero", schema);
export default ContactHero;
