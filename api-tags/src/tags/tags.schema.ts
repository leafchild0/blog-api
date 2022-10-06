import { Schema } from 'mongoose';

export const TagsSchema = new Schema(
  {
    name: { type: String, unique: true },
    description: String,
  },
  { timestamps: true },
);
