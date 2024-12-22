import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  prodect_name: {
    type: String,
    required: true,
  },
  convert: {
    type: Boolean,
    required: false,
  },
});

const Favorite = mongoose.models.Favorite || mongoose.model("Favorite", schema);
export default Favorite;
