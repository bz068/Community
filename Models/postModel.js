const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  issuedAt: {
    type: Date,
    default: new Date(),
  },
  comments: [String],
});

const Post = mongoose.model("post", productSchema);
module.exports = Post;
