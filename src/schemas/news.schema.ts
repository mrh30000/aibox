import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class News extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop()
  summary: string;

  @Prop()
  author: string;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News);
