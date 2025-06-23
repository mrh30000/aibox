import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tool extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  url: string;

  @Prop()
  icon: string;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ToolSchema = SchemaFactory.createForClass(Tool);
