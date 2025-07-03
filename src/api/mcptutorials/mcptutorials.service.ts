import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MCPTutorial } from '../../schemas/mcptutorial.schema';
import { MCPTutorialEntity } from '../../entities/mcptutorial.entity';

// DTOs for MCPTutorial
export class CreateMCPTutorialDto {
    title: string;
    summary: string;
    imageUrl?: string;
    externalTutorialUrl?: string;
    publishDate?: Date;
    viewCount?: number;
    tags?: string[];
}

export class UpdateMCPTutorialDto extends CreateMCPTutorialDto {}

@Injectable()
export class MCPTutorialsService {
  constructor(@InjectModel(MCPTutorial.name) private mcptutorialModel: Model<MCPTutorial>) {}

  async create(createMCPTutorialDto: CreateMCPTutorialDto): Promise<MCPTutorialEntity> {
    const newTutorial = new this.mcptutorialModel(createMCPTutorialDto);
    return newTutorial.save();
  }

  async findLatest(limit: number = 4): Promise<MCPTutorialEntity[]> {
    return this.mcptutorialModel
      .find()
      .sort({ publishDate: -1, createdAt: -1 }) // Sort by newest first
      .limit(limit)
      .exec();
  }

  async findAll(
    limit: number = 4, // Default to 4 as seen on the site for tutorials section
    page: number = 1,
  ): Promise<{ data: MCPTutorialEntity[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;
    const data = await this.mcptutorialModel
      .find()
      .sort({ publishDate: -1, viewCount: -1 }) // Sort by newest and then by views
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.mcptutorialModel.countDocuments();
    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<MCPTutorialEntity> {
    const tutorial = await this.mcptutorialModel.findById(id).exec();
    if (!tutorial) {
      throw new NotFoundException(`MCP Tutorial with ID "${id}" not found`);
    }
    return tutorial;
  }

  async update(id: string, updateMCPTutorialDto: UpdateMCPTutorialDto): Promise<MCPTutorialEntity> {
    const updatedTutorial = await this.mcptutorialModel.findByIdAndUpdate(id, updateMCPTutorialDto, { new: true }).exec();
    if (!updatedTutorial) {
      throw new NotFoundException(`MCP Tutorial with ID "${id}" not found`);
    }
    return updatedTutorial;
  }

  async remove(id: string): Promise<MCPTutorialEntity> {
    const deletedTutorial = await this.mcptutorialModel.findByIdAndDelete(id).exec();
    if (!deletedTutorial) {
      throw new NotFoundException(`MCP Tutorial with ID "${id}" not found`);
    }
    return deletedTutorial;
  }
}
