import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Enables createdAt and updatedAt
export class MCPServce extends Document { // Changed class name to MCPServce for convention
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ trim: true })
  longDescription?: string;

  @Prop()
  imageUrl?: string;

  @Prop()
  languageOrTech?: string;

  @Prop()
  userCountOrStars?: number;

  @Prop()
  rating?: number;

  @Prop({ default: false })
  isVerified?: boolean;

  @Prop()
  externalServiceUrl?: string;

  // @Prop({ unique: true, sparse: true }) // If we create internal detail pages with unique slugs
  // internalDetailPageSlug?: string;

  @Prop([String])
  tags?: string[];

  @Prop()
  addedToPlatformAt?: Date;
}

export const MCPServceSchema = SchemaFactory.createForClass(MCPServce);

MCPServceSchema.index({ name: 1 });
MCPServceSchema.index({ tags: 1 });
MCPServceSchema.index({ rating: -1 });
MCPServceSchema.index({ userCountOrStars: -1 });
