import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
// import { Category } from './category.schema'; // If referencing Category schema directly

@Schema({ timestamps: true }) // Enables createdAt and updatedAt
export class Tool extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ trim: true })
  longDescription?: string;

  @Prop({ required: true }) // Consider type: SchemaTypes.ObjectId, ref: 'Category' later
  category: string;

  @Prop()
  subCategory?: string;

  @Prop()
  iconUrl?: string;

  @Prop()
  imageUrl?: string;

  @Prop({ required: true })
  websiteUrl: string;

  @Prop([String])
  tags?: string[];

  @Prop({ type: String, enum: ['zh', 'en', 'other'], required: true })
  language: 'zh' | 'en' | 'other';

  @Prop()
  rating?: number;

  @Prop({ default: false })
  isFeatured?: boolean;

  @Prop()
  hasFreeTrial?: boolean;

  @Prop()
  isFreemium?: boolean;

  @Prop({ type: String, enum: ['subscription', 'one-time', 'usage-based', 'free', 'contact_us', 'freemium'] })
  pricingModel?: 'subscription' | 'one-time' | 'usage-based' | 'free' | 'contact_us' | 'freemium';

  @Prop()
  pricingDetails?: string;

  @Prop()
  developer?: string;

  @Prop([String])
  useCases?: string[];

  @Prop([String])
  features?: string[];

  @Prop()
  publishedAt?: Date;
}

export const ToolSchema = SchemaFactory.createForClass(Tool);
