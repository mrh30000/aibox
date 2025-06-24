import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Enables createdAt and updatedAt
export class MCPTutorial extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  summary: string;

  @Prop()
  imageUrl?: string;

  @Prop()
  externalTutorialUrl?: string;

  // @Prop({ unique: true, sparse: true }) // If we create internal detail pages
  // internalDetailPageSlug?: string;

  @Prop()
  publishDate?: Date;

  @Prop()
  viewCount?: number;

  @Prop([String])
  tags?: string[];
}

export const MCPTutorialSchema = SchemaFactory.createForClass(MCPTutorial);

MCPTutorialSchema.index({ title: 1 });
MCPTutorialSchema.index({ publishDate: -1 });
MCPTutorialSchema.index({ viewCount: -1 });
