import { Document } from 'mongoose';

export interface NewsEntity extends Document {
  // _id is implicitly part of Document, often accessed via id virtual
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;

  category: string;
  tags?: string[];

  author?: string;
  sourceUrl?: string;

  publishedAt: Date;

  isFeatured?: boolean;

  views?: number;
  // likes?: number; // Not currently in schema
}
