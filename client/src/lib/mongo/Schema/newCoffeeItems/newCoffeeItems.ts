import mongoose from "mongoose";

const schema = new mongoose.Schema({
  data: {
    type: [Object],
    required: true,
  },
});

const NewCoffeeItem =
  mongoose.models.NewCoffeeItem || mongoose.model("NewCoffeeItem", schema);
export default NewCoffeeItem;
