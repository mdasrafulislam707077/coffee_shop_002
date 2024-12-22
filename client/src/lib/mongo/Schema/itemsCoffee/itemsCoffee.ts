import mongoose from "mongoose";

const schema = new mongoose.Schema({
  aiDescription: { type: String, required: true },
  description: { type: String, required: true },
  header: { type: String, required: true },
  _id: { type: String, required: true },
  imageItems: { type: Array, required: true },
  mainImage: { type: Object, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  prevId: { type: String, required: false },
  discount: { type: Number, required: false },
  heroDisplay: {
    type: Boolean,
    required: true,
  },
});
const ItemCoffee =
  mongoose.models.ItemCoffee || mongoose.model("ItemCoffee", schema);
export default ItemCoffee;
