import mongoose from "mongoose";

const schema = new mongoose.Schema({
  mapLink: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneList: {
    type: Array,
    required: true,
  },
  mediaList: {
    type: Array,
    required: true,
  },
});

const ContactInfo =
  mongoose.models.ContactInfo || mongoose.model("ContactInfo", schema);
export default ContactInfo;
