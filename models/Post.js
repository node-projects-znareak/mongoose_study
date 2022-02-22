const { Schema, model, Types } = require("mongoose");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: [100, "The posts title must have just 100 characters"],
      required: true,
    },
    body: {
      type: String,
      trim: true,
      maxlength: [4000, "The posts title must have just 4000 characters"],
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, collection: "Posts" }
);

module.exports = {
  PostSchema,
  Post: model("Post", PostSchema),
};
