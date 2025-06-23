import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true, trim: true, unique: true }) // Assuming category names (and slugs) should be unique
  name: string;

  @Prop({ required: true, trim: true, unique: true })
  slug: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category' }) // Self-referencing for parent category
  parentCategory?: Category; // Store as ObjectId, Mongoose can populate it

  @Prop()
  iconUrl?: string;

  @Prop()
  imageUrl?: string;

  @Prop()
  displayOrder?: number;

  @Prop({ default: false })
  isFeatured?: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// Optional: Add an index for frequently queried fields like slug or parentCategory
CategorySchema.index({ slug: 1 });
CategorySchema.index({ parentCategory: 1 });
