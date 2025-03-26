import mongoose, { Schema, model, models, Types, Document } from "mongoose";

interface BlogTranslation {
  language: string;
  title: string;
  markdownContent: string;
  author: string;
  shortDesc: string;
}


export interface BlogDocument extends Document {
  slug: string;
  timeToRead: number;
  imageUrl: string;
  cloudinaryPubicUrl: string;
  cloudinaryAssetId: string;
  tags: string[];
  translations: BlogTranslation[];
  categories: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<BlogDocument>(
  {
    slug: { type: String, required: true, unique: true },
    timeToRead: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    cloudinaryPubicUrl: { type: String, required: true },
    cloudinaryAssetId: { type: String, required: true },
    tags: [{ type: String }],
    translations: [
      {
        language: { type: String, required: true },
        title: { type: String, required: true },
        markdownContent: { type: String, required: true },
        author: { type: String, required: true },
        shortDesc: { type: String, required: true },
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);


const Blog = models.Blog || model<BlogDocument>("Blog", blogSchema);
export default Blog;
