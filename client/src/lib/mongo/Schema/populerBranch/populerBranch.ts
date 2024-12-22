import mongoose from "mongoose";

const populerBranch = new mongoose.Schema({
  data: {
    type: [Object],
    required: true,
  },
});

const PopulerBranch =
  mongoose.models.PopulerBranch ||
  mongoose.model("PopulerBranch", populerBranch);
export default PopulerBranch;
