// src/schemas/faqitem.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class FAQItem extends Document {
  @Prop({ required: true, trim: true })
  question: string;

  @Prop({ required: true }) // Answer can be HTML, so no trim here by default
  answer: string;

  @Prop({ required: true, default: 0 })
  displayOrder: number;

  @Prop({ index: true }) // Indexed for efficient filtering if FAQs are categorized
  category?: string;
}

export const FAQItemSchema = SchemaFactory.createForClass(FAQItem);

FAQItemSchema.index({ category: 1, displayOrder: 1 }); // Compound index for common query
