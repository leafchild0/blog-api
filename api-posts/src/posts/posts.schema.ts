import { Schema } from 'mongoose';

export const PostsSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    // Should be Schema.Types.ObjectId, but can't use it, due to bug in mongoose
    tags: [{ type: String, required: false }],
  },
  { timestamps: true },
);
