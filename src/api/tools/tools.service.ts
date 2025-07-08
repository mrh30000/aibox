import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tool } from '../../schemas/tool.schema';
import { ToolEntity } from '../../entities/tool.entity'; // For DTOs or type hints

// Basic DTOs for create and update operations
// These can be expanded with validation later (e.g., class-validator)
export class CreateToolDto {
  name: string;
  description: string;
  category: string; // Later, this could be Category ID
  websiteUrl: string;
  language: 'zh' | 'en' | 'other';
  iconUrl?: string;
  imageUrl?: string;
  longDescription?: string;
  subCategory?: string;
  tags?: string[];
  rating?: number;
  isFeatured?: boolean;
  hasFreeTrial?: boolean;
  isFreemium?: boolean;
  pricingModel?:
    | 'subscription'
    | 'one-time'
    | 'usage-based'
    | 'free'
    | 'contact_us';
  pricingDetails?: string;
  developer?: string;
  useCases?: string[];
  features?: string[];
  publishedAt?: Date;
}

export class UpdateToolDto extends CreateToolDto {}

@Injectable()
export class ToolsService {
  constructor(@InjectModel(Tool.name) private toolModel: Model<Tool>) {}

  async create(createToolDto: CreateToolDto): Promise<ToolEntity> {
    const newTool = new this.toolModel(createToolDto);
    const savedTool = await newTool.save();
    return savedTool.toObject({ getters: true, virtuals: true });
  }

  async findAll(): Promise<ToolEntity[]> {
    const tools = await this.toolModel.find().exec();
    return tools.map((tool) =>
      tool.toObject({ getters: true, virtuals: true }),
    );
  }

  async findOne(id: string): Promise<ToolEntity> {
    const tool = await this.toolModel.findById(id).exec();
    if (!tool) {
      throw new NotFoundException(`Tool with ID "${id}" not found`);
    }
    return tool.toObject({ getters: true, virtuals: true });
  }

  async update(id: string, updateToolDto: UpdateToolDto): Promise<ToolEntity> {
    const updatedTool = await this.toolModel
      .findByIdAndUpdate(id, updateToolDto, { new: true })
      .exec();
    if (!updatedTool) {
      throw new NotFoundException(`Tool with ID "${id}" not found`);
    }
    return updatedTool.toObject({ getters: true, virtuals: true });
  }

  async remove(id: string): Promise<ToolEntity> {
    const deletedTool = await this.toolModel.findByIdAndDelete(id).exec();
    if (!deletedTool) {
      throw new NotFoundException(`Tool with ID "${id}" not found`);
    }
    return deletedTool.toObject({ getters: true, virtuals: true });
  }
}
