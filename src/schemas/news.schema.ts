import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Category } from './category.schema'; // If referencing Category schema directly

@Schema({ timestamps: true }) // Enables createdAt and updatedAt
export class News extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  excerpt: string;

  @Prop({ required: true })
  content: string; // Full content, likely HTML or Markdown

  @Prop()
  imageUrl?: string;

  @Prop({ required: true }) // Consider type: SchemaTypes.ObjectId, ref: 'Category' later
  category: string;

  @Prop([String])
  tags?: string[];

  @Prop()
  author?: string;

  @Prop()
  sourceUrl?: string;

  @Prop({ required: true })
  publishedAt: Date;

  @Prop({ default: false })
  isFeatured?: boolean;

  @Prop({ default: 0 })
  views?: number;
}

export const NewsSchema = SchemaFactory.createForClass(News);
