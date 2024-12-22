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

const BlogHero =
  mongoose.models.BlogHero || mongoose.model("BlogHero", schema);
export default BlogHero;
