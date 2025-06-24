import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MCPServce } from '../../schemas/mcpservice.schema'; // Corrected class name
import { MCPServceEntity } from '../../entities/mcpservice.entity';

// DTOs for MCPServce
export class CreateMCPServceDto {
    name: string;
    description: string;
    longDescription?: string;
    imageUrl?: string;
    languageOrTech?: string;
    userCountOrStars?: number;
    rating?: number;
    isVerified?: boolean;
    externalServiceUrl?: string;
    tags?: string[];
    addedToPlatformAt?: Date;
}

export class UpdateMCPServceDto extends CreateMCPServceDto {}

@Injectable()
export class MCPServicesService {
  constructor(@InjectModel(MCPServce.name) private mcpserviceModel: Model<MCPServce>) {}

  async create(createMCPServceDto: CreateMCPServceDto): Promise<MCPServceEntity> {
    const newService = new this.mcpserviceModel(createMCPServceDto);
    return newService.save();
  }

  async findAll(
    // Basic filtering options, can be expanded
    tag?: string,
    limit: number = 10,
    page: number = 1
  ): Promise<{data: MCPServceEntity[], total: number, page: number, limit: number}> {
    const query = tag ? { tags: tag } : {};
    const skip = (page - 1) * limit;

    const data = await this.mcpserviceModel.find(query)
      .sort({ userCountOrStars: -1, rating: -1, name: 1 }) // Example sort
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.mcpserviceModel.countDocuments(query);
    return { data, total, page, limit };
  }

  async findFeatured(limit: number = 8): Promise<MCPServceEntity[]> {
    // Example: find where isFeatured is true or sort by rating/stars
    // For now, let's sort by userCountOrStars and rating as a proxy for "featured"
    return this.mcpserviceModel.find()
        .sort({ userCountOrStars: -1, rating: -1 })
        .limit(limit)
        .exec();
  }

  async findRecent(limit: number = 8): Promise<MCPServceEntity[]> {
    return this.mcpserviceModel.find()
        .sort({ addedToPlatformAt: -1, createdAt: -1 }) // Sort by when added or created
        .limit(limit)
        .exec();
  }


  async findOne(id: string): Promise<MCPServceEntity> {
    const service = await this.mcpserviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`MCP Service with ID "${id}" not found`);
    }
    return service;
  }

  async update(id: string, updateMCPServceDto: UpdateMCPServceDto): Promise<MCPServceEntity> {
    const updatedService = await this.mcpserviceModel.findByIdAndUpdate(id, updateMCPServceDto, { new: true }).exec();
    if (!updatedService) {
      throw new NotFoundException(`MCP Service with ID "${id}" not found`);
    }
    return updatedService;
  }

  async remove(id: string): Promise<MCPServceEntity> {
    const deletedService = await this.mcpserviceModel.findByIdAndDelete(id).exec();
    if (!deletedService) {
      throw new NotFoundException(`MCP Service with ID "${id}" not found`);
    }
    return deletedService;
  }
}
