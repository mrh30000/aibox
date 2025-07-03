import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
// import { Category } from './category.schema';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ trim: true })
  longDescription?: string;

  @Prop()
  projectUrl?: string;

  @Prop()
  repositoryUrl?: string;

  @Prop()
  demoUrl?: string;

  @Prop({ required: true }) // Consider type: SchemaTypes.ObjectId, ref: 'Category' later
  category: string;

  @Prop([String])
  tags?: string[];

  @Prop({ type: String, enum: ['active', 'archived', 'in-development'] })
  status?: 'active' | 'archived' | 'in-development';

  @Prop()
  license?: string;

  @Prop()
  imageUrl?: string;

  @Prop([String])
  screenshots?: string[];

  @Prop([String])
  programmingLanguages?: string[];

  @Prop([String])
  technologiesUsed?: string[];

  @Prop()
  stars?: number;

  @Prop()
  forks?: number;

  @Prop()
  contributors?: number;

  @Prop()
  lastCommitDate?: Date;

  @Prop({ default: false })
  isFeatured?: boolean;

  @Prop()
  projectCreatedAt?: Date;

  @Prop()
  projectUpdatedAt?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
