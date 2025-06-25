// src/schemas/infocard.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class InfoCard extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop()
  linkUrl?: string;

  @Prop({ default: false })
  isComingSoon?: boolean;

  @Prop({ required: true, default: 0 })
  displayOrder: number;

  @Prop({ required: true, index: true }) // Indexed for efficient filtering
  targetAudience: string;
}

export const InfoCardSchema = SchemaFactory.createForClass(InfoCard);

InfoCardSchema.index({ targetAudience: 1, displayOrder: 1 }); // Compound index for common query
