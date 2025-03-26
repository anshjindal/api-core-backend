const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    translations: [
      {
        language: { type: String },
        name: { type: String },
        description: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  },
);
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
